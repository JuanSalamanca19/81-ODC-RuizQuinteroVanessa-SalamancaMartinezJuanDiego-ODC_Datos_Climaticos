'use strict';

const iconos = {
  brote:'<path d="M12 21v-8m0 3C5 16 3 12 3 7c6 0 9 4 9 9Zm0-3c0-5 3-8 9-9 0 6-4 9-9 9Z"/>',
  casa:'<path d="m3 10 9-7 9 7M5 9v11h14V9M9 20v-6h6v6"/>',
  mapa:'<rect x="3" y="4" width="7" height="6" rx="1"/><rect x="14" y="4" width="7" height="6" rx="1"/><rect x="3" y="14" width="7" height="6" rx="1"/><rect x="14" y="14" width="7" height="6" rx="1"/>',
  audio:'<path d="M3 9h4l5-4v14l-5-4H3zM16 9a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12"/>',
  ayuda:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .8-1.5 1.2-1.5 2.3m0 3.2h.01"/>',
  libro:'<path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1v14"/>',
  izquierda:'<path d="m15 5-7 7 7 7"/>',
  derecha:'<path d="m9 5 7 7-7 7"/>',
  menu:'<path d="M3 5h18M3 12h18M3 19h18"/>',
  informacion:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
  avanzar:'<path d="m3 6 6 6-6 6m6-12 6 6-6 6m6-12 6 6-6 6"/>',
  retroceder:'<path d="m9 6-6 6 6 6m6-12-6 6 6 6m6-12-6 6 6 6"/>',
  silencio:'<path d="M3 9h4l5-4v14l-5-4H3zM16 10l5 5m0-5-5 5"/>',
  reproducir:'<path d="m8 4 13 8-13 8z" fill="currentColor"/>',
  objetivo:'<circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><path d="M11 13 21 3m-5 0v5h5"/>',
  personas:'<circle cx="12" cy="7" r="3"/><circle cx="4" cy="9" r="2"/><circle cx="20" cy="9" r="2"/><path d="M7 20v-3a5 5 0 0 1 10 0v3zM6 14c-3-1-5 1-5 4h4m13-4c3-1 5 1 5 4h-4"/>',
  lluvia:'<path d="M6 15a4 4 0 1 1 0-8 6 6 0 0 1 11 1 3.5 3.5 0 1 1 1 7H6Zm1 4-1 2m6-2-1 2m6-2-1 2"/>',
  grafica:'<path d="M3 3v18h18M5 16l5-5 4 3 6-9m-4 0h4v4"/>',
  etapas:'<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="5" height="5" rx="1"/><rect x="10" y="17" width="5" height="5" rx="1"/><rect x="18" y="17" width="5" height="5" rx="1"/><path d="M12 8v8M4.5 16v-4h16v4"/>',
  lista:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h.1m4 0h5M8 12h.1m4 0h5M8 16h.1m4 0h5"/>',
  documento:'<path d="M5 3h9l5 5v13H5zM14 3v5h5M8 12h8m-8 4h8"/>',
  datos:'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0"/>',
  temperatura:'<path d="M10 15V5a2 2 0 1 1 4 0v10a4 4 0 1 1-4 0Zm2 3V8"/>',
  viento:'<path d="M2 7h13c4 0 4-5 1-5M2 12h17c4 0 4 5 1 5M2 17h9c4 0 4 5 1 5"/>',
  sol:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2"/>',
  lupa:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  reinicio:'<path d="M20 8a9 9 0 0 0-15-2L3 9m0-5v5h5m-4 7a9 9 0 0 0 15 2l2-3m0 5v-5h-5"/>',
  acierto:'<path d="m5 12 5 5L20 6" pathLength="1"/>',
  repaso:'<path d="M3 12a9 9 0 1 1 2.2 6m-2-12v6h6M12 7v5l3 2"/>',
  cerrar:'<path d="m6 6 12 12M18 6 6 18"/>'
};
const contenido = document.querySelector('#contenido');
const dialogo = document.querySelector('#ventana');
const tituloVentana = document.querySelector('#ventana-titulo');
const cuerpoVentana = document.querySelector('#ventana-contenido');
const ilustracionVentana = document.querySelector('#ventana-ilustracion');
let origenVentana = null;

function colocarIconos(contenedor) {
  contenedor.querySelectorAll('[data-icono]').forEach(elemento=>{
    elemento.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none" aria-hidden="true">' + iconos[elemento.dataset.icono] + '</svg>';
  });
}

function anunciar(texto) {
  const anuncio = document.querySelector(dialogo.open ? '#anuncio-ventana' : '#anuncio');
  anuncio.textContent = texto;
}

