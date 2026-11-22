'use strict';

const casosCientificos = [
  ['Servicios climáticos','Senegal','Datos de panel de dos temporadas y modelos econométricos para estudiar el uso de información meteorológica y climática.','El estudio estimó aumentos de entre 10 % y 25 % en los ingresos de los cultivos asociados al uso de información meteorológica y climática.','Ajustar labores del cultivo mediante información coproducida con los agricultores.','La estimación corresponde a las temporadas y los productores estudiados.','Chiputwa et al. (2022)'],
  ['Decisiones agrícolas','Elundini, Sudáfrica','Encuesta transversal a 217 pequeños productores y emparejamiento por puntaje de propensión.','El acceso a servicios climáticos se asoció con diferencias en decisiones de siembra, variedades, preparación del terreno y seguridad alimentaria.','Elegir momento de siembra y organizar las labores del lote.','El emparejamiento usa características observadas en una encuesta de un solo municipio.','Nocezo et al. (2024b)'],
  ['Fechas de siembra de maíz','Nigeria','Datos meteorológicos y edáficos y simulaciones DSSAT CERES-Maize para 1981–2019.','Las fechas óptimas simuladas varían por zona agroecológica. En más de tres cuartas partes del país el estudio no identificó cambios significativos durante el periodo.','Actualizar calendarios de siembra donde la evidencia local lo justifique.','Los resultados dependen de los supuestos del modelo y de la resolución de los datos.','Mkuhlani, Garcia Bendito, et al. (2024)'],
  ['Predicción de fechas de siembra de maíz','Norte de Tailandia','Aprendizaje automático basado en árboles, CROPWAT, registros de lluvia y fases del fenómeno El Niño–Oscilación del Sur (ENSO).','La integración permitió explorar variables asociadas con reducciones de rendimiento y estimar fechas de siembra bajo distintos escenarios climáticos.','Comparar ventanas de siembra para maíz de secano.','La aplicación a otras regiones requiere calibración y validación local.','Supriyasilp (2026)'],
  ['Programación del riego mediante evapotranspiración','Región de Murcia, España','Modelo de aprendizaje profundo que combina servicios climáticos abiertos y datos de teledetección.','El estudio estimó la evapotranspiración de referencia. Con un coeficiente apropiado para el cultivo, esta estimación orienta el cálculo de la demanda de agua.','Estimar necesidades hídricas como insumo para programar el riego.','La estimación depende de la calidad de los datos y de la validación en el territorio. El cálculo operativo requiere información del cultivo y del lote.','Sánchez et al. (2026)'],
  ['Herramientas de sequía','Hawái, Estados Unidos','Diseño colaborativo de herramientas a partir de datos climáticos locales y de información sobre sequía y forraje.','Las herramientas entregan información específica por sitio para la planificación. La evaluación formal de adopción e impacto sigue en desarrollo.','Planificar recursos ante la sequía y gestionar la disponibilidad de forraje.','El efecto sobre las decisiones y el acceso equitativo requiere evaluación formal.','Longman et al. (2026)']
];

