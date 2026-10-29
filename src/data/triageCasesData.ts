import { TriageCase } from '../types/hardware';

export const TRIAGE_CASES: TriageCase[] = [
  {
    id: 'case-1',
    title: 'Caso 1: El celular no enciende tras contacto con líquido',
    difficulty: 'Principiante',
    deviceModel: 'Samsung Galaxy A52',
    customerSymptom: 'El cliente comenta que el móvil cayó al agua. Lo metió en arroz y al día siguiente no encendía nada ni toma carga. Al conectarlo a la fuente de alimentación, el consumo sube a 2.5A instantáneamente (bloqueo por corto a tierra).',
    boardSection: 'Línea principal VDD_MAIN / Alrededor del PMIC',
    faultyComponent: 'condensador',
    faultDetail: 'Condensador cerámico SMD en cortocircuito franco a tierra debido a electrólisis por humedad.',
    microscopeClues: {
      visualState: 'burnt_black',
      description: 'Bajo el microscopio se aprecia un componente rectangular que originalmente era de color café claro, pero ahora presenta un tono marrón oscuro/negro carbón con sulfato blanco en sus extremos.'
    },
    multimeterReadings: {
      mode: 'Continuidad',
      value: '0.00 Ω (Pita continuo)',
      isBeeping: true,
      explanation: 'El multímetro pita inmediatamente al tocar ambos extremos del componente y con respecto a tierra. Las capas internas de electrodos se fundieron.'
    },
    thermalReading: {
      tempC: 84.5,
      hotspot: true,
      description: 'La cámara térmica muestra un punto caliente al rojo vivo (84.5°C) directamente sobre el condensador. Quemaría la piel del técnico.'
    },
    options: [
      {
        id: 'opt-1a',
        diagnosis: 'Condensador en cortocircuito total por electrólisis.',
        action: 'Retirar el condensador quemado y dejar el espacio vacío permanente porque los condensadores son opcionales.',
        isCorrect: false,
        explanation: '¡Incorrecto! Aunque la placa puede encender al retirarlo, la Guía Maestra indica que es OBLIGATORIO instalar uno nuevo para proteger el circuito de futuras sobretensiones.'
      },
      {
        id: 'opt-1b',
        diagnosis: 'Condensador cerámico SMD en corto a tierra.',
        action: 'Retirar el condensador dañado, limpiar el sulfato e instalar obligatoriamente un nuevo condensador del mismo valor y tolerancia.',
        isCorrect: true,
        explanation: '¡Excelente! Regla de Oro del condensador: retirar el dañado elimina el corto, pero debe reemplazarse inmediatamente para nivelar el voltaje y proteger el PMIC.'
      },
      {
        id: 'opt-1c',
        diagnosis: 'Filtro EMI dañado.',
        action: 'Hacer un Jumper con cable de cobre esmaltado entre ambas terminales.',
        isCorrect: false,
        explanation: '¡Grave error! Si haces un jumper sobre un condensador en línea de alimentación a tierra, estarás uniendo la línea positiva con tierra, creando un corto circuito destructivo permanente.'
      }
    ],
    xpReward: 120
  },

  {
    id: 'case-2',
    title: 'Caso 2: Pantalla parpadea con líneas tras caída',
    difficulty: 'Principiante',
    deviceModel: 'Xiaomi Redmi Note 11',
    customerSymptom: 'El teléfono sufrió una fuerte caída. Emite sonidos de notificaciones y vibra, pero la pantalla parpadea constantemente, muestra líneas y a ratos se va a negro.',
    boardSection: 'Cerca del conector FPC de pantalla / Líneas MIPI DSI al CPU',
    faultyComponent: 'filtro',
    faultDetail: 'Filtro EMI desprendido físicamente por el impacto mecánico de la caída.',
    microscopeClues: {
      visualState: 'detached_missing',
      description: 'El filtro EMI metálico/gris de 4 pines al lado del conector de pantalla está levantado por una esquina; dos pads de soldadura están fracturados al aire.'
    },
    multimeterReadings: {
      mode: 'Continuidad',
      value: 'O.L (Abierto / No pita)',
      isBeeping: false,
      explanation: 'No hay continuidad entre la entrada de la señal del procesador y la salida hacia el conector de la pantalla.'
    },
    thermalReading: {
      tempC: 24.2,
      hotspot: false,
      description: 'Temperatura ambiente normal (24°C). Los filtros trabajan con señales de datos de muy baja potencia y no generan calor.'
    },
    options: [
      {
        id: 'opt-2a',
        diagnosis: 'Filtro EMI desprendido mecánicamente por el golpe.',
        action: 'Aplicar la técnica de JUMPER: puentear los pads con hilo fino de cobre esmaltado (o resoldar el filtro).',
        isCorrect: true,
        explanation: '¡Correcto! Los filtros EMI no regulan voltaje sino señales de alta velocidad. Si se rompen o desprenden, la técnica de Jumper restaura la comunicación de video sin problemas.'
      },
      {
        id: 'opt-2b',
        diagnosis: 'Diodo Zener de backlight quemado.',
        action: 'Reemplazar el circuito de retroiluminación completo.',
        isCorrect: false,
        explanation: 'Incorrecto. La pantalla sí enciende pero parpadea por ruido en los datos de imagen, lo cual es el síntoma clásico del filtro EMI.'
      },
      {
        id: 'opt-2c',
        diagnosis: 'Resistencia en corto circuito.',
        action: 'Retirar la resistencia y dejar la pista abierta.',
        isCorrect: false,
        explanation: 'Incorrecto. No es una resistencia, y si quitas una resistencia provocas una falla inminente en el circuito.'
      }
    ],
    xpReward: 140
  },

  {
    id: 'case-3',
    title: 'Caso 3: "Temperatura del dispositivo demasiado alta"',
    difficulty: 'Intermedio',
    deviceModel: 'Motorola Moto G60',
    customerSymptom: 'El teléfono está a temperatura fresca, pero al conectar el cargador aparece inmediatamente un cuadro de diálogo: "ALERTA: Temperatura de batería muy alta. Carga detenida para proteger el dispositivo". El teléfono se niega a cargar.',
    boardSection: 'Sub-placa de carga / Flex de conexión inferior',
    faultyComponent: 'termistor',
    faultDetail: 'Termistor NTC del circuito de carga sulfatado y con capas internas dañadas, enviando lectura errónea al sistema (Falso Positivo).',
    microscopeClues: {
      visualState: 'corroded_electrolysis',
      description: 'Junto al conector USB tipo C, en un arreglo en paralelo de 3 componentes (termistor + resistencia + condensador), el termistor presenta sulfato verde y terminales desoldadas.'
    },
    multimeterReadings: {
      mode: 'Ohmios',
      value: 'O.L (Infinita / No varía)',
      isBeeping: false,
      explanation: 'En escala de Ohmios marca circuito abierto (OL). Al acercar calor suave con la estación de soldar, el valor no disminuye en absoluto.'
    },
    thermalReading: {
      tempC: 22.0,
      hotspot: false,
      description: 'La placa está fría a 22°C. Es una confirmación total de que se trata de un "FALSO POSITIVO" en el sistema operativo.'
    },
    options: [
      {
        id: 'opt-3a',
        diagnosis: 'El procesador principal está sobrecalentado de verdad.',
        action: 'Cambiar el SoC del teléfono.',
        isCorrect: false,
        explanation: 'Falso. La cámara térmica y el tacto confirman que el teléfono está frío a 22°C. Es un falso positivo térmico provocado por el sensor.'
      },
      {
        id: 'opt-3b',
        diagnosis: 'Termistor NTC de la etapa de carga dañado o con pistas abiertas.',
        action: 'Reemplazar el termistor NTC de la sub-placa con uno de idéntico valor en Ohmios (ej. 47kΩ o 100kΩ).',
        isCorrect: true,
        explanation: '¡Excelente diagnóstico! Al faltar el termistor o estar abierto, el sistema operativo interpreta la resistencia infinita como una anomalía extrema y detiene la carga. El reemplazo restaura el sensado normal.'
      },
      {
        id: 'opt-3c',
        diagnosis: 'Hacer un jumper directo uniendo ambos pads del termistor.',
        action: 'Puentear las terminales del termistor con estaño.',
        isCorrect: false,
        explanation: '¡Peligro! Si puenteas un termistor NTC, simulas una resistencia de 0Ω (lo que el microcontrolador interpretará como miles de grados de temperatura hirviendo), provocando un bloqueo aún mayor.'
      }
    ],
    xpReward: 160
  },

  {
    id: 'case-4',
    title: 'Caso 4: Corto total tras conectar cargador de dudosa calidad',
    difficulty: 'Intermedio',
    deviceModel: 'iPhone 11',
    customerSymptom: 'El usuario usó un cargador genérico en un automóvil. Hubo una chispa y el teléfono se apagó de golpe. No enciende ni reacciona al puerto Lightning.',
    boardSection: 'Línea de entrada VBUS / Diodo de protección TVS',
    faultyComponent: 'diodo',
    faultDetail: 'Diodo TVS (Transient Voltage Suppressor) quemado en cortocircuito tras proteger la placa contra la sobretensión automotriz.',
    microscopeClues: {
      visualState: 'central_hole',
      description: 'El encapsulado SMD del diodo presenta un diminuto orificio visible en el centro, con fisura y tono quemado. Actuó como el "guardaespaldas del circuito".'
    },
    multimeterReadings: {
      mode: 'Diodo',
      value: '0.001 V (Pita en ambos sentidos)',
      isBeeping: true,
      explanation: 'El diodo TVS entró en corto permanente para desviar la sobretensión a tierra y no dejar pasar el pico hacia el CPU.'
    },
    thermalReading: {
      tempC: 72.1,
      hotspot: true,
      description: 'Al inyectar 1.8V en la línea con la fuente de laboratorio, el diodo TVS disipa calor intenso (72°C).'
    },
    options: [
      {
        id: 'opt-4a',
        diagnosis: 'Diodo TVS inmolado por sobretensión / ESD.',
        action: 'Retirar el diodo TVS en corto para que el teléfono vuelva a encender, y luego SOLDAR obligatoriamente un nuevo diodo TVS para no dejar la línea desprotegida.',
        isCorrect: true,
        explanation: '¡Exacto! Regla técnica del diodo TVS: retirar el TVS quemado revive el circuito al instante, pero dejarlo sin él elimina la protección para siempre contra futuros picos. Hay que reponerlo.'
      },
      {
        id: 'opt-4b',
        diagnosis: 'Diodo LED SMD en serie quemado.',
        action: 'Retirar el diodo y puentear con un cable fino.',
        isCorrect: false,
        explanation: 'Incorrecto. No es un LED, es un diodo de protección TVS en paralelo con la línea de alimentación. Puentearlo a tierra mantendría el teléfono en corto total.'
      },
      {
        id: 'opt-4c',
        diagnosis: 'Diodo Schottky soldado con polaridad invertida de fábrica.',
        action: 'Invertir la posición del diodo actual.',
        isCorrect: false,
        explanation: 'Incorrecto. Los diodos TVS son bidireccionales (no tienen polaridad fija). El orificio central demuestra que se quemó protegiendo el circuito.'
      }
    ],
    xpReward: 150
  },

  {
    id: 'case-5',
    title: 'Caso 5: Línea de control abierta y sin arranque',
    difficulty: 'Intermedio',
    deviceModel: 'Huawei P30 Lite',
    customerSymptom: 'El equipo se reinicia constantemente o no llega a la pantalla principal. En el esquema técnico la línea I2C de comunicación no tiene el nivel lógico requerido (debe tener 1.8V pero mide 0.1V).',
    boardSection: 'Línea de bus I2C (Pull-Up)',
    faultyComponent: 'resistencia',
    faultDetail: 'Resistencia SMD de 2.2kΩ quemada internamente por un pico de corriente, quedando en circuito abierto (OL).',
    microscopeClues: {
      visualState: 'cracked',
      description: 'Resistencia negra con código serigrafiado que presenta una micro-fisura transversal que separa sus capas internas.'
    },
    multimeterReadings: {
      mode: 'Ohmios',
      value: 'O.L (Circuito Abierto)',
      isBeeping: false,
      explanation: 'En lugar de marcar 2.2 kΩ, la resistencia marca infinito (OL). La corriente no puede atravesar el obstáculo porque la película resistiva se abrió.'
    },
    thermalReading: {
      tempC: 23.5,
      hotspot: false,
      description: 'Fría. Al estar abierta no fluye corriente, por lo que no disipa calor.'
    },
    options: [
      {
        id: 'opt-5a',
        diagnosis: 'Resistencia SMD abierta por sobretensión.',
        action: 'Retirar la resistencia y dejar la pista vacía, como se hace en los condensadores.',
        isCorrect: false,
        explanation: '¡Alerta de la Guía Maestra!: A diferencia del condensador, retirar una resistencia provoca una FALLA INMINENTE Y TOTAL en ese circuito. No funcionará sin ella.'
      },
      {
        id: 'opt-5b',
        diagnosis: 'Resistencia SMD con ruptura interna.',
        action: 'Reemplazar inmediatamente la resistencia por una nueva del valor exacto en Ohmios (2.2kΩ) tomado de placa donante.',
        isCorrect: true,
        explanation: '¡Perfecto! Una resistencia abierta corta la polarización o el divisor de tensión. El reemplazo inmediato con el valor correcto en Ohmios es mandatorio.'
      },
      {
        id: 'opt-5c',
        diagnosis: 'Filtro EMI dañado.',
        action: 'Hacer un Jumper con cable de cobre esmaltado.',
        isCorrect: false,
        explanation: 'Incorrecto. Una resistencia tiene un valor resistivo calculado para limitar corriente; si haces un jumper eliminas la resistencia y puedes quemar los transistores del procesador.'
      }
    ],
    xpReward: 140
  },

  {
    id: 'case-6',
    title: 'Caso 6: Hay imagen tenue pero la pantalla está completamente oscura',
    difficulty: 'Avanzado',
    deviceModel: 'Xiaomi POCO X3 Pro',
    customerSymptom: 'Al alumbrar la pantalla con la linterna se puede ver el logo de Xiaomi y los iconos del menú de inicio, pero no hay iluminación de fondo (Backlight).',
    boardSection: 'Circuito elevador de retroiluminación (Boost Converter)',
    faultyComponent: 'diodo',
    faultDetail: 'Diodo Zener / Schottky del circuito elevador de Backlight averiado (no eleva el voltaje de 4.7V a 19.0V).',
    microscopeClues: {
      visualState: 'burnt_black',
      description: 'Diodo SMD al lado de la bobina de backlight con encapsulado opaco y signos de estrés térmico severo.'
    },
    multimeterReadings: {
      mode: 'Diodo',
      value: '0.050 V (Fuga severa en inversa)',
      isBeeping: false,
      explanation: 'En lugar de tener su caída normal de 0.3V y bloqueo en inversa (OL), conduce en ambos sentidos con fuga severa, impidiendo que el circuito eleve la tensión a los 19V requeridos por los LEDs.'
    },
    thermalReading: {
      tempC: 58.0,
      hotspot: true,
      description: 'El diodo se entibia anormalmente a 58°C al encender la pantalla.'
    },
    options: [
      {
        id: 'opt-6a',
        diagnosis: 'Diodo del circuito de backlight dañado con fuga.',
        action: 'Reemplazar el diodo respetando estrictamente la polaridad (la banda marcada hacia el cátodo -) para que el circuito eleve el voltaje a 19V.',
        isCorrect: true,
        explanation: '¡Brillante! Según la Guía Maestra, el circuito de iluminación eleva el voltaje de la batería de ~4.7V hasta unos 19.0V gracias a este diodo. La polaridad del cátodo es crítica.'
      },
      {
        id: 'opt-6b',
        diagnosis: 'Filtro EMI desprendido.',
        action: 'Hacer un Jumper con estaño.',
        isCorrect: false,
        explanation: 'Incorrecto. La imagen sí está presente (se ve con linterna), por lo que las líneas de datos MIPI procesador-pantalla están sanas; lo que falta es la iluminación de alto voltaje.'
      },
      {
        id: 'opt-6c',
        diagnosis: 'Invertir la polaridad del diodo existente.',
        action: 'Desoldar y soldarlo al revés.',
        isCorrect: false,
        explanation: '¡Peligroso! Si inviertes la polaridad causas un cortocircuito masivo que puede quemar el controlador de backlight o el procesador.'
      }
    ],
    xpReward: 170
  }
];
