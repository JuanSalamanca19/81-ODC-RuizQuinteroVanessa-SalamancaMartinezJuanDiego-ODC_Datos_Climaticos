'use strict';

const imagenesConceptos = ['estacion','siembra','fertilizacion','sequia','riego','costos'];

const escapar = valor => String(valor).replace(/[&<>"']/g,caracter=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[caracter]);

function registroActividad(pantalla) {
  return actividades[pantalla].formativa ? estado.practica : intentoActual().respuestas[pantalla];
}

function respuestaGuardada(pantalla) {
  return registroActividad(pantalla)?.respuesta ?? intentoActual().borradores[pantalla];
}

function estadoActividad(pantalla) {
  const registro = registroActividad(pantalla);
  if (registro?.respuesta != null) return registro.correcta ? 'Correcta' : 'Requiere repaso';
  return 'Pendiente';
}

function destinosActividad(actividad, respuesta, bloqueada) {
  const fichas = actividad.banco.map(indice=>'<span class="ficha" draggable="' + !bloqueada + '" data-ficha="' + indice + '">' + escapar(actividad.opciones[indice]) + '</span>').join('');
  const destinos = actividad.destinos.map((destino,posicion)=>{
    const opciones = actividad.banco.map(indice=>'<option value="' + indice + '"' + (respuesta?.[posicion] === indice ? ' selected' : '') + '>' + escapar(actividad.opciones[indice]) + '</option>').join('');
    const conector = posicion > 0 && actividad.mapa ? '<p class="conector conector-' + posicion + '">' + escapar(actividad.conectores[posicion - 1]) + '</p>' : '';
    return conector + '<label class="destino destino-' + posicion + '"><span>' + escapar(destino) + '</span><select ' + (bloqueada ? 'disabled' : '') + '><option value="">Selecciona una opción</option>' + opciones + '</select></label>';
  }).join('');
  return '<p>Arrastra las fichas o usa las listas desplegables. Utiliza cada opción una vez.</p>' +
    '<div class="tablero-actividad' + (actividad.mapa ? ' tablero-mapa' : '') + '"><div class="fichas" aria-hidden="true">' + fichas + '</div><div class="' + (actividad.mapa ? 'mapa-conceptual' : 'relaciones') + '">' + destinos + '</div></div>';
}

function opcionesActividad(actividad, respuesta, bloqueada) {
  const tipo = actividad.tipo === 'multiple' ? 'checkbox' : 'radio';
  const imagen = indice => actividad.opciones === elementos ?
    '<img class="imagen-opcion" src="assets/images/opcion-' + imagenesConceptos[indice] + '.webp" alt="">' : '';
  const opciones = actividad.opciones.map((opcion,indice)=>'<label class="opcion"><input type="' + tipo + '" name="respuesta" value="' + indice + '"' +
    ([].concat(respuesta ?? []).includes(indice) ? ' checked' : '') + (bloqueada ? ' disabled' : '') + '>' + imagen(indice) + '<span>' + escapar(opcion) + '</span></label>');
  return '<div class="opciones' + (actividad.extensa ? ' extensas' : '') + '">' + opciones.join('') + '</div>';
}

function contenidoActividad(pantalla) {
  const actividad = actividades[pantalla];
  const respuesta = respuestaGuardada(pantalla);
  const bloqueada = registroActividad(pantalla)?.respuesta != null;
  const instruccion = actividad.contexto ? '<p>' + escapar(actividad.contexto) + '</p>' : '';
  return '<section class="actividad" id="actividad" aria-labelledby="actividad-titulo"><header><h2 id="actividad-titulo">' +
    (actividad.formativa ? 'Práctica formativa' : 'Actividad calificable') + '</h2><span class="estado">' + estadoActividad(pantalla) +
    '</span></header>' + instruccion + '<form id="formulario-actividad"><fieldset><legend>' + escapar(actividad.pregunta) + '</legend>' +
    (actividad.tipo === 'relacion' ? destinosActividad(actividad,respuesta,bloqueada) : opcionesActividad(actividad,respuesta,bloqueada)) +
    '</fieldset><p class="error" id="error-actividad" role="alert" hidden></p><div class="acciones">' +
    (bloqueada ? '<button type="button" class="boton secundario" data-ventana="retroalimentacion">Ver retroalimentación</button>' :
      '<button class="boton principal" type="submit">Verificar</button>') + '</div></form></section>';
}

function leerRespuesta(formulario, actividad) {
  if (actividad.tipo === 'relacion') return [...formulario.querySelectorAll('select')].map(control=>control.value === '' ? null : Number(control.value));
  const opciones = [...formulario.querySelectorAll('input:checked')].map(control=>Number(control.value));
  return actividad.tipo === 'multiple' ? opciones : opciones[0] ?? null;
}

function validarRespuesta(respuesta, actividad) {
  if (respuesta == null || (Array.isArray(respuesta) && !respuesta.some(valor=>valor != null))) {
    return 'Selecciona una respuesta antes de verificar';
  }
  if (actividad.tipo === 'relacion' && respuesta.includes(null)) return 'Completa todos los espacios antes de verificar.';
  if (actividad.tipo === 'relacion' && new Set(respuesta).size !== respuesta.length) return 'Usa cada opción una sola vez.';
  return '';
}

function conectarArrastre(formulario) {
  let ficha = null;
  formulario.querySelectorAll('[data-ficha]').forEach(origen=>{
    origen.addEventListener('dragstart',evento=>{
      ficha = origen.dataset.ficha;
      evento.dataTransfer.setData('text/plain',ficha);
      evento.dataTransfer.effectAllowed = 'copy';
    });
    origen.addEventListener('dragend',()=>{ ficha = null; });
  });
  formulario.querySelectorAll('.destino').forEach(destino=>{
    const control = destino.querySelector('select');
    destino.addEventListener('dragover',evento=>{
      if (ficha === null || control.disabled) return;
      evento.preventDefault();
      destino.classList.add('arrastre');
    });
    destino.addEventListener('dragleave',evento=>{
      if (!destino.contains(evento.relatedTarget)) destino.classList.remove('arrastre');
    });
    destino.addEventListener('drop',evento=>{
      destino.classList.remove('arrastre');
      if (ficha === null || control.disabled) return;
      evento.preventDefault();
      control.value = ficha;
      control.dispatchEvent(new Event('change',{bubbles:true}));
      anunciar('Opción asignada: ' + control.selectedOptions[0].textContent);
    });
  });
}

function conectarActividad(pantalla) {
  const formulario = document.querySelector('#formulario-actividad');
  if (!formulario) return;
  const actividad = actividades[pantalla];
  const aviso = formulario.querySelector('#error-actividad');
  formulario.addEventListener('change',()=>{
    aviso.hidden = true;
    intentoActual().borradores[pantalla] = leerRespuesta(formulario,actividad);
    guardarProgreso();
  });
  conectarArrastre(formulario);
  formulario.addEventListener('submit',evento=>{
    evento.preventDefault();
    if (registroActividad(pantalla)?.respuesta != null) return;
    const respuesta = leerRespuesta(formulario,actividad);
    const error = validarRespuesta(respuesta,actividad);
    if (error) {
      aviso.textContent = error;
      aviso.hidden = false;
      return;
    }
    const correcta = JSON.stringify(respuesta) === JSON.stringify(actividad.clave);
    const registro = {respuesta,correcta};
    if (actividad.formativa) estado.practica = registro;
    else {
      intentoActual().respuestas[pantalla] = registro;
      if (modoSCORM) scorm.registrar(pantalla,estado.indice + 1,respuesta,correcta,actividad,estado.recorrido);
    }
    delete intentoActual().borradores[pantalla];
    guardarProgreso();
    const seccion = formulario.closest('#actividad');
    seccion.outerHTML = contenidoActividad(pantalla);
    conectarActividad(pantalla);
    const boton = document.querySelector('#actividad [data-ventana="retroalimentacion"]');
    abrirVentana('retroalimentacion',boton);
    anunciar(correcta ? 'Respuesta correcta.' : 'Respuesta incorrecta.');
  });
}

function respuestaEnTexto(actividad, respuesta) {
  if (respuesta == null) return 'Sin responder';
  return [].concat(respuesta).map(indice=>actividad.opciones[indice]).join(actividad.tipo === 'relacion' ? ' → ' : ' · ');
}

function retroalimentacion(pantalla) {
  const actividad = actividades[pantalla];
  const registro = registroActividad(pantalla);
  const solucion = respuestaEnTexto(actividad,actividad.clave);
  return {
    titulo:registro.correcta ? 'Respuesta correcta' : 'Respuesta incorrecta',
    resultado:registro.correcta ? 'acierto' : 'repaso',
    cuerpo:'<p>' + escapar(registro.correcta ? actividad.acierto : actividad.error) + '</p>' +
      '<p class="nota"><strong>' + (actividad.tipo === 'relacion' ? 'Relaciones o secuencia esperadas' : 'Respuesta esperada') +
      '</strong><br>' + escapar(solucion) + '</p><p>' + escapar(actividad.repaso) + '</p>' +
      '<div class="acciones"><button class="boton principal" type="button" data-accion="cerrar">Continuar</button>' +
      '<button class="boton secundario" type="button" data-accion="repasar">Volver al módulo</button>' +
      (actividad.formativa ? '<button class="boton secundario" type="button" data-accion="repetir-practica">Reintentar</button>' :
        (estado.indice === 0 && terminoIntento(intentoActual()) && !registro.correcta ? '<button class="boton secundario" type="button" data-ventana="reintento">Reintentar evaluación</button>' : '')) + '</div>'
  };
}
