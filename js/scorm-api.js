'use strict';

const scorm = (() => {
  const inicio = Date.now();
  let api = null;
  let abierto = false;
  let finalizado = false;
  const avisos = new Set();

  function buscarAPI(origen) {
    let ventana = origen;
    for (let nivel = 0; ventana && nivel < 24; nivel++) {
      try {
        if (typeof ventana.API?.LMSInitialize === 'function') return ventana.API;
        if (ventana.parent === ventana) break;
        ventana = ventana.parent;
      } catch {
        break;
      }
    }
    return null;
  }

  function invocar(metodo, ...argumentos) {
    try {
      return String(api[metodo](...argumentos) ?? '');
    } catch {
      return '';
    }
  }

  function iniciar() {
    api = buscarAPI(window);
    if (!api) {
      try { api = buscarAPI(window.opener); } catch { /* El origen de la ventana puede ser distinto. */ }
    }
    abierto = Boolean(api && invocar('LMSInitialize','') === 'true');
    console.info(abierto ? 'ODC en modo SCORM 1.2.' : 'ODC en modo local.');
    return abierto;
  }

  function obtener(campo) {
    return abierto && !finalizado ? invocar('LMSGetValue',campo) : '';
  }

  function escribir(campo, valor, opcional = false) {
    if (!abierto || finalizado) return false;
    const aceptado = invocar('LMSSetValue',campo,String(valor)) === 'true';
    if (!aceptado && !opcional && !avisos.has(campo)) {
      avisos.add(campo);
      console.warn('El LMS no aceptó el campo SCORM ' + campo + '.');
    }
    return aceptado;
  }

  function tiempo(milisegundos) {
    const centesimas = Math.floor(milisegundos / 10);
    const segundos = Math.floor(centesimas / 100);
    const campo = (valor, ancho = 2) => String(valor).padStart(ancho,'0');
    return campo(Math.min(9999, Math.floor(segundos / 3600)),4) + ':' +
      campo(Math.floor(segundos / 60) % 60) + ':' + campo(segundos % 60) + '.' + campo(centesimas % 100);
  }

  function confirmar() {
    if (!abierto || finalizado) return false;
    escribir('cmi.core.session_time',tiempo(Date.now() - inicio));
    return invocar('LMSCommit','') === 'true';
  }

  function registrar(pantalla, intento, respuesta, correcta, actividad, recorrido = 0) {
    const cantidad = obtener('cmi.interactions._count');
    if (!/^\d+$/.test(cantidad)) return;
    const campo = 'cmi.interactions.' + cantidad;
    const id = 'actividad-' + pantalla + '-intento-' + intento + (recorrido ? '-reinicio-' + recorrido : '');
    if (!escribir(campo + '.id',id,true)) return;
    const opcion = indice => String.fromCharCode(97 + indice);
    const codificar = valor => {
      if (pantalla === 4 || pantalla === 12) return valor === 0 ? 't' : 'f';
      if (actividad.tipo === 'relacion') return valor.map((indice, posicion)=>opcion(posicion) + '.' + opcion(indice)).join(',');
      return [].concat(valor).map(opcion).join(',');
    };
    const tipo = pantalla === 4 || pantalla === 12 ? 'true-false' : actividad.tipo === 'relacion' ? 'matching' : 'choice';
    escribir(campo + '.type',tipo,true);
    escribir(campo + '.weighting','1',true);
    escribir(campo + '.correct_responses.0.pattern',codificar(actividad.clave),true);
    escribir(campo + '.student_response',codificar(respuesta),true);
    escribir(campo + '.result',correcta ? 'correct' : 'wrong',true);
  }

  function finalizar() {
    if (!abierto || finalizado) return;
    confirmar();
    invocar('LMSFinish','');
    finalizado = true;
  }

  return {iniciar, obtener, escribir, confirmar, registrar, finalizar};
})();
