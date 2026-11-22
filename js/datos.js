'use strict';

const tituloODC = 'Contribución del análisis de datos climáticos a la toma de decisiones agrícolas';
const autoresODC = ['Vanessa Ruiz Quintero', 'Juan Diego Salamanca Martínez'];
const nombresPantallas = [
  'Portada', 'Resultado de aprendizaje', 'Menú principal', 'El problema', 'Caso agrícola en Ubaté',
  'Conceptos básicos', 'Datos climáticos', 'Datos utilizados en el caso', 'Modelos y análisis',
  'Metodología de análisis', 'Interpretación y decisión de riego', 'Decisiones en la agricultura',
  'Casos y evidencia científica', 'Sintetiza lo aprendido', 'Resultados del aprendizaje', 'Conclusiones'
];
const narraciones = [
  'Hola, soy AgroData y te acompañaré durante este recorrido. Conocerás cómo los datos y los pronósticos apoyan las decisiones agrícolas. Puedes avanzar con las flechas, volver al menú en cualquier momento y reproducir o pausar la narración. Cada pantalla tiene una transcripción. Selecciona Iniciar para revisar el resultado de aprendizaje y la población a la que se dirige este recurso.',
  'Al finalizar el recorrido, podrás interpretar variables climáticas, aplicar etapas de análisis y revisar evidencia científica para justificar decisiones de planificación y manejo de los cultivos. Representarás la relación entre la información climática y las decisiones agrícolas en un mapa conceptual. Este recurso está dirigido a estudiantes de Analítica y Ciencias de Datos, Ingeniería de Sistemas, Agronomía y áreas afines.',
  'Este es el menú principal. Puedes seguir la ruta sugerida o entrar directamente al tema que necesites. Las actividades te ofrecen retroalimentación después de verificar tus respuestas. Puedes consultar tus resultados desde el inicio. Para alcanzar el criterio de aprobación, completa las ocho actividades. Usa el botón Menú principal para regresar aquí y el botón Ayuda si necesitas orientación.',
  'Las decisiones agrícolas dependen del clima, pero los datos ayudan cuando responden a una necesidad concreta. Un pronóstico puede orientar la siembra si llega antes de preparar el terreno. Una medición de humedad puede apoyar el riego si representa el lote y se interpreta según el cultivo. Consulta las condiciones de calidad de la información. Luego responde la pregunta de verdadero o falso y lee la retroalimentación.',
  'Un productor de papa en la región de Ubaté debe planificar las labores de su cultivo. Las variaciones de la precipitación y la temperatura dificultan la toma de decisiones. ¿Cómo pueden los datos climáticos ayudar a anticipar riesgos y seleccionar las acciones más adecuadas? Ten presente esta situación durante el recorrido.',
  'Aquí conocerás los conceptos clave que utilizaremos durante el recorrido. Los datos registran variables del ambiente. Los servicios climáticos convierten esos registros en productos como alertas, mapas y pronósticos. El productor usa esta información para decidir qué labor realizar y cuándo. Selecciona los elementos que representan una fuente de información climática o que muestran un riesgo o una labor que puede analizarse con ella.',
  'En esta pantalla explorarás la temperatura, la precipitación, la humedad del suelo, el viento, la radiación solar y la evapotranspiración. Distingue la humedad del aire, que describe el vapor de agua en la atmósfera, de la humedad del suelo, que indica el agua almacenada en el terreno. Relaciona cada descripción con su variable. Puedes arrastrar las fichas o usar las listas desplegables.',
  'Estos siete registros diarios del caso de Ubaté son simulados. Entre el dos y el cinco de mayo la humedad del suelo pasa del treinta y tres al cincuenta y seis por ciento. En esos días también se registran lluvias. En el ejercicio, el cinco de mayo es una fecha candidata para la siembra: antes de decidir, el productor debe comprobar el drenaje, el estado del terreno y el pronóstico.',
  'El análisis comienza con la recolección de datos. Luego se revisa su calidad, se aplican métodos estadísticos o modelos y se interpretan los resultados. Observa la gráfica de precipitación mensual e identifica el mes con la barra más alta. El eje horizontal muestra los meses. El eje vertical muestra la precipitación en milímetros.',
  'Acompáñame a recorrer las seis etapas que transforman los datos climáticos en información útil. Empezamos por comprender el problema e identificar los datos. Después preparamos y analizamos la información, evaluamos los resultados y los comunicamos para orientar una decisión agrícola. Abre las explicaciones y luego ordena las etapas.',
  'Compara los registros simulados de enero a junio. Entre mayo y junio disminuyen la precipitación y la humedad del suelo. Explora también la temperatura. Piensa qué información necesitaría el productor para ajustar el riego a las condiciones del cultivo y selecciona una decisión.',
  'Los datos climáticos permiten planificar la siembra, el riego, el manejo del cultivo y la cosecha. También ayudan a anticipar riesgos. Lee la situación sobre la aplicación de un producto fitosanitario y considera cómo el viento y la lluvia pueden afectar el resultado de esa labor.',
  'Analizaremos qué muestra la evidencia científica sobre el uso de información climática en la agricultura. Selecciona Explorar casos para consultar investigaciones de distintos lugares. La tabla presenta el método, los resultados, la decisión que estos apoyan y sus limitaciones. Después, practica cómo comparar el rendimiento de un cultivo con las condiciones climáticas.',
  'Completa el mapa conceptual con los cinco conceptos del recorrido. Puedes arrastrarlos o seleccionarlos con el teclado. Lee los conectores del mapa y verifica si las ideas forman una explicación coherente.',
  'Consulta el resultado de cada actividad y los módulos que puedes repasar. El curso conserva tu mejor puntaje. Si completas un segundo intento, podrás consultar el detalle de ambos. Recuerda que los datos climáticos son una herramienta valiosa y que su interpretación y aplicación requieren comprender el contexto de cada sistema de producción agrícola.',
  '¡Hemos llegado al final del recorrido! Los datos climáticos pueden fortalecer la planificación agrícola y apoyar decisiones relacionadas con la siembra, el riego, la cosecha y la gestión del riesgo. Para que sean útiles, deben ser confiables, oportunos y adaptarse a las condiciones del territorio y del cultivo. Su valor aumenta cuando se combinan con la experiencia del productor, diferentes fuentes de información y herramientas de análisis. Gracias por acompañarme. Ahora cuentas con elementos para tomar decisiones agrícolas más informadas y prepararte frente a la variabilidad climática.'
];

