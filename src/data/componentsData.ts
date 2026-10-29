import { ComponentInfo } from '../types/hardware';

export const COMPONENTS_DATA: Record<string, ComponentInfo> = {
  condensador: {
    id: 'condensador',
    name: 'Condensador SMD',
    technicalAlias: 'Capacitor Cerámico SMD (MLCC)',
    analogy: 'Tanque de Liberación Rápida / Mini-batería ultrarrápida',
    symbol: '-||-',
    measuringUnit: 'Faradio (µF, nF, pF)',
    measuringUnitSymbol: 'F',
    colorAppearance: 'Color café claro / beige rectangular sin polaridad',
    bidirectional: true,
    structure: 'Dos placas conductoras paralelas separadas por un dieléctrico aislante (cerámica o plástico). El tamaño físico indica su capacidad de almacenamiento (Faradios) y su tolerancia de voltaje.',
    primaryFunctions: [
      'Almacenamiento rápido: Libera energía instantánea para componentes con alto consumo súbito (flash de cámara, motores vibradores).',
      'Nivelación de voltaje: Absorbe fluctuaciones y picos repentinos cuando el voltaje sube y lo libera cuando baja.',
      'Generación de retrasos: Introduce tiempos e intervalos específicos requeridos por circuitos lógicos.',
      'Regulación de corriente: Suaviza la corriente continua (DC), eliminando rizado y estabilizando la frecuencia.'
    ],
    mobileLocations: [
      'Alrededor del circuito de gestión de energía (PMIC).',
      'En líneas de alimentación del procesador y memoria RAM/UFS.',
      'Cerca de la etapa del circuito de carga de batería y flash LED.'
    ],
    failureCauses: [
      {
        title: 'Falta de Mantenimiento (Polvo y Suciedad)',
        description: 'El polvo acumulado actúa como aislante térmico. Al subir la temperatura de trabajo, las finas capas internas se funden y unen, provocando un corto circuito total a tierra.'
      },
      {
        title: 'Humedad y Electrólisis',
        description: 'La presencia de agua o sulfato genera electrólisis química entre las terminales positiva y negativa, destruyendo el dieléctrico e interconectando las placas internas en cortocircuito.'
      }
    ],
    damageVisualSigns: [
      'Cambio drástico de color: Pasa de su color café claro original a un café muy oscuro o negro carbón.',
      'Fisuras microscópicas o fractura del bloque cerámico.',
      'Temperatura extrema anormal: Cuando entra en corto circuito, puede calentarse al punto de quemar la piel al tacto.'
    ],
    multimeterTest: {
      mode: 'Capacitancia',
      healthyReading: 'Valor en µF/nF según esquema técnico; sin continuidad a tierra (no pita en continuidad).',
      faultyReading: 'Pita en escala de continuidad (resistencia cercana a 0Ω) o muestra fuga de corriente en prueba de diodo.',
      instructions: '1. Desconectar la batería. 2. Poner multímetro en modo Continuidad. Si pita entre ambas terminales montado en placa o con tierra, sospechar de corto. 3. Para descartar fugas sutiles, medir caída de tensión en miliVoltios.'
    },
    goldenRule: {
      type: 'mandatory_replace',
      message: 'REGLA DE REPARACIÓN DE ORO: Si retiras un condensador en corto circuito, la placa puede volver a encender, pero es ESTRICTAMENTE OBLIGATORIO soldar uno nuevo del mismo valor para evitar que sobretensiones futuras destruyan el procesador o el PMIC.'
    }
  },

  resistencia: {
    id: 'resistencia',
    name: 'Resistencia SMD',
    technicalAlias: 'Resistor de Película Gruesa SMD',
    analogy: 'El Cuello de Botella del Flujo de Electrones',
    symbol: '-/\\/\\/\\-',
    measuringUnit: 'Ohmios (Ω, kΩ, MΩ)',
    measuringUnitSymbol: 'Ω',
    colorAppearance: 'Cuerpo negro rectangular con números grabados (ej: 104, 4R7, 0)',
    bidirectional: true,
    structure: 'Sustrato cerámico cubierto por una película resistiva de óxido metálico con terminales estañadas. Su valor determina la oposición al flujo de electrones convirtiendo el exceso de energía eléctrica en calor disipado.',
    primaryFunctions: [
      'Oposición al flujo: Reduce la corriente para evitar que circuitos que operan a baja tensión se quemen o sobrecalienten.',
      'Transformación de energía: Convierte picos en calor controlado, estabilizando un flujo suave y constante.',
      'Control de corriente de batería: Protege circuitos delicados contra descargas o corrientes súbitas de la batería.',
      'Divisor de tensión (Voltage Divider): Divide un voltaje alto en dos tensiones menores para alimentar sensores o líneas de referencia, prolongando la autonomía de la batería.'
    ],
    mobileLocations: [
      'Líneas de control I2C y SPI (resistencias Pull-Up / Pull-Down).',
      'Circuitos de sensado de corriente y divisores de voltaje de referencia.',
      'Líneas de polarización de transistores y drivers de pantalla.'
    ],
    failureCauses: [
      {
        title: 'Sobrevoltaje / Subida brusca de tensión',
        description: 'Una sobretensión quema la película resistiva interna, provocando una separación de capas que deja el componente en circuito abierto (OL).'
      },
      {
        title: 'Humedad y Electrólisis del Estaño',
        description: 'La corrosión corroe los pads de soldadura en los extremos, desprendiendo físicamente la resistencia de la pista de cobre.'
      },
      {
        title: 'Polvo y Calor Acumulado',
        description: 'Al no poder disipar su temperatura de trabajo habitual, la placa interna se rompe por estrés térmico.'
      }
    ],
    damageVisualSigns: [
      'Mancha negra de quemado, superficie carbonizada o números ilegibles.',
      'Terminales desprendidas o pistas corroídas verdosas.',
      'Fisura transversal en el encapsulado cerámico.'
    ],
    multimeterTest: {
      mode: 'Ohmios',
      healthyReading: 'Coincide con el código serigrafiado (ej. 104 = 100kΩ, 4R7 = 4.7Ω) con tolerancia del 1% al 5%.',
      faultyReading: 'Marca "O.L" (Open Loop / Abierta) o un valor de resistencia alterado significativamente superior al original.',
      instructions: 'Colocar multímetro en escala de Resistencia (Ω). Colocar las dos puntas en los extremos del resistor. Si marca OL o no conduce, la resistencia está abierta.'
    },
    goldenRule: {
      type: 'critical_failure_if_removed',
      message: '¡ALERTA CRÍTICA!: A diferencia del condensador, retirar una resistencia provoca una FALLA INMINENTE Y TOTAL en esa línea de circuito. La línea queda abierta e inoperable. El reemplazo inmediato con el valor exacto en Ohmios es obligatorio.'
    }
  },

  filtro: {
    id: 'filtro',
    name: 'Filtro SMD (EMI)',
    technicalAlias: 'Filtro de Interferencia Electromagnética (EMI Filter / Choke)',
    analogy: 'El Purificador de Señal de Alta Velocidad',
    symbol: '-[===]-',
    measuringUnit: 'Continuidad / Atenuación de Ruido (dB)',
    measuringUnitSymbol: 'Cont.',
    colorAppearance: 'Encapsulado metálico o cerámico gris/plateado de 4 terminales (2 entradas, 2 salidas)',
    bidirectional: true,
    structure: 'Par de bobinas acopladas o micro-filtros diseñados para dejar pasar señales de datos de muy alta velocidad sin distorsión mientras bloquean el ruido electromagnético parásito hacia tierra.',
    primaryFunctions: [
      'Limpieza y pureza de señal: Estabiliza líneas de datos de alta frecuencia que comunican directamente el procesador con la pantalla (MIPI DSI) y cámaras (MIPI CSI).',
      'Prevención de fallas visuales: Evita parpadeos de pantalla, líneas verticales o ruidos de imagen causados por interferencias.',
      'Filtro de ruido (NO regula voltajes altos, solo datos de alta velocidad).'
    ],
    mobileLocations: [
      'Conector FPC de pantalla LCD / AMOLED (líneas de datos de visualización).',
      'Conectores de cámaras frontales y traseras.',
      'Líneas de interfaz HDMI / DisplayPort móvil.'
    ],
    failureCauses: [
      {
        title: 'Golpe físico o caída del teléfono',
        description: 'Como trabajan con señales de muy baja potencia, es rarísimo que se quemen eléctricamente. Casi el 99% de fallas se deben a impactos que fracturan la soldadura o arrancan el componente.'
      },
      {
        title: 'Falla humana por manipulación',
        description: 'Técnicos que usan palancas plásticas o metálicas sin cuidado al desconectar el flex de la pantalla arrancan accidentalmente los filtros EMI cercanos.'
      }
    ],
    damageVisualSigns: [
      'Filtro arrancado o ladeado dejando los pads de soldadura al descubierto.',
      'Esquina o cuerpo roto tras un impacto severo.',
      'Pantalla palpita, muestra rayas o pantalla negra manteniendo sonido táctil activo.'
    ],
    multimeterTest: {
      mode: 'Continuidad',
      healthyReading: 'Debe dar continuidad perfecta (pitido del multímetro y 0Ω) entre la entrada y su correspondiente salida.',
      faultyReading: 'Sin continuidad (circuito cortado) entre el pin de entrada y el de salida de la misma línea.',
      instructions: 'Poner multímetro en continuidad. Medir entre el pad de entrada y el pad de salida del filtro. Debe sonar el buzzer de continuidad. Si no suena, la línea de video está cortada.'
    },
    goldenRule: {
      type: 'jumper_possible',
      message: 'TÉCNICA DE REPARACIÓN DE ORO (JUMPER): Si un filtro EMI se desprende o rompe, se puede restaurar la comunicación instantáneamente haciendo un "Jumper" (puenteando los pads de entrada y salida con un hilo de cobre esmaltado ultrafino).'
    }
  },

  diodo: {
    id: 'diodo',
    name: 'Diodo SMD',
    technicalAlias: 'Semiconductor Unidireccional SMD',
    analogy: 'La Válvula de Un Solo Sentido (Torniquete de Entrada)',
    symbol: '-|>|-',
    measuringUnit: 'Caída de Tensión (miliVoltios - mV)',
    measuringUnitSymbol: 'mV / V',
    colorAppearance: 'Encapsulado negro o vidrio con banda/rayas serigrafiadas',
    bidirectional: false,
    structure: 'Unión semiconductora P-N que permite el paso de electrones en una sola dirección (del Ánodo al Cátodo). La banda serigrafiada SIEMPRE identifica el terminal CÁTODO (-).',
    primaryFunctions: [
      'Control de dirección: Permite el paso de corriente exclusivamente hacia adelante, impidiendo el retorno destructivo de electrones.',
      'Eficiencia energética: Fundamental en dispositivos portátiles alimentados por batería de litio.',
      'Protección y elevación de voltaje según su tipo especializado (Zener, Schottky, TVS, LED).'
    ],
    mobileLocations: [
      'Circuito elevador de luz de fondo (Backlight) de pantalla.',
      'Líneas de entrada USB, Jack de audio, lectores SIM y MicroSD.',
      'Módulos de protección contra descargas electrostáticas (ESD) en botones y antenas.'
    ],
    failureCauses: [
      {
        title: 'Sobrevoltaje superior a la tensión de ruptura',
        description: 'Un pico de tensión mayor al voltaje de diseño quema la unión semiconductora, causando corto circuito total o perforación central.'
      },
      {
        title: 'Inversión de polaridad en soldadura',
        description: 'Si se suelda invertido (cátodo donde va el ánodo), la corriente circulará de manera opuesta provocando corto masivo y daño permanente en la mainboard.'
      },
      {
        title: 'Fuga de corriente interna',
        description: 'Pérdida paulatina de la barrera de potencial; el diodo se sobrecalienta y drena la batería rápidamente.'
      }
    ],
    damageVisualSigns: [
      'Orificio diminuto característico visible en el centro del encapsulado.',
      'Cuerpo partido o agrietado por descarga repentina.',
      'Decoloración negruzca o ampollas por alta temperatura.'
    ],
    multimeterTest: {
      mode: 'Caída de Tensión (Diodo)',
      healthyReading: 'Polarización directa (roja en ánodo, negra en cátodo): 200mV a 700mV. Polarización inversa: "OL" (bloqueo total).',
      faultyReading: 'Pita en ambos sentidos (corto circuito) o da "OL" en ambos sentidos (abierto).',
      instructions: 'Multímetro en escala de diodo. Punta roja al Ánodo (+), punta negra al Cátodo (-). Debe medir caída de tensión (aprox 0.2V a 0.6V). Al invertir las puntas debe marcar O.L.'
    },
    goldenRule: {
      type: 'mandatory_replace',
      message: 'REGLA DE POLARIDAD CRÍTICA: ¡Las rayas impresas SIEMPRE marcan el Cátodo (-)! Soldar un diodo al revés destruirá pistas o quemará circuitos adyacentes. En caso de diodos TVS, retirar uno quemado revive el circuito pero lo deja vulnerable a cualquier descarga futura.'
    }
  },

  termistor: {
    id: 'termistor',
    name: 'Termistor SMD',
    technicalAlias: 'Resistor Térmico Sensible a Temperatura',
    analogy: 'El Termómetro Guardián del Teléfono',
    symbol: '-[/]- (Resistencia con línea transversal)',
    measuringUnit: 'Ohmios variables con la temperatura',
    measuringUnitSymbol: 'Ω (f(T))',
    colorAppearance: 'Cuerpo cerámico muy pequeño, similar a una resistencia pero a menudo sin numeración',
    bidirectional: true,
    structure: 'Óxidos metálicos sinterizados que experimentan una variación predecible y no lineal de su resistencia eléctrica en respuesta a cambios de temperatura ambiente o del componente monitorizado.',
    primaryFunctions: [
      'Monitoreo térmico: Mide continuamente la temperatura del puerto de carga, el procesador y el módulo de radiofrecuencia (GSM).',
      'Protección de la batería y CPU: Informa al sistema operativo y al PMIC para detener la carga rápida o reducir la frecuencia del procesador si hay calentamiento.',
      'NTC (Coeficiente Negativo): A MAYOR temperatura, MENOR resistencia (el estándar en placas móviles).',
      'PTC (Coeficiente Positivo): A mayor temperatura, mayor resistencia.'
    ],
    mobileLocations: [
      'Puerto de carga (Sub-placa): Censa la temperatura durante la carga rápida por cable USB.',
      'Cerca del Procesador (CPU / SoC): Evita que el chip principal supere su límite seguro de trabajo.',
      'Etapa de Radiofrecuencia (RF / Módem GSM): Monitorea la alta disipación térmica de los amplificadores de potencia (PA).'
    ],
    failureCauses: [
      {
        title: 'Humedad en puerto de carga',
        description: 'La condensación u óxido en la zona del conector de carga altera el valor resistivo del termistor o deteriora sus terminales de estaño.'
      },
      {
        title: 'Sobretensión y picos de corriente',
        description: 'Un pico rompe sus capas microscópicas internas, provocando que envíe lecturas de resistencia completamente erráticas.'
      },
      {
        title: 'Componente arrancado o ausente',
        description: 'Tras un cambio de conector de carga con pistola de calor, el termistor se vuela o desolda.'
      }
    ],
    damageVisualSigns: [
      'Alerta en pantalla del celular: "Temperatura del dispositivo demasiado alta" o "Temperatura demasiado baja. Carga pausada" aún cuando el teléfono está frío (Falso Positivo en OS).',
      'Terminales sulfatadas con óxido verdoso.',
      'Componente faltante en la configuración típica en paralelo (Termistor + Resistencia + Condensador).'
    ],
    multimeterTest: {
      mode: 'Ohmios',
      healthyReading: 'Medición de resistencia ambiente (ej. 10kΩ, 47kΩ o 100kΩ) que DISMINUYE de forma visible y suave al acercar calor (NTC).',
      faultyReading: 'Resistencia infinita (OL), resistencia estática que no reacciona al calor o valor cercano a cero.',
      instructions: '1. Medir en escala de Ohmios a temperatura ambiente (anotar valor). 2. Acercar la punta del soldador tibio o aire caliente con precaución. 3. Si es NTC, los ohmios deben descender rápidamente. Si no varía, el termistor está dañado.'
    },
    goldenRule: {
      type: 'critical_failure_if_removed',
      message: 'EL FALSO POSITIVO TÉRMICO: Si un celular arroja error de temperatura en pantalla y no carga, la causa casi siempre es un termistor dañado o ausente. En una placa móvil hay 3 termistores clave (Carga, CPU, RF). Retirarlo dejará el mensaje de error permanente; debe reemplazarse.'
    }
  },

  bobina: {
    id: 'bobina',
    name: 'Bobina SMD (Inductor)',
    technicalAlias: 'Inductor de Potencia / Choque de Ferrita SMD',
    analogy: 'El Resorte Magnético Amortiguador de Corriente',
    symbol: '-UUUU-',
    measuringUnit: 'Henrios (µH, nH) / Resistencia DC muy baja',
    measuringUnitSymbol: 'H / Ω',
    colorAppearance: 'Cuerpo cúbico o toroidal oscuro con hilo de cobre enrollado visible o encapsulado blindado gris con código (ej. 4R7, 100)',
    bidirectional: true,
    structure: 'Hilo de cobre esmaltado devanado alrededor de un núcleo ferromagnético (ferrita). Al fluir corriente crea un campo magnético que almacena energía y se resiste tenazmente a variaciones bruscas de corriente.',
    primaryFunctions: [
      'Oposición a variaciones bruscas: Amortigua picos súbitos de corriente actuando como regulador inercial magnético.',
      'Filtrado y conversión DC-DC (Buck/Boost): Almacena y transfiere energía en fuentes conmutadas que alimentan voltajes estables a la CPU y GPU.',
      'Sintonización y filtrado en circuitos de radiofrecuencia (RF).'
    ],
    mobileLocations: [
      'Rodeando el PMIC principal (Power Management IC) en las fuentes conmutadas secundarias.',
      'En convertidores de voltaje de backlight y cámara.',
      'En etapas de antena y filtrado de amplificación RF.'
    ],
    failureCauses: [
      {
        title: 'Daño estructural por caída severa',
        description: 'El núcleo de ferrita es frágil y cerámico; un impacto fuerte fisura el núcleo o quiebra las patillas de soporte.'
      },
      {
        title: 'Sobrecorriente prolongada',
        description: 'Si un circuito posterior entra en corto, la corriente excesiva que atraviesa la bobina funde el barniz aislante del cobre, provocando espiras en corto.'
      }
    ],
    damageVisualSigns: [
      'Blindaje de ferrita quebrado o astillado.',
      'Hilo de cobre descolorido por sobrecalentamiento excesivo o desprendido.',
      'Inestabilidad general de energía en la placa móvil (reinicios, apagados bruscos).'
    ],
    multimeterTest: {
      mode: 'Continuidad',
      healthyReading: 'Continuidad total con resistencia cercana a cero (0.1Ω a 2Ω); pita con fuerza en multímetro.',
      faultyReading: 'Circuito abierto (OL / no pita) si el hilo interno de cobre se ha roto.',
      instructions: 'Poner el multímetro en continuidad o escala baja de ohmios. Colocar las puntas en ambos extremos. Una bobina sana DEBE dar continuidad franca y pitar, indicando que el devanado interno está intacto.'
    },
    goldenRule: {
      type: 'mandatory_replace',
      message: 'REGLA DE CONVERSIÓN DE ENERGÍA: Aunque una bobina en cortocircuito dé continuidad engañosa, si el núcleo de ferrita está roto o sus espiras fundidas, perderá su inductancia y la fuente conmutada no podrá generar el voltaje para la CPU. Reemplazarla de otra placa donante.'
    }
  }
};

