'use strict';

const icono = nombre => '<span data-icono="' + nombre + '" aria-hidden="true"></span>';
const boton = (texto, atributo, valor, estilo = 'secundario', simbolo = '') =>
  '<button type="button" class="boton ' + estilo + '" data-' + atributo + '="' + valor + '">' + (simbolo ? icono(simbolo) : '') + escapar(texto) + '</button>';
const acciones = (...controles) => '<div class="acciones">' + controles.join('') + '</div>';
const tarjeta = (titulo, texto, simbolo = '') => '<article class="tarjeta">' +
  '<h3>' + (simbolo ? icono(simbolo) : '') + escapar(titulo) + '</h3><p>' + escapar(texto) + '</p></article>';
const tarjetaDefinicion = (id, titulo, resumen, simbolo, imagen = '') =>
  '<button type="button" class="tarjeta tarjeta-definicion" data-ventana="' + id + '" aria-haspopup="dialog">' +
  '<span class="titulo-tarjeta">' + (simbolo ? icono(simbolo) : '') + escapar(titulo) + '</span>' +
  (imagen ? '<img class="icono-tarjeta" src="assets/images/' + imagen + '.webp" alt="">' : '') +
  (resumen ? '<span class="resumen-tarjeta">' + escapar(resumen) + '</span>' : '') + '</button>';
const criterios = [
  ['Precisión','Mediciones confiables.','objetivo','Los datos deben ser confiables, consistentes y estar validados.'],
  ['Oportunidad','Información a tiempo.','etapas','Los pronósticos y las alertas deben llegar a tiempo para decidir.'],
  ['Escala local','Datos del territorio.','mapa','La información debe representar el territorio, el lote y el cultivo analizado.']
];
const avatar = (variante, alternativo = '') => '<img class="avatar" src="assets/images/agrodata-' + variante + '.webp" alt="' + escapar(alternativo) + '">';
const encabezado = (titulo, descripcion = '', modulo = 0) =>
  '<header class="titulo">' + (modulo ? '<span class="numero-modulo" aria-hidden="true">' + modulo + '.</span>' : '') +
  '<div><h1>' + escapar(titulo) + '</h1>' + (descripcion ? '<p>' + escapar(descripcion) + '</p>' : '') + '</div></header>';
const decir = (variante, mensaje = '') =>
  '<aside class="guia-agrodata" aria-label="AgroData">' +
  (mensaje ? '<p class="bocadillo">' + escapar(mensaje) + '</p>' : '') +
  avatar(variante,'AgroData, asistente robótico del curso.') + '</aside>';

function decirTranscripcion(variante, pantalla) {
  return '<aside class="guia-agrodata" aria-label="AgroData"><div class="bocadillo bocadillo-transcripcion">' +
    '<div class="transcripcion-bocadillo" tabindex="0" role="region" aria-label="Transcripción de AgroData">' +
    escapar(narraciones[pantalla - 1]) + '</div></div>' +
    avatar(variante,'AgroData, asistente robótico del curso.') + '</aside>';
}