const conceptos = [
  ['Datos climáticos','Registros de variables atmosféricas y del entorno, obtenidos en lugares e intervalos definidos.'],
  ['Variables climáticas','Magnitudes como la temperatura, la precipitación, la humedad, la radiación solar y el viento.'],
  ['Servicios climáticos','Productos y herramientas que transforman los datos en información útil, como pronósticos, alertas y mapas.'],
  ['Toma de decisiones','Uso de la información y del conocimiento agrícola para definir acciones en el manejo del cultivo.']
];
const variables = [
  ['Temperatura','Grado de calor o frío del aire.','Influye en la germinación, el crecimiento y el estrés térmico.'],
  ['Precipitación','Cantidad de agua que cae en un lugar durante un periodo.','Ayuda a identificar ventanas de siembra y evaluar la disponibilidad de agua.'],
  ['Humedad del suelo','Cantidad de agua almacenada en el suelo.','Ayuda a evaluar la disponibilidad de agua para las plantas y programar el riego.'],
  ['Viento','Movimiento del aire caracterizado por la dirección y la velocidad.','Incide en la pérdida de agua y puede causar deriva durante una aplicación.'],
  ['Radiación solar','Energía proveniente del Sol que llega a la superficie.','Interviene en la fotosíntesis y en la evapotranspiración.'],
  ['Evapotranspiración','Transferencia de agua a la atmósfera por evaporación y transpiración de las plantas.','Su estimación ayuda a calcular la demanda hídrica y orientar el riego.'],
  ['Humedad del aire','Contenido de vapor de agua en la atmósfera.','La humedad relativa expresa qué tan cerca está el aire de la saturación a una temperatura dada.']
];
const etapas = [
  ['Comprensión del problema','¿Qué decisión debe tomar el productor?','Delimitar la decisión y el propósito del análisis. En Ubaté, por ejemplo, el productor debe decidir cuándo sembrar la papa y qué riesgos evaluar antes de preparar el lote.'],
  ['Comprensión de los datos','¿Qué variables están disponibles?','Identificar fuentes y variables pertinentes. Revisar qué registran las estaciones meteorológicas, los sensores de suelo, los satélites y los servicios climáticos, así como su cobertura y frecuencia.'],
  ['Preparación de los datos','¿Son comparables los registros?','Ordenar registros por fecha y lugar, revisar valores faltantes, duplicados, unidades y observaciones atípicas. Dejar constancia de las correcciones y supuestos para que el análisis se pueda repetir.'],
  ['Análisis','¿Qué patrones aparecen?','Aplicar estadística y visualizaciones para explorar tendencias y relaciones. En el caso de Ubaté, comparar la lluvia, la temperatura y la humedad del suelo en periodos equivalentes.'],
  ['Evaluación','¿Los resultados permiten orientar la decisión?','Comprobar si los resultados responden a la pregunta y revisar la calidad, la incertidumbre y los límites de su aplicación. Si hay un modelo, evaluar su desempeño con datos adecuados al uso previsto.'],
  ['Comunicación y aplicación','¿Cómo se usarán los resultados?','Presentar gráficas, informes o alertas comprensibles que permitan comparar acciones. Apoyar la decisión de siembra, riego o manejo con las observaciones del lote, las necesidades del cultivo y los recursos disponibles.']
];
const modelos = [
  ['Recolección de datos','Usar estaciones, sensores de suelo, satélites, servicios climáticos y registros históricos. Documentar fecha, ubicación, frecuencia y unidad de cada medición.'],
  ['Procesamiento y limpieza','Revisar datos faltantes, duplicados, unidades incompatibles y observaciones atípicas. Organizar la información por lugar y fecha.'],
  ['Modelos predictivos','Emplear estadística descriptiva, series temporales, modelos de cultivo o aprendizaje automático según la pregunta. La evapotranspiración y las ventanas de siembra se pueden estimar con datos y modelos adecuados (Mkuhlani, Garcia Bendito, et al., 2024; Sánchez et al., 2026; Supriyasilp, 2026).'],
  ['Interpretación de resultados','Traducir los resultados a una decisión concreta, teniendo en cuenta el cultivo, el territorio, el horizonte de tiempo y la incertidumbre.']
];
const decisiones = [
  ['Siembra','La lluvia, la temperatura, la humedad del suelo y los pronósticos estacionales ayudan a comparar fechas y variedades.'],
  ['Riego','La humedad del suelo, la evapotranspiración, la probabilidad de lluvia y la etapa del cultivo orientan el momento y la cantidad de agua.'],
  ['Manejo del cultivo','La temperatura, la humedad, el viento y la lluvia orientan el momento de fertilizar o controlar plagas. La decisión también requiere observar el lote y consultar las indicaciones agronómicas.'],
  ['Cosecha','Los pronósticos de lluvia, temperatura y humedad ayudan a identificar periodos favorables para cosechar y reducir pérdidas.'],
  ['Gestión del riesgo','Las alertas de sequía, lluvias intensas y temperaturas extremas ayudan a priorizar recursos y preparar medidas preventivas.']
];
const elementos = [
  'Estación meteorológica en un cultivo', 'Calendario de siembra basado en el inicio de las lluvias',
  'Aplicación de fertilizante según un análisis químico del suelo', 'Monitoreo de periodos de sequía',
  'Programación del riego por aspersión según la humedad del suelo', 'Registro contable de costos de producción'
];
const conceptosMapa = ['Datos climáticos','Variables climáticas','Herramientas de análisis','Toma de decisiones','Producción agrícola'];
const datosCaso = [
  [1,0.0,31.2,34,22.8],[2,0.5,30.8,33,21.7],[3,8.4,27.6,41,15.2],[4,15.7,25.9,53,11.8],
  [5,4.2,27.1,56,16.4],[6,0.0,29.4,51,20.9],[7,0.0,30.6,45,22.1]
];
const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const lluviaAnual = [35,65,105,120,75,55,20,20,50,58,85,110];
const seriesRiego = [
  ['Precipitación','mm',[5,9,12,5,15,9],0,20,5,'barras'],
  ['Temperatura','°C',[14,16,12,14,16,14],10,20,2,'linea'],
  ['Humedad del suelo','%',[54,62,56,54,63,52],30,80,10,'linea']
];