export const DIODE_SUBTYPES_DATA = [
  {
    id: 'rectificador',
    name: 'Diodo Rectificador',
    iconSymbol: 'A ~ => =',
    functionDescription: 'Convierte corriente alterna (AC) en corriente continua (DC).',
    mobileApplication: 'Adaptadores de corriente / Cargadores de pared del celular.',
    keyFact: 'Permite que el cargador entregue los 5V/9V/12V DC limpios que utiliza la batería del teléfono.'
  },
  {
    id: 'schottky',
    name: 'Diodo Schottky',
    iconSymbol: '⚡ ⇥',
    functionDescription: 'Alta velocidad de conmutación y caída de tensión extremadamente baja (0.2V - 0.3V).',
    mobileApplication: 'Líneas de interacción del usuario: Conector USB, Jack de manos libres, Lector de tarjeta SIM, Lector MicroSD.',
    keyFact: 'Protege las líneas de comunicación de alta velocidad con mínimo desperdicio de energía.'
  },
  {
    id: 'zener',
    name: 'Diodo Zener',
    iconSymbol: '📊 ↗',
    functionDescription: 'Regulación precisa y elevación extrema de voltaje trabajando en polarización inversa.',
    mobileApplication: 'Circuito elevador de retroiluminación de pantalla (Backlight): eleva de 4.7V a 19.0V.',
    keyFact: 'Esencial para que la pantalla del celular se ilumine; sin él la pantalla se queda oscura pero con imagen visible a contra-luz.'
  },
  {
    id: 'led',
    name: 'Diodo LED SMD',
    iconSymbol: '💡 ♻️',
    functionDescription: 'Emisión de luz visible de alta eficiencia.',
    mobileApplication: 'Flash de cámara, retroiluminación LCD, indicadores de estado.',
    keyFact: 'En pantallas LCD se conectan en paralelo para que la corriente sea reciclada y prolongar la vida útil de la batería.'
  },
  {
    id: 'tvs',
    name: 'Diodo TVS (Transient Voltage Suppressor)',
    iconSymbol: '🛡️ ⚡',
    functionDescription: 'Supresor de picos transitorios BIDIRECCIONAL sin polaridad. El guardaespaldas de la placa.',
    mobileApplication: 'Líneas de datos externas expuestas al usuario y descargas electrostáticas (ESD).',
    keyFact: 'Se inmola en cortocircuito al detectar un pico destructivo para salvar la CPU. Retirarlo enciende el teléfono, pero queda desprotegido.'
  }
];