function mostrarPantalla(pantalla, enfocar = true) {
  if (!Number.isInteger(pantalla) || pantalla < 1 || pantalla > pantallas.length) return;
  if (dialogo.open) cerrarVentana(false);
  const nuevaNarracion = prepararAudio(pantalla);
  estado.pantalla = pantalla;
  estado.visitadas |= 1 << (pantalla - 1);
  contenido.dataset.pantalla = pantalla;
  if (enfocar) window.scrollTo(0,0);
  contenido.innerHTML = pantallas[pantalla - 1]();
  colocarIconos(contenido);
  document.querySelector('#numero-pantalla').textContent = 'Pantalla ' + pantalla + '.';
  document.querySelector('#ubicacion').textContent = ({2:'REA y población objetivo',5:'El problema agrícola',8:'Datos utilizados',11:'Interpretación y toma de decisión',15:'Resultados de tu aprendizaje'})[pantalla] ?? nombresPantallas[pantalla - 1];
  document.querySelector('#contador').textContent = 'Pantalla ' + pantalla + ' de ' + pantallas.length;
  document.querySelector('#progreso').value = contarVisitas();
  document.querySelector('#anterior').disabled = pantalla === 1;
  const siguiente = document.querySelector('#siguiente');
  siguiente.dataset.accion = pantalla === pantallas.length ? 'menu' : 'siguiente';
  siguiente.title = pantalla === pantallas.length ? 'Menú principal' : 'Siguiente';
  siguiente.setAttribute('aria-label',siguiente.title);
  document.querySelectorAll('.lateral-nav [data-ir]').forEach(control=>{
    if (Number(control.dataset.ir) === pantalla) control.setAttribute('aria-current','page');
    else control.removeAttribute('aria-current');
  });
  conectarActividad(pantalla);
  guardarProgreso();
  if (enfocar) contenido.focus({preventScroll:true});
  if (nuevaNarracion) reproducirAudio();
}

function abrirVentana(id, origen) {
  const datos = ventanas[id]?.();
  if (!datos) return;
  reproductor.pause();
  if (!dialogo.open) origenVentana = origen || document.activeElement;
  dialogo.classList.toggle('amplia',Boolean(datos.amplia));
  dialogo.classList.toggle('ventana-definicion',Boolean(datos.definicion));
  dialogo.dataset.resultado = datos.resultado ?? '';
  const ilustracion = datos.definicion && origen?.querySelector('[data-icono], .icono-tarjeta');
  ilustracionVentana.replaceChildren();
  ilustracionVentana.hidden = !ilustracion && !datos.resultado;
  if (ilustracion) ilustracionVentana.append(ilustracion.cloneNode(true));
  if (datos.resultado) {
    ilustracionVentana.innerHTML = icono(datos.resultado);
    colocarIconos(ilustracionVentana);
  }
  document.querySelector('#anuncio-ventana').textContent = '';
  tituloVentana.textContent = datos.titulo;
  cuerpoVentana.innerHTML = datos.cuerpo;
  if (!dialogo.open) dialogo.showModal();
  cuerpoVentana.scrollTop = 0;
  tituloVentana.focus();
}

function cerrarVentana(devolverFoco = true) {
  if (!dialogo.open) return;
  dialogo.close();
  if (devolverFoco && origenVentana?.isConnected) origenVentana.focus();
  origenVentana = null;
}

dialogo.addEventListener('cancel',evento=>{
  evento.preventDefault();
  cerrarVentana();
});
dialogo.addEventListener('keydown',evento=>{
  if (evento.key !== 'Tab') return;
  const controles = [...dialogo.querySelectorAll('button:not(:disabled),a[href],select:not(:disabled),[tabindex="0"]')];
  const primero = controles[0];
  const ultimo = controles.at(-1);
  if (evento.shiftKey && (document.activeElement === primero || document.activeElement === tituloVentana)) {
    evento.preventDefault();
    ultimo.focus();
  } else if (!evento.shiftKey && document.activeElement === ultimo) {
    evento.preventDefault();
    primero.focus();
  }
});

const accionesCurso = {
  anterior:()=>mostrarPantalla(estado.pantalla - 1),
  siguiente:()=>mostrarPantalla(estado.pantalla + 1),
  menu:()=>mostrarPantalla(3),
  audio:alternarAudio,
  'cerrar-audio':cerrarAudio,
  'alternar-narracion':()=>{
    if (reproductor.paused) reproducirAudio();
    else reproductor.pause();
  },
  'reiniciar-audio':reiniciarAudio,
  'reiniciar-odc':()=>{
    reiniciarProgreso();
    cerrarAudio(false);
    aplicarPreferenciasAudio();
    mostrarPantalla(1);
    anunciar('ODC reiniciado. Estás en la portada.');
  },
  cerrar:()=>cerrarVentana(),
  repasar:()=>{
    cerrarVentana(false);
    contenido.focus();
  },
  'repetir-practica':()=>{
    estado.practica = {};
    mostrarPantalla(13);
    document.querySelector('#formulario-actividad input').focus();
  },
  reintentar:()=>{
    if (estado.indice !== 0 || !terminoIntento(intentoActual())) return;
    estado.indice = 1;
    estado.intentos.push({borradores:{},respuestas:{}});
    mostrarPantalla(4);
    anunciar('Comenzó el segundo intento. El resultado anterior se conserva.');
  }
};
document.addEventListener('click',evento=>{
  const control = evento.target.closest('button[data-ir],button[data-ventana],button[data-accion]');
  if (!control || control.disabled) return;
  const {ir,ventana,accion} = control.dataset;
  if (ir) mostrarPantalla(Number(ir));
  else if (ventana) abrirVentana(ventana,control);
  else accionesCurso[accion]?.();
});
document.addEventListener('keydown',evento=>{
  if (evento.key !== 'Escape' || dialogo.open || panelAudio.hidden) return;
  evento.preventDefault();
  cerrarAudio();
});

window.addEventListener('pagehide',evento=>{
  guardarProgreso();
  if (!evento.persisted) scorm.finalizar();
});
document.addEventListener('visibilitychange',()=>{
  if (document.visibilityState === 'hidden') guardarProgreso();
});

colocarIconos(document);
mostrarPantalla(estado.pantalla,false);