const actividades = {
  4: {nombre:'El problema', pregunta:'Disponer de más datos garantiza una mejor decisión.', opciones:['Verdadero','Falso'], clave:1,
    acierto:'¡Correcto! Una mayor cantidad de datos no garantiza automáticamente una mejor decisión. La información también debe ser confiable, oportuna, representativa del territorio y pertinente para la necesidad del productor.',
    error:'Revisa el concepto de calidad de los datos. Una gran cantidad de registros puede contener datos incompletos, desactualizados o poco representativos. Para apoyar una decisión agrícola, la información debe tener precisión, oportunidad y aplicabilidad.',
    repaso:'Revisa precisión, oportunidad, escala local y aplicabilidad en Saber más.'},
  6: {nombre:'Conceptos básicos', pregunta:'Selecciona las fuentes, riesgos o labores que se relacionan directamente con la recolección o el uso de datos climáticos.', opciones:elementos, clave:[0,1,3,4], tipo:'multiple',
    acierto:'¡Correcto! La estación meteorológica, los periodos de sequía, la planificación de la siembra y los sistemas de riego se relacionan directamente con la recopilación o utilización de datos climáticos.',
    error:'Revisa los elementos seleccionados. Identifica cuáles permiten recolectar información climática o utilizarla para orientar una labor agrícola. Los costos y otros datos administrativos no representan por sí mismos una variable climática.',
    repaso:'Distingue entre una fuente de datos climáticos, una condición que se monitorea y una labor que se programa con esa información.'},
  7: {nombre:'Datos climáticos', pregunta:'Relaciona cada descripción con su variable climática.', opciones:variables.map(variable=>variable[0]), clave:[1,0,6,3,2,5,4], tipo:'relacion', banco:[3,5,2,0,4,6,1],
    destinos:[1,0,6,3,2,5,4].map(indice=>variables[indice][1]),
    acierto:'¡Correcto! Relacionaste adecuadamente cada variable con la información que representa. Estas variables permiten interpretar las condiciones ambientales que afectan el cultivo.',
    error:'Algunas relaciones deben revisarse. Recuerda que la humedad del aire representa vapor de agua en la atmósfera, mientras que la humedad del suelo indica el agua almacenada y disponible para las plantas.',
    repaso:'Consulta las definiciones y su aplicación agrícola en Saber más.'},
  9: {nombre:'Modelos y análisis', pregunta:'¿En qué mes se presenta la mayor precipitación?', opciones:['Abril','Diciembre','Marzo','Agosto'], clave:0,
    acierto:'¡Correcto! Abril presenta la mayor precipitación porque su barra alcanza el valor más alto de la gráfica, aproximadamente 120 mm.',
    error:'Revisa nuevamente la gráfica. El eje horizontal presenta los meses y el eje vertical muestra la precipitación en milímetros. Para responder, identifica la barra de mayor altura.',
    repaso:'Compara las alturas de las barras o consulta la tabla de datos de la gráfica para identificar el mes más lluvioso.'},
  10: {nombre:'Metodología de análisis', pregunta:'Ordena las seis etapas, desde el planteamiento hasta la aplicación.', opciones:etapas.map(etapa=>etapa[0]), clave:[0,1,2,3,4,5], tipo:'relacion', banco:[4,2,5,0,3,1],
    destinos:['Primera etapa','Segunda etapa','Tercera etapa','Cuarta etapa','Quinta etapa','Sexta etapa'],
    acierto:'¡Correcto! Organizaste las etapas desde la definición del problema hasta la comunicación y aplicación de los resultados en una decisión agrícola.',
    error:'Revisa la secuencia. Antes de analizar, es necesario comprender el problema, identificar los datos disponibles y preparar la información. Después del análisis, se evalúan y comunican los resultados.',
    repaso:'Abre las tarjetas de las etapas y sigue el proceso con la decisión de siembra del caso de Ubaté.'},
  11: {nombre:'Interpretación y decisión de riego', pregunta:'¿Qué decisión debería considerar el productor para mantener condiciones adecuadas de humedad en el cultivo?', extensa:true,
    opciones:['Mantener el riego actual sin considerar las variaciones climáticas.','Evaluar la humedad del suelo y ajustar la programación del riego según las necesidades del cultivo.','Suspender completamente el riego porque se registraron precipitaciones en meses anteriores.','Aumentar el riego de forma permanente, independientemente de las condiciones del suelo.'], clave:1,
    acierto:'¡Correcto! La precipitación baja de 15 a 9 mm y la humedad del suelo pasa de 63 % a 52 %. Esto puede indicar una menor disponibilidad de agua. El productor debe monitorear estas variables y ajustar el riego según las necesidades del cultivo.',
    error:'Revisa las gráficas y compara mayo con junio. Mantener, suspender o aumentar permanentemente el riego sin evaluar la humedad del suelo puede generar déficit o desperdicio de agua.',
    repaso:'Compara precipitación y humedad del suelo entre mayo y junio, y relaciona los cambios con la disponibilidad de agua.'},
  12: {nombre:'Decisiones en la agricultura', pregunta:'Posponer la aplicación puede reducir la dispersión del producto por el viento y evitar que la lluvia disminuya su efectividad.', opciones:['Verdadero','Falso'], clave:0,
    contexto:'Un agricultor tiene programada la aplicación de un producto fitosanitario. Sin embargo, el pronóstico indica vientos fuertes y alta probabilidad de lluvia durante las próximas horas.',
    acierto:'¡Correcto! El viento puede producir deriva hacia áreas no deseadas y la lluvia puede lavar el producto antes de que actúe. Consultar el pronóstico permite seleccionar un momento de aplicación más seguro y eficiente.',
    error:'Revisa las condiciones de la situación. Aplicar el producto con viento fuerte o lluvia próxima puede disminuir su efectividad, aumentar las pérdidas y generar riesgos ambientales.',
    repaso:'Revisa manejo del cultivo y gestión del riesgo en Saber más.'},
  13: {nombre:'Casos y evidencia científica', formativa:true, extensa:true, pregunta:'¿Qué información adicional sería más útil para analizar esa posible relación?',
    contexto:'En el ejemplo, el rendimiento del cultivo aumenta de 2021 a 2024. El agricultor quiere saber si ese comportamiento se relaciona con las condiciones climáticas.',
    opciones:['Comparar los rendimientos anuales con la precipitación, la temperatura y la disponibilidad de agua durante los mismos periodos.','Revisar únicamente el rendimiento del último año, porque fue el más alto.','Comparar el rendimiento con el número de trabajadores sin considerar las variables climáticas.','Asumir que el aumento se debe al clima porque la tendencia es creciente.'], clave:0,
    acierto:'¡Correcto! Comparar periodos equivalentes permite explorar relaciones entre los registros climáticos y el rendimiento. Una tendencia por sí sola es insuficiente para establecer causalidad.',
    error:'Una tendencia o un dato aislado son insuficientes para establecer causalidad. Compara rendimientos y condiciones climáticas de los mismos periodos. Considera también posibles influencias, como cambios de variedad, manejo o fertilización.',
    repaso:'Consulta los métodos y las limitaciones de los estudios en Explorar casos.'},
  14: {nombre:'Sintetiza lo aprendido', pregunta:'Completa el mapa conceptual con los conceptos del recorrido.', opciones:conceptosMapa, clave:[0,1,2,3,4], tipo:'relacion', mapa:true, banco:[3,0,4,2,1],
    destinos:['Concepto de partida','Segundo concepto','Tercer concepto','Cuarto concepto','Quinto concepto'],
    conectores:['proporcionan información sobre','se procesan mediante','para apoyar la','en los sistemas de'],
    acierto:'¡Correcto! El mapa representa cómo los datos y las variables climáticas se procesan mediante herramientas de análisis para apoyar decisiones en la producción agrícola.',
    error:'Revisa la organización del mapa. Primero se obtienen los datos sobre variables climáticas. Después se procesan con herramientas de análisis y, finalmente, los resultados apoyan la toma de decisiones agrícolas.',
    repaso:'Lee en orden los conectores del mapa y repasa conceptos básicos si necesitas reconstruir la relación.'}
};
const pantallasCalificables = Object.keys(actividades).map(Number).filter(pantalla=>!actividades[pantalla].formativa);

