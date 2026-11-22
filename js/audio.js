'use strict';

const reproductor = document.querySelector('#audio');
const panelAudio = document.querySelector('#panel-audio');
const errorAudio = document.querySelector('#audio-error');
const controlAudio = document.querySelector('[data-accion="audio"]');
const audioEscena = document.querySelector('#audio-escena');
const activarAudio = document.querySelector('#audio-activacion');
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');

function aplicarPreferenciasAudio() {
  reproductor.volume = estado.volumen;
  reproductor.muted = estado.silencio;
}

aplicarPreferenciasAudio();

function prepararAudio(pantalla) {
  const archivo = 'assets/audio/narracion-' + String(pantalla).padStart(2,'0') + '.wav';
  if (reproductor.getAttribute('src') === archivo) return false;
  reproductor.pause();
  errorAudio.hidden = true;
  activarAudio.hidden = true;
  reproductor.src = archivo;
  document.querySelector('#audio-nombre').textContent = nombresPantallas[pantalla - 1];
  return true;
}

function actualizarIconoAudio() {
  const enPausa = reproductor.paused;
  if (!enPausa) activarAudio.hidden = true;
  audioEscena.toggleAttribute('data-reproduciendo',!enPausa);
  audioEscena.firstElementChild.dataset.icono = enPausa ? 'silencio' : 'audio';
  audioEscena.title = enPausa ? (activarAudio.hidden ? 'Reproducir narración' : 'Activar narración') : 'Pausar narración';
  audioEscena.setAttribute('aria-label',audioEscena.title);
  colocarIconos(audioEscena);
}

function reproducirAudio() {
  const archivo = reproductor.src;
  reproductor.play().catch(error=>{
    if (archivo !== reproductor.src || error.name === 'AbortError') return;
    if (error.name === 'NotAllowedError') {
      activarAudio.hidden = false;
      actualizarIconoAudio();
    } else {
      errorAudio.hidden = false;
    }
  });
}

function alternarAudio() {
  if (!panelAudio.hidden) {
    cerrarAudio();
    return;
  }
  panelAudio.hidden = false;
  controlAudio.setAttribute('aria-expanded','true');
  panelAudio.querySelector('[data-accion="cerrar-audio"]').focus();
}

function cerrarAudio(devolverFoco = true) {
  panelAudio.hidden = true;
  reproductor.pause();
  controlAudio.setAttribute('aria-expanded','false');
  if (devolverFoco) controlAudio.focus();
}

function desplazarTranscripcion() {
  const texto = document.querySelector('.transcripcion-bocadillo');
  if (!texto || movimientoReducido.matches || texto.matches(':focus, :hover') || !reproductor.duration) return;
  const avance = reproductor.currentTime / reproductor.duration;
  texto.scrollTop = avance * (texto.scrollHeight - texto.clientHeight);
}

function reiniciarAudio() {
  if (reproductor.readyState > 0) reproductor.currentTime = 0;
  reproducirAudio();
}

['play','pause','ended','emptied'].forEach(evento=>reproductor.addEventListener(evento,actualizarIconoAudio));
reproductor.addEventListener('error',()=>{ errorAudio.hidden = false; });
reproductor.addEventListener('timeupdate',desplazarTranscripcion);
reproductor.addEventListener('volumechange',()=>{
  estado.volumen = reproductor.volume;
  estado.silencio = reproductor.muted;
  guardarProgreso();
});