export const DIAGNOSTIC_MATRIX_ROWS = [
  {
    component: 'Condensador SMD',
    symbol: '-||-',
    cause: 'Polvo acumulado / Humedad con electrólisis',
    symptom: 'Cambio de café claro a oscuro/negro, calentamiento extremo quemante',
    multimeter: 'Fugas de corriente / Cortocircuito franco a tierra (pita en continuidad)',
    consequence: 'El circuito puede encender al retirarlo, pero es de RIESGO MUY ALTO. Reemplazo OBLIGATORIO.',
    actionBadge: 'Reemplazo Obligatorio'
  },
  {
    component: 'Resistencia SMD',
    symbol: '-/\\/\\/\\-',
    cause: 'Sobretensión / Ruptura por calor / Electrólisis en estaño',
    symptom: 'Quemada, carbonizada o desprendida de la pista',
    multimeter: 'Valor en Ohmios alterado o circuito totalmente abierto (O.L)',
    consequence: 'Falla inminente y total de esa línea. El circuito NO funciona sin ella.',
    actionBadge: 'Reemplazo Obligatorio'
  },
  {
    component: 'Filtro SMD (EMI)',
    symbol: '-[===]-',
    cause: 'Golpe físico severo / Falla humana al desconectar flexores',
    symptom: 'Desprendido, quebrado, pantalla parpadea o pierde señal de imagen',
    multimeter: 'Falta de continuidad entre pin de entrada y salida',
    consequence: 'Señal de datos cortada al procesador. Se puede restaurar haciendo JUMPER.',
    actionBadge: 'Admite Jumper'
  },
  {
    component: 'Diodo SMD (Gen / TVS)',
    symbol: '-|>|-',
    cause: 'Exceso de voltaje de trabajo / Descarga electrostática (ESD)',
    symptom: 'Orificio visible en el centro, fisura física, calentamiento anormal',
    multimeter: 'Caída de tensión anormal, pita en ambos sentidos o abierta',
    consequence: 'TVS quemado apaga la línea. Al quitarlo enciende pero hay pérdida permanente de protección.',
    actionBadge: 'Reemplazo TVS'
  },
  {
    component: 'Termistor SMD',
    symbol: '-[/]-',
    cause: 'Humedad en puerto de carga / Sobretensión / Componente ausente',
    symptom: 'Alerta en pantalla: "Temperatura demasiado alta/baja" (Falso Positivo en OS)',
    multimeter: 'Valor en Ohmios no varía al aplicarle calor suave con cautín/aire',
    consequence: 'El teléfono se bloquea, detiene la carga o arroja aviso falso. No se puede omitir.',
    actionBadge: 'Reemplazo Requerido'
  },
  {
    component: 'Bobina SMD',
    symbol: '-UUUU-',
    cause: 'Daño estructural en ferrita por caída / Sobrecorriente',
    symptom: 'Inestabilidad severa de energía, reinicios en bucle, ferrita astillada',
    multimeter: 'Falta de continuidad interna si el hilo se abrió, o pérdida de inductancia',
    consequence: 'Fallo crítico en etapas de filtrado y fuentes conmutadas (PMIC / Backlight).',
    actionBadge: 'Reemplazo Donante'
  }
];
