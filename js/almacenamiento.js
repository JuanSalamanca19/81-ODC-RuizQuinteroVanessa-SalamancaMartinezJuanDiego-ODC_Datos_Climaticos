'use strict';

const claveLocal = 'odc-datos-climaticos-v1';
const estadoInicial = () => ({version:1,pantalla:1,visitadas:0,indice:0,intentos:[{borradores:{},respuestas:{}}],practica:{},volumen:1,silencio:false});
const modoSCORM = scorm.iniciar();

function recuperarProgreso() {
  try {
    const texto = modoSCORM ? scorm.obtener('cmi.suspend_data') : localStorage.getItem(claveLocal);
    const guardado = JSON.parse(texto || 'null');
    if (guardado?.version === 1 && Array.isArray(guardado.intentos) &&
        guardado.intentos[guardado.indice]?.respuestas && guardado.pantalla >= 1 && guardado.pantalla <= nombresPantallas.length) {
      return guardado;
    }
  } catch {
    console.info('Se inició una sesión nueva porque el progreso guardado no estaba disponible.');
  }
  const inicial = estadoInicial();
  const marcador = Number(modoSCORM ? scorm.obtener('cmi.core.lesson_location') : 0);
  if (Number.isInteger(marcador) && marcador >= 1 && marcador <= nombresPantallas.length) inicial.pantalla = marcador;
  return inicial;
}

let estado = recuperarProgreso();

function reiniciarProgreso() {
  const recorrido = (estado.recorrido ?? 0) + 1;
  estado = {...estadoInicial(),recorrido};
}

const intentoActual = () => estado.intentos[estado.indice];
const fueVisitada = pantalla => Boolean(estado.visitadas & (1 << (pantalla - 1)));
const contarVisitas = () => nombresPantallas.filter((_, indice)=>fueVisitada(indice + 1)).length;
const porcentaje = puntos => puntos / pantallasCalificables.length * 100;
const terminoIntento = intento => pantallasCalificables.every(pantalla=>Object.hasOwn(intento.respuestas,pantalla));
const calcularPuntaje = intento => pantallasCalificables.filter(pantalla=>intento.respuestas[pantalla]?.correcta).length;
const mejorIntentoFinalizado = () => estado.intentos.filter(terminoIntento).reduce((mejor,intento)=>
  !mejor || calcularPuntaje(intento) > calcularPuntaje(mejor) ? intento : mejor, null);
const mejorParcial = () => Math.max(...estado.intentos.map(calcularPuntaje));
const numero = (valor, decimales = 0) => new Intl.NumberFormat('es-CO',{minimumFractionDigits:decimales,maximumFractionDigits:Math.max(1,decimales)}).format(valor);

function guardarProgreso() {
  if (modoSCORM) {
    const finalizado = mejorIntentoFinalizado();
    const puntaje = finalizado ? calcularPuntaje(finalizado) : mejorParcial();
    const estadoLMS = finalizado ? (porcentaje(puntaje) >= 80 ? 'passed' : 'failed') : 'incomplete';
    const datos = JSON.stringify(estado);
    if (datos.length > 4096) {
      console.warn('El progreso excede la capacidad de cmi.suspend_data.');
      return;
    }
    scorm.escribir('cmi.suspend_data',datos);
    scorm.escribir('cmi.core.lesson_location',estado.pantalla);
    scorm.escribir('cmi.core.score.min',0);
    scorm.escribir('cmi.core.score.max',100);
    scorm.escribir('cmi.core.score.raw',porcentaje(puntaje));
    scorm.escribir('cmi.core.lesson_status',estadoLMS);
    scorm.escribir('cmi.core.exit','suspend');
    scorm.confirmar();
    return;
  }
  try {
    localStorage.setItem(claveLocal,JSON.stringify(estado));
  } catch {
    console.warn('El navegador restringe localStorage. La sesión puede perderse al cerrar la página.');
  }
}