function tabla(titulo, encabezados, filas, clase = '') {
  return '<div class="tabla-desplazable" tabindex="0" role="region" aria-label="' + escapar(titulo) + '"><table class="' + clase +
    '"><caption>' + escapar(titulo) + '</caption><thead><tr>' + encabezados.map(campo=>'<th scope="col">' + escapar(campo) + '</th>').join('') +
    '</tr></thead><tbody>' + filas.map(fila=>'<tr><th scope="row">' + escapar(fila[0]) + '</th>' +
      fila.slice(1).map(campo=>'<td>' + escapar(campo) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
}

function grafica(titulo, unidad, categorias, valores, minimo, maximo, intervalo, tipo = 'barras') {
  const ancho = Math.max(324,categorias.length * 38 + 45);
  const origenX = 39;
  const origenY = 133;
  const escala = (ancho - origenX - 10) / categorias.length;
  const x = indice => origenX + escala * (indice + .5);
  const y = valor => origenY - (valor - minimo) / (maximo - minimo) * 107;
  const marcas = Array.from({length:Math.round((maximo - minimo) / intervalo) + 1},(_,indice)=>minimo + indice * intervalo);
  const reticula = marcas.map(valor=>'<path class="reticula" d="M' + origenX + ' ' + y(valor) + 'H' + (ancho - 10) + '"/>' +
    '<text x="33" y="' + (y(valor) + 3) + '" text-anchor="end">' + numero(valor) + '</text>').join('');
  const periodo = categorias[0].includes('mayo') ? 'Fecha' : titulo.includes('Rendimiento') ? 'Año' : 'Mes';
  const etiquetas = categorias.map((categoria,indice)=>'<text x="' + x(indice) + '" y="149" text-anchor="middle">' + escapar((categoria.includes('mayo') ? categoria.split(' ')[0] : categoria.slice(0, periodo === 'Año' ? 4 : 3))) + '</text>').join('');
  const datos = tipo === 'linea' ?
    '<polyline class="linea" pathLength="1" points="' + valores.map((valor,indice)=>x(indice) + ',' + y(valor)).join(' ') + '"/>' +
    valores.map((valor,indice)=>'<circle class="serie" style="--indice:' + indice + '" cx="' + x(indice) + '" cy="' + y(valor) + '" r="3.1"/>').join('') :
    valores.map((valor,indice)=>'<rect class="serie" style="--indice:' + indice + '" x="' + (x(indice) - escala * .3) + '" y="' + y(valor) + '" width="' +
      (escala * .6) + '" height="' + (origenY - y(valor)) + '" rx="1.5"/>').join('');

  const descripcion = 'Eje horizontal: ' + periodo.toLowerCase() + '. Eje vertical: ' + titulo.toLowerCase() + ' (' + unidad + ').';
  return '<figure class="grafica"><figcaption>' + escapar(titulo + ' (' + unidad + ')') + '</figcaption>' +
    '<svg aria-hidden="true" viewBox="0 0 ' + ancho + ' 160"><text x="8" y="15">' + escapar(unidad) + '</text>' + reticula +
    '<path class="ejes" d="M' + origenX + ' 19V' + origenY + 'H' + (ancho - 10) + '"/>' + datos + etiquetas + '</svg>' +
    '<details><summary>Descripción y datos</summary><p>' + escapar(descripcion) + '</p>' +
    tabla(titulo,[periodo,unidad],categorias.map((categoria,indice)=>[categoria,numero(valores[indice])])) + '</details></figure>';
}

function portada() {
  return '<section class="portada"><div class="portada-texto"><div class="portada-ficha"><h1>' +
    escapar(tituloODC) + '</h1>' + autoresODC.map(autor=>'<p>' + escapar(autor) + '</p>').join('') +
    '<p>Universidad de Cundinamarca</p></div>' +
    acciones(boton('Iniciar','ir',2,'principal','reproducir'),boton('Ayuda','ventana','ayuda','secundario','ayuda')) +
    '</div>' + decirTranscripcion('saluda',1) + '</section>';
}

const rutaPrincipal = [
  [4,'El problema','brote'],[6,'Conceptos básicos','libro'],[7,'Datos climáticos','lluvia'],
  [9,'Modelos y análisis','grafica'],[10,'Metodología de análisis','etapas'],
  [12,'Decisiones en la agricultura','datos'],[13,'Casos y evidencia científica','lista'],
  [14,'Sintetiza lo aprendido','documento'],[16,'Conclusiones','objetivo']
];

function menuPrincipal() {
  const controles = rutaPrincipal.map(([pantalla,nombre,simbolo],indice)=>{
    const visita = fueVisitada(pantalla) ? 'Visitada' : 'Sin visitar';
    const estadoModulo = actividades[pantalla] ? estadoActividad(pantalla) : '';
    const situacion = [visita,estadoModulo].filter(Boolean).join(' · ');
    return '<button class="ruta-item" type="button" data-ir="' + pantalla + '" title="' + escapar(situacion) + '">' +
      icono(simbolo) + '<span>' + (indice + 1) + '. ' + escapar(nombre) + '</span>' +
      '<span class="marca-visita" data-estado="' + (estadoModulo === 'Correcta' ? 'correcta' : estadoModulo === 'Requiere repaso' ? 'repaso' : fueVisitada(pantalla) ? 'visitada' : 'nueva') +
      '" aria-hidden="true">' + (estadoModulo === 'Correcta' ? '✓' : estadoModulo === 'Requiere repaso' ? '!' : fueVisitada(pantalla) ? '•' : '') +
      '</span><span class="solo-lectura"> · ' + escapar(situacion) + '</span></button>';
  });
  return encabezado('Ruta de aprendizaje','Puedes recorrer los módulos de manera secuencial o ingresar directamente a la sección que necesites.') +
    '<div class="menu-escena"><nav class="ruta" aria-label="Nueve módulos del ODC">' +
    '<div>' + controles.slice(0,5).join('') + '</div><div>' + controles.slice(5).join('') + '</div></nav>' +
    decir('guia','Esta es la ruta principal de aprendizaje. Selecciona el módulo que desees o avanza con las flechas.') + '</div>';
}

function pantallaDatosCaso() {
  const fechas = datosCaso.map(([dia])=>new Intl.DateTimeFormat('es-CO',{day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(Date.UTC(2000,4,dia))));
  const filas = datosCaso.map(([dia,lluvia,temperatura,humedad,radiacion],indice)=>[fechas[indice],numero(lluvia,1),numero(temperatura,1),numero(humedad),numero(radiacion,1)]);
  return '<div class="columnas datos-caso"><section>' +
    encabezado('Datos utilizados','Registros simulados del caso de papa en Ubaté.') +
    tabla('Registros diarios simulados',['Fecha','Precipitación (mm)','Temperatura (°C)','Humedad del suelo (%)','Radiación solar (MJ/m²/día)'],filas) +
    '<p class="nota">Los datos son simulados con fines educativos y representan un ejemplo de registros climáticos diarios para el análisis del caso.</p>' +
    grafica('Humedad del suelo','%',fechas,datosCaso.map(fila=>fila[3]),20,60,10,'linea') + '</section>' +
    '<article class="tarjeta interpretacion-caso"><h2>' + icono('lupa') + 'Interpretación del caso</h2>' +
    '<p>Del 3 al 5 de mayo coinciden lluvias, temperaturas más bajas y un aumento de la humedad del suelo del 33 % al 56 % respecto al 2 de mayo. La menor radiación durante los días lluviosos sugiere condiciones de menor demanda evaporativa.</p>' +
    '<p>El 5 de mayo es una fecha candidata para evaluar la siembra. Antes de decidir, el productor debe comprobar el drenaje y la humedad adecuada para trabajar el terreno, así como el pronóstico de los días siguientes.</p>' +
    '</article></div>';
}

function resultados() {
  const actual = intentoActual();
  const finalizado = mejorIntentoFinalizado();
  const mostrado = finalizado || actual;
  const puntos = calcularPuntaje(mostrado);
  const revisadas = Object.keys(actual.respuestas).length;
  const aprobado = finalizado && porcentaje(puntos) >= 80;
  const titulo = finalizado ? (aprobado ? 'Aprobado' : 'Requiere refuerzo') : 'Evaluación en curso';
  const mensaje = finalizado ?
    (aprobado ? '¡Felicitaciones! Alcanzaste el resultado esperado. Demostraste que puedes interpretar datos climáticos y relacionarlos con decisiones agrícolas.' :
      (estado.indice === 0 ? 'Aún no alcanzaste el resultado esperado. Revisa los módulos señalados y vuelve a presentar las actividades. Tus respuestas y el contenido recomendado permanecerán disponibles para el repaso.' :
        'Aún no alcanzaste el resultado esperado. Consulta los módulos señalados para seguir repasando.')) :
    'Completa las ocho actividades para obtener un resultado definitivo. El criterio de aprobación es 80 %.';
  const filas = pantallasCalificables.map(pantalla=>[actividades[pantalla].nombre,mostrado.respuestas[pantalla] ? (mostrado.respuestas[pantalla].correcta ? 'Correcta' : 'Requiere repaso') : 'Pendiente']);
  const repaso = pantallasCalificables.find(pantalla=>!mostrado.respuestas[pantalla]?.correcta) ?? 3;
  const reintento = estado.indice === 0 && terminoIntento(actual) ? boton('Reintentar','ventana','reintento','secundario','reinicio') : '';
  return encabezado('Resultados de tu aprendizaje','La evaluación incluye ocho actividades de un punto cada una.') +
    '<div class="columnas distribucion-resultados"><div class="tarjeta"><span class="estado' + (finalizado && !aprobado ? ' error-estado' : '') + '">' + titulo +
    '</span><div class="medicion">' + avatar('saluda') + '<p class="metrica">' + puntos + '/8</p></div><p><strong>' + numero(porcentaje(puntos)) + ' %</strong> · ' +
    (finalizado ? 'Mejor intento finalizado' : 'Puntaje parcial') + '</p><p>' + mensaje + '</p>' +
    '<p>Intento ' + (estado.indice + 1) + ' de 2 · ' + revisadas + ' de 8 actividades verificadas.</p>' +
    (estado.indice === 1 && terminoIntento(actual) ? '<p>Has finalizado tu segundo intento. Se conservará el mejor puntaje obtenido. Revisa el detalle de tus respuestas y los contenidos recomendados.</p>' : '') +
    acciones(boton('Revisar errores','ventana','detalle'),boton('Volver al módulo','ir',repaso),boton('Continuar','ir',16,'principal')) +
    '</div>' + tabla('Resultados por módulo',['Módulo','Resultado'],filas) + '<div class="accesos-resultados">' + boton('Inicio','ir',1,'secundario','casa') + reintento + '</div></div>';
}

const pantallas = [
  portada,
  ()=> '<div class="escena-rea"><div class="columnas rea">' +
    '<article class="tarjeta">' + icono('objetivo') + '<h1>Resultado esperado de aprendizaje (REA)</h1><p>Al finalizar el ODC, analizarás cómo los datos climáticos contribuyen a la toma de decisiones agrícolas. Interpretarás variables, aplicarás etapas de análisis y revisarás evidencia científica para justificar decisiones de planificación y manejo de cultivos.</p><p>Representarás mediante un mapa conceptual la relación entre la información climática y las decisiones agrícolas.</p></article>' +
    '<article class="tarjeta">' + icono('personas') + '<h2>¿Para quién está dirigido?</h2><p>A estudiantes de educación superior de Analítica y Ciencias de Datos, Ingeniería de Sistemas, Agronomía y áreas afines. También pueden recorrerlo productores y personas interesadas en la agricultura basada en datos.</p></article>' +
    '</div>' + decir('guia') + '</div>',
  menuPrincipal,
  ()=> '<div class="escena-problema"><article class="tarjeta pregunta-problema">' +
    encabezado('¿Por qué es importante analizar datos climáticos en la agricultura?','',1) +
    '<p>Las sequías, las lluvias intensas, los cambios de temperatura y los eventos extremos pueden afectar el rendimiento de los cultivos, la seguridad alimentaria y los ingresos de los productores.</p>' +
    '<div class="rejilla criterios">' + criterios.map(([titulo,resumen,simbolo],indice)=>
      tarjetaDefinicion('criterio-' + indice,titulo,resumen,simbolo)).join('') + '</div>' +
    acciones(boton('Saber más','ventana','mas-4'),boton('Caso aplicable','ir',5,'enlace-caso')) + '</article>' +
    contenidoActividad(4) + decirTranscripcion('aprueba',4) + '</div>',
  ()=> '<div class="columnas situacion"><img src="assets/images/productor.webp" alt="Ilustración de un productor que observa un cultivo al pie de las montañas.">' +
    '<div class="caso-texto"><h1>' + icono('lupa') + 'Situación inicial</h1><p>Un productor de papa en la región de Ubaté debe planificar las labores de su cultivo. Las variaciones en la precipitación y la temperatura dificultan la toma de decisiones.</p>' +
    '<p class="pregunta-caso">¿Cómo pueden los datos climáticos ayudar a anticipar riesgos y seleccionar las acciones más adecuadas?</p>' +
    acciones(boton('Consultar datos del caso','ir',8,'enlace-caso'),boton('Explorar conceptos','ir',6,'principal')) + '</div>' +
    decir('saluda') + '</div>',
  ()=> '<div class="escena-conceptos">' +
    encabezado('Conceptos básicos','¿Qué son los datos climáticos y cómo se utilizan?',2) + '<div class="rejilla conceptos">' +
    conceptos.map(([titulo,texto],indice)=>tarjeta(titulo,texto,['lluvia','temperatura','datos','brote'][indice])).join('') + '</div>' +
    acciones(boton('Saber más','ventana','mas-6')) + contenidoActividad(6) +
    decir('aprueba','Aquí conocerás los conceptos clave que utilizaremos en todo el recorrido.') + '</div>',
  ()=> '<div class="escena-variables"><section>' +
    encabezado('Datos climáticos','¿Qué son los datos climáticos y cómo se utilizan?',3) +
    '<div class="variables-contenido"><div class="rejilla variables">' +
    variables.slice(0,6).map(([titulo,,texto],indice)=>tarjeta(titulo,texto,['temperatura','lluvia','brote','viento','sol','grafica'][indice])).join('') +
    '</div><img class="mapa-lote" src="assets/images/mapa-cultivo.webp" alt="Ilustración de un mapa del lote con variaciones de humedad."></div>' +
    acciones(boton('Saber más','ventana','mas-7'),boton('Caso aplicable','ir',8,'enlace-caso')) +
    '</section>' + contenidoActividad(7) + '</div>',
  pantallaDatosCaso,
  ()=> '<div class="escena-modelos"><section>' +
    encabezado('Modelos y análisis','¿Cómo se analizan los datos climáticos?',4) +
    '<div class="rejilla modelos">' + modelos.map(([titulo],indice)=>
      tarjetaDefinicion('modelo-' + indice,(indice + 1) + '. ' + titulo,'',['lupa','datos','grafica','lista'][indice])).join('') +
    '</div>' + acciones(boton('Saber más','ventana','mas-9')) + '</section><div class="ejercicio-modelos">' +
    grafica('Precipitación mensual','mm',meses,lluviaAnual,0,140,20) +
    '<p class="nota">Serie mensual ilustrativa, aproximada a partir del storyboard e independiente de los registros diarios.</p>' +
    contenidoActividad(9) + '</div>' + decirTranscripcion('piensa',9) + '</div>',
  ()=> '<div class="escena-etapas">' +
    encabezado('Metodología de análisis','Se desarrolla en seis etapas que permiten transformar los datos climáticos en información útil.',5) +
    '<div class="rejilla etapas">' + etapas.map(([titulo,pregunta],indice)=>'<button type="button" class="tarjeta marco-etapa" data-ventana="etapa-' +
      indice + '">' + icono(['objetivo','datos','etapas','lupa','grafica','personas'][indice]) +
      '<strong>' + escapar(titulo) + '</strong><span>' + escapar(pregunta) + '</span></button>').join('') +
    '</div>' + acciones(boton('Caso aplicable','ir',11,'enlace-caso')) + contenidoActividad(10) +
    decir('aprueba','¡Vamos a descubrir cómo los datos climáticos se convierten en decisiones agrícolas!') + '</div>',
  ()=> '<div class="escena-riego"><section class="riego-contexto">' +
    encabezado('Interpretación y toma de decisión') +
    '<p>En el caso de papa en Ubaté, entre mayo y junio disminuyen tanto la precipitación como la humedad del suelo.</p>' +
    '<p class="pregunta-caso">¿Qué decisión debería considerar para mantener condiciones adecuadas de humedad en el cultivo?</p>' +
    '<p class="nota">Series mensuales simuladas e independientes de los registros diarios de mayo.</p></section>' +
    '<div class="graficas-riego">' + seriesRiego.map(([titulo,unidad,valores,minimo,maximo,intervalo,tipo])=>
      grafica(titulo,unidad,meses.slice(0,6),valores,minimo,maximo,intervalo,tipo)).join('') +
    '</div>' + contenidoActividad(11) + '</div>',
  ()=> '<div class="escena-decisiones">' +
    encabezado('Decisiones en la agricultura','¿Qué decisiones pueden apoyarse con datos climáticos?',6) + '<div class="rejilla decisiones">' +
    decisiones.map(([titulo],indice)=>tarjetaDefinicion('decision-' + indice,titulo,['Época y variedad','Cantidad y momento','Fertilización y plagas','Momento oportuno','Prevención de eventos extremos'][indice],'',
      'decision-' + ['siembra','riego','manejo','cosecha','riesgo'][indice])).join('') + '</div>' +
    acciones(boton('Saber más','ventana','mas-12')) + '<div class="decision-cuerpo">' +
    decir('senala','Los datos climáticos permiten planificar, reducir riesgos y mejorar la productividad de los sistemas agrícolas.') +
    contenidoActividad(12) + '</div></div>',
  ()=> '<div class="escena-evidencia"><div class="evidencia-arriba"><section>' +
    encabezado('Casos y evidencia científica','¿Qué muestra la investigación?',7) +
    '<p class="evidencia-texto">Los estudios examinan cómo la información climática contribuye a planificar labores, anticipar riesgos y gestionar el agua. Interpreta cada resultado según su contexto, el tipo de datos y el método de análisis.</p>' +
    acciones(boton('Explorar casos','ventana','casos','principal','derecha')) + '</section>' +
    grafica('Rendimiento del cultivo','índice simulado',['2021','2022','2023','2024'],[100,112,126,145],0,160,40) + '</div>' +
    contenidoActividad(13) + decirTranscripcion('piensa',13) + '</div>',
  ()=> '<div class="escena-sintesis">' +
    encabezado('Sintetiza lo aprendido','Completa el mapa conceptual con los conceptos del recorrido.',8) +
    contenidoActividad(14) + acciones(boton('Ver resultados','ir',15,'principal')) + decir('aprueba') + '</div>',
  resultados,
  ()=> '<div class="escena-conclusiones">' + encabezado('Conclusiones','',9) +
    '<article class="tarjeta"><ul><li>Los datos climáticos fortalecen la planificación agrícola.</li><li>El análisis climático debe adaptarse a las condiciones locales.</li><li>El acceso oportuno a la información es tan importante como su disponibilidad.</li><li>La combinación de diferentes fuentes de información mejora el análisis.</li></ul><p>El análisis de datos climáticos permite orientar las labores del campo, anticipar riesgos y aprovechar los recursos disponibles. Sus beneficios dependen de la calidad de la información, su adaptación a las condiciones locales y la capacidad de los productores para interpretarla y utilizarla. Integrar los datos climáticos con el conocimiento agrícola y otras fuentes de información ayuda a prepararse frente a la variabilidad del clima.</p></article>' +
    acciones(boton('Volver al menú','ir',3,'principal'),boton('Ver resultados','ir',15),boton('Referencias','ventana','referencias'),boton('Créditos y metadatos','ventana','creditos'),boton('Reiniciar ODC','ventana','reinicio-odc','secundario','reinicio')) +
    decirTranscripcion('saluda',16) + '</div>'
];

function listadoContenido(filas) {
  return filas.map(([titulo,texto])=>'<h3>' + escapar(titulo) + '</h3><p>' + escapar(texto) + '</p>').join('');
}

function detalleResultados() {
  return estado.intentos.map((intento,indice)=>{
    const lista = pantallasCalificables.map(pantalla=>{
      const registro = intento.respuestas[pantalla];
      const actividad = actividades[pantalla];
      if (registro?.correcta) return '';
      const detalle = registro ?
        '<p>Tu respuesta: ' + escapar(respuestaEnTexto(actividad,registro.respuesta)) + '</p><p>' + escapar(actividad.error) + '</p>' : '<p>Actividad pendiente.</p>';
      return '<li><strong>' + escapar(actividad.nombre) + '</strong>' + detalle + boton('Volver al módulo','ir',pantalla) + '</li>';
    }).join('');
    return '<h3>Intento ' + (indice + 1) + ' · ' + calcularPuntaje(intento) + '/8</h3>' + (lista ? '<ul class="lista-referencias">' + lista + '</ul>' : '<p>Todas las respuestas fueron correctas.</p>');
  }).join('');
}

const ventanas = {
  ayuda:()=>({titulo:'Ayuda de navegación',cuerpo:listadoContenido([
    ['Recorre el ODC','Usa Inicio para volver a la portada, Menú principal para elegir una pantalla y Anterior o Siguiente para avanzar en orden. La barra indica cuántas pantallas has visitado.'],
    ['Escucha o lee','Abre Audio para reproducir, pausar, cambiar el volumen, mover el control de progreso o reiniciar. Usa Cerrar reproductor o Escape para ocultar el panel. También puedes abrir Transcripción o leer el texto en el bocadillo cuando esté disponible.'],
    ['Resuelve las actividades','Marca las opciones y pulsa Verificar. En las actividades de arrastre también puedes seleccionar las respuestas con Tab y las flechas del teclado. Lee la retroalimentación y usa Escape o el botón Cerrar para regresar.'],
    ['Consulta tus resultados','Verifica las ocho actividades calificables. Puedes realizar un segundo intento después de completar el primero. Se conserva el mejor resultado finalizado.']
  ]) + acciones(boton('Referencias','ventana','referencias'),boton('Créditos y metadatos','ventana','creditos'))}),
  'mas-4':()=>({titulo:'¿Por qué no basta con tener más datos?',cuerpo:'<p>La información climática puede orientar la fecha de siembra, la selección de cultivos, la preparación del terreno, el riego y la gestión del riesgo.</p>' + listadoContenido([
    ...criterios.map(([titulo,,,definicion])=>[titulo,definicion]),
    ['Aplicabilidad','La recomendación debe ser comprensible y viable con los recursos del productor.']
  ]) + '<p>El aprovechamiento de los pronósticos depende del acceso a la tecnología, los servicios de extensión y la capacidad de interpretación. El diseño participativo ayuda a integrar el conocimiento local (Nocezo et al., 2024a, 2024b; Snow, Fleming, et al., 2024; Snow, Fielke, et al., 2024).</p>'}),
  'mas-6':()=>({titulo:'¿Cómo se convierten los datos climáticos en decisiones agrícolas?',cuerpo:'<p>Las estaciones meteorológicas, los sensores del cultivo, la teledetección y los modelos aportan datos. Analizar y presentar estos registros mediante pronósticos, alertas, mapas o plataformas permite orientar decisiones concretas.</p><ul><li>Seleccionar una fecha adecuada de siembra.</li><li>Programar el riego según la lluvia esperada y la humedad disponible.</li><li>Anticipar periodos de sequía y temperaturas extremas.</li><li>Preparar el terreno y organizar las labores.</li><li>Elegir cultivos apropiados para las condiciones previstas.</li></ul><p>Para que se use, la información debe ser accesible, comprensible y adecuada al contexto del productor (Nocezo et al., 2024b; Snow, Fleming, et al., 2024; Snow, Fielke, et al., 2024).</p>'}),
  'mas-7':()=>({titulo:'¿Qué información aportan las variables climáticas?',cuerpo:'<figure class="ventana-mapa"><img src="assets/images/mapa-cultivo.webp" alt="Mapa de un lote agrícola con zonas en verde, amarillo y rojo asociadas a diferentes niveles de humedad."><figcaption>Ilustración de variación espacial de humedad en un lote.</figcaption></figure>' + listadoContenido(variables.map(([titulo,definicion,uso])=>[titulo,definicion + ' ' + uso])) + '<p>Las estaciones, los sensores, los satélites y los servicios climáticos pueden aportar estas mediciones. Revisa la precisión, el periodo y la escala antes de aplicarlas a un lote (Longman et al., 2026; Sánchez et al., 2026).</p>'}),
  'mas-9':()=>({titulo:'¿Cómo se analizan los datos climáticos?',cuerpo:listadoContenido(modelos)}),
  'mas-12':()=>({titulo:'¿Cómo apoyan los datos climáticos las decisiones agrícolas?',cuerpo:'<p>La información oportuna, confiable y pertinente para el territorio ayuda a comparar alternativas de manejo.</p>' +
    listadoContenido(decisiones) + '<p>Consulta los ejemplos sobre siembra, riego y sequía en los casos de Nocezo et al. (2024b), Sánchez et al. (2026) y Longman et al. (2026).</p>'}),
  casos:()=>({titulo:'Casos y evidencia científica',amplia:true,cuerpo:'<p>La evidencia debe interpretarse en el contexto del método, los datos y el territorio de cada estudio.</p>' +
    tabla('Estudios sobre información climática y decisiones agrícolas',['Caso','País o región','Método y datos','Evidencia encontrada','Decisión apoyada','Limitación','Cita'],casosCientificos,'tabla-casos') +
    acciones(boton('Consultar referencias','ventana','referencias'))}),
  detalle:()=>({titulo:'Detalle de resultados y módulos para repasar',cuerpo:detalleResultados()}),
  reintento:()=>({titulo:'Segundo intento',cuerpo:'<p>Volverás a responder las ocho actividades. Tus respuestas del primer intento se conservan para el repaso. Se mantendrá el mejor puntaje finalizado.</p>' +
    acciones(boton('Comenzar segundo intento','accion','reintentar','principal'),boton('Seguir revisando','accion','cerrar'))}),
  'reinicio-odc':()=>({titulo:'¿Reiniciar el ODC?',cuerpo:'<p>Al reiniciar, se borrarán el avance, las respuestas y el puntaje del recorrido. Volverás a la portada para empezar de nuevo.</p>' +
    (modoSCORM ? '<p>En Moodle, las interacciones ya registradas seguirán en los informes.</p>' : '') +
    acciones(boton('Cancelar','accion','cerrar'),boton('Reiniciar ODC','accion','reiniciar-odc','principal'))}),
  retroalimentacion:()=>retroalimentacion(estado.pantalla),
  transcripcion:()=>({titulo:'Transcripción · ' + nombresPantallas[estado.pantalla - 1],cuerpo:'<p><strong>AgroData</strong></p><p>' + escapar(narraciones[estado.pantalla - 1]) + '</p>'}),
  referencias:()=>({titulo:'Referencias',cuerpo:'<ol class="lista-referencias">' + referenciasAPA.map(([inicio,revista,fin,doi])=>
    '<li>' + escapar(inicio) + ' <cite>' + escapar(revista) + '</cite>' +
      escapar(fin).replace(/^(, )(\d+)/, (_, coma, volumen)=>coma + '<cite class="cita-volumen">' + volumen + '</cite>') +
    (doi ? ' <span>' + escapar(doi) + '</span>' : '') + '</li>').join('') + '</ol>'}),
  creditos:()=>({titulo:'Créditos y metadatos',cuerpo:'<dl class="creditos">' + [
    ['Material',tituloODC],['Área de conocimiento y CADI','Big Data'],['Autoría y diseño del storyboard',autoresODC.join(' y ')],
    ['Institución','Universidad de Cundinamarca · Oficina de Educación Virtual y a Distancia'],
    ['Imágenes','Storyboard de los autores, con apoyo de herramientas de IA generativa GPT, según los créditos de origen.'],
    ['Voz de AgroData','Narración sintética generada localmente. La voz y su variante se registran en assets/audio/voz.txt.'],
    ['Fecha de esta edición','13/11/2026'],['Nivel educativo','Educación superior · intermedio'],
    ['Formato','ODC HTML5 · SCORM 1.2 · español de Colombia']
  ].map(([etiqueta,valor])=>'<dt>' + escapar(etiqueta) + '</dt><dd>' + escapar(valor) + '</dd>').join('') +
    '</dl><img class="licencia" src="assets/images/licencia.webp" alt="Creative Commons Atribución–NoComercial–CompartirIgual, indicación del storyboard."><p>El storyboard indica CC BY-NC-SA sin especificar la versión de la licencia.</p>'})
};
etapas.forEach(([titulo,pregunta,texto],indice)=>{
  ventanas['etapa-' + indice] = ()=>({titulo,definicion:true,cuerpo:'<p><strong>' + escapar(pregunta) + '</strong></p><p>' + escapar(texto) + '</p>'});
});

for (const [tipo,definiciones] of [
  ['criterio',criterios.map(([titulo,,,definicion])=>[titulo,definicion])],
  ['modelo',modelos],
  ['decision',decisiones]
]) {
  definiciones.forEach(([titulo,definicion],indice)=>{
    ventanas[tipo + '-' + indice] = ()=>({titulo,definicion:true,cuerpo:'<p>' + escapar(definicion) + '</p>'});
  });
}