const referenciasAPA = [
  [
    "Chiputwa, B., Blundo-Canto, G., Steward, P., Andrieu, N., & Ndiaye, O. (2022). Co-production, uptake of weather and climate services, and welfare impacts on farmers in Senegal: A panel data approach.",
    "Agricultural Systems",
    ", 195, 103309.",
    "https://doi.org/10.1016/j.agsy.2021.103309"
  ],
  [
    "Giraldo, D., Clarkson, G., Dorward, P., Obando, D., & Ramirez-Villegas, J. (2023). The development of a farmer decision-making mind map to inform climate services in Central America.",
    "Frontiers in Climate",
    ", 5, 1235601.",
    "https://doi.org/10.3389/fclim.2023.1235601"
  ],
  [
    "Inkani, A. I., Mashi, S. A., Oghenejabor, O. D., Jenkwe, E. D., & Sani, S. (2026). Towards enhanced resilience, adaptation, and sustainability of farming ecosystems: Assessment of the efficiency of specialized public institutions in weather and climate services delivery to smallholder farmers.",
    "Mitigation and Adaptation Strategies for Global Change",
    ", 31(1), Article 10.",
    ""
  ],
  [
    "Kosoe, E. A., & Ahmed, A. (2022). Climate change adaptation strategies of cocoa farmers in the Wassa East District: Implications for climate services in Ghana.",
    "Climate Services",
    ", 26, 100289.",
    "https://doi.org/10.1016/j.cliser.2022.100289"
  ],
  [
    "Longman, R. J., Ford, D., Heu, C., Geis, J., Frazier, A. G., Giardina, C. P., Potemra, J. T., Cleveland, S. B., & Marra, J. J. (2026). Improved climate services in Hawai‘i: The collaborative development of drought-related decision support tools.",
    "Frontiers in Climate",
    ", 8, 1768549.",
    "https://doi.org/10.3389/fclim.2026.1768549"
  ],
  [
    "Luu, T. T. G., Whitney, C., Biber-Freudenberger, L., & Luedeling, E. (2022). Decision analysis of agro-climate service scaling: A case study in Dien Bien District, Vietnam.",
    "Climate Services",
    ", 27, 100313.",
    "https://doi.org/10.1016/j.cliser.2022.100313"
  ],
  [
    "Malakar, Y., Fleming, A., Fielke, S., Snow, S., & Jakku, E. (2024). Comparing established practice for short-term forecasts and emerging use of climate projections to identify opportunities for climate services in Australian agriculture.",
    "Climate Services",
    ", 33, 100442.",
    "https://doi.org/10.1016/j.cliser.2023.100442"
  ],
  [
    "Malakar, Y., Fleming, A., Snow, S., Jakku, E., & Fielke, S. (2025). Farmers’ perceptions of future risks and opportunities, and their expected future use of climate projections for decision-making.",
    "Environmental Research Communications",
    ", 7(5), 055020.",
    "https://doi.org/10.1088/2515-7620/add66f"
  ],
  [
    "Manzvera, J., Anaman, K. A., Mensah-Bonsu, A., & Barimah, A. (2024). The economic value of seasonal weather and climate services for maize farmers in Manicaland Province of Zimbabwe.",
    "Heliyon",
    ", 10(23), e40781.",
    "https://doi.org/10.1016/j.heliyon.2024.e40781"
  ],
  [
    "Mkuhlani, S., Garcia Bendito, E., Tofa, A. I., Aliyu, K. T., Shehu, B. M., Kreye, C., & Chemura, A. (2024). Spatial and temporal distribution of optimal maize sowing dates in Nigeria.",
    "PLOS ONE",
    ", 19(5), e0300427.",
    "https://doi.org/10.1371/journal.pone.0300427"
  ],
  [
    "Mkuhlani, S., Rusere, F., Zinyengere, N., & Crespo, O. (2024). Integrating seasonal forecast information with crop models to inform decision making in small-scale farming under climate variability.",
    "South African Journal of Plant and Soil",
    ", 41(4–5), 95–109.",
    "https://doi.org/10.1080/02571862.2024.2420239"
  ],
  [
    "Nocezo, Y.-I., Manyike, J. Z., Zhou, L., & Ngarava, S. (2024a). Determinants of smallholder crop farmers’ access to climate services in Elundini local municipality, Eastern Cape province, South Africa.",
    "Frontiers in Climate",
    ", 6, 1447510.",
    "https://doi.org/10.3389/fclim.2024.1447510"
  ],
  [
    "Nocezo, Y.-I., Manyike, J. Z., Zhou, L., & Ngarava, S. (2024b). The impact of access to climate services on smallholder farmers’ cropping decisions and household food security in Elundini municipality, Eastern Cape province.",
    "Frontiers in Climate",
    ", 6, 1458999.",
    "https://doi.org/10.3389/fclim.2024.1458999"
  ],
  [
    "Nsengiyumva, G., Clarkson, G., Gumucio, T., Dorward, P., & Ingabire, C. (2022). Exploring the effects of a participatory climate services approach on smallholder decision-making in Rwanda using a gender lens.",
    "Gender, Technology and Development",
    ", 26(3), 544–563.",
    "https://doi.org/10.1080/09718524.2022.2144102"
  ],
  [
    "Sánchez, V. C., González, M., Fernández-Pedauyé, J., Calafate, C. T., Erena, M., & Cecilia, J. M. (2026). A scalable deep learning framework for evapotranspiration estimation using open-access climate services and remote sensing.",
    "Journal of Ambient Intelligence and Smart Environments",
    ", 18(3), 336–358.",
    "https://doi.org/10.1177/18761364261460560"
  ],
  [
    "Snow, S., Fielke, S., Fleming, A., Jakku, E., Malakar, Y., Turner, C., Hunter, T., Tijs, S., & Bonnett, G. (2024). Climate services for agriculture: Steering towards inclusive innovation in Australian climate services design and delivery.",
    "Agricultural Systems",
    ", 217, 103938.",
    "https://doi.org/10.1016/j.agsy.2024.103938"
  ],
  [
    "Snow, S., Fleming, A., Fielke, S., Malakar, Y., Jakku, E., Tozer, C., & Bonnett, G. D. (2024). “A little bit obsessed with the weather”: Leveraging Australian farmers’ online weather practices to inform the design of climate services.",
    "NJAS: Impact in Agricultural and Life Sciences",
    ", 96(1), 2296652.",
    "https://doi.org/10.1080/27685241.2023.2296652"
  ],
  [
    "Supriyasilp, T. (2026). Integrating tree-based machine learning with CROPWAT and ENSO for optimizing maize sowing dates in response to climate variability.",
    "Computers and Electronics in Agriculture",
    ", 240, 111185.",
    "https://doi.org/10.1016/j.compag.2025.111185"
  ],
  [
    "Yegbemey, R. N., Gouwakinnou, J. Y., & Azumah, S. B. (2024). Understanding farmers’ awareness of climate services: Knowledge, practice, and attitude towards weather information in Benin, West Africa.",
    "Regional Environmental Change",
    ", 24(1), Article 27.",
    "https://doi.org/10.1007/s10113-023-02178-0"
  ],
  [
    "Zhu, Z., & Feng, Y. (2026). Can warnings move farmers to action? From hazard notification to decision enablement in agrometeorological climate services.",
    "Climate Services",
    ", 43, 100697.",
    "https://doi.org/10.1016/j.cliser.2026.100697"
  ]
];
