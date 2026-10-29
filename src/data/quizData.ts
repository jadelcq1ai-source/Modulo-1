import { QuizQuestion } from '../types/hardware';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'condensador',
    question: '¿Qué indica el tamaño físico de un condensador SMD en una placa de teléfono celular?',
    options: [
      'Únicamente la fecha de fabricación del componente.',
      'Su valor de capacitancia (Faradios) y el valor del voltaje que puede soportar.',
      'Si es compatible con Android o con iPhone.',
      'La marca del fabricante de la placa base.'
    ],
    correctIndex: 1,
    explanation: 'Según el Módulo 1 y la Guía Maestra, el tamaño del capacitor en la mainboard indica directamente su valor de capacitancia (capacidad para almacenar energía) y la tolerancia de voltaje que puede soportar.',
    sourceDoc: 'MODULO 1',
    difficulty: 'fácil'
  },
  {
    id: 'q2',
    category: 'condensador',
    question: '¿Cuál es la orientación de polaridad de los condensadores cerámicos SMD en una placa móvil?',
    options: [
      'Tienen polaridad estricta y deben soldarse con el polo positivo a la izquierda.',
      'Son bidireccionales; funcionan igual sin importar la forma en que se instalen en la placa.',
      'Solo se pueden soldar en una sola dirección marcada con una flecha.',
      'Deben conectarse siempre orientados hacia el procesador.'
    ],
    correctIndex: 1,
    explanation: 'Los condensadores cerámicos SMD son bidireccionales, lo que significa que funcionan exactamente igual sin importar el sentido en que se suelden a los pads.',
    sourceDoc: 'MODULO 1',
    difficulty: 'fácil'
  },
  {
    id: 'q3',
    category: 'condensador',
    question: 'Un condensador sano suele ser de color café claro. ¿Qué cambio visual manifiesta cuando sufre una falla o corto total?',
    options: [
      'Se vuelve completamente transparente como cristal.',
      'Cambia su color a un café más oscuro o incluso negro carbón.',
      'Adquiere un tono amarillo fluorescente.',
      'No cambia de color jamás, solo emite humo verde.'
    ],
    correctIndex: 1,
    explanation: 'La Guía Maestra destaca que los condensadores son originalmente de color café claro. Al fundirse sus capas internas por calor o electrólisis, cambian a café oscuro o negro.',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'fácil'
  },
  {
    id: 'q4',
    category: 'reglas_oro',
    question: '¿Cuál es la REGLA DE REPARACIÓN DE ORO si retiras un condensador en corto circuito de una mainboard?',
    options: [
      'El circuito puede encender al retirarlo, pero es OBLIGATORIO instalar uno nuevo para evitar daños más graves a la placa.',
      'Se debe dejar el hueco vacío permanentemente ya que los condensadores no sirven tras el primer encendido.',
      'Es obligatorio hacer un puente (jumper) con alambre de cobre uniendo los dos pads.',
      'Se debe rociar alcohol isopropílico y no tocar nada más.'
    ],
    correctIndex: 0,
    explanation: '¡Regla de Oro!: Aunque la placa puede revivir al retirar el condensador en corto, dejarlo sin él expondrá a la placa a sobrevoltajes y rizado que terminarán dañando gravemente el procesador o el PMIC. El reemplazo es obligatorio.',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'medio'
  },
  {
    id: 'q5',
    category: 'resistencia',
    question: '¿Qué ocurre si retiras una resistencia SMD de una línea de circuito en un teléfono móvil y no la reemplazas?',
    options: [
      'El circuito funciona mejor y la batería dura el doble.',
      'A diferencia del condensador, retirar una resistencia causa una FALLA INMINENTE Y TOTAL en ese circuito.',
      'El teléfono se reinicia una sola vez y sigue funcionando con normalidad.',
      'La línea se autocalibra a través de los condensadores vecinos.'
    ],
    correctIndex: 1,
    explanation: '¡Alerta de la Guía Maestra!: A diferencia del condensador (que al quitarlo la línea puede seguir transmitiendo), retirar una resistencia deja la línea en circuito abierto, provocando una falla total e inmediata en ese circuito.',
    sourceDoc: 'MODULO 1',
    difficulty: 'medio'
  },
  {
    id: 'q6',
    category: 'resistencia',
    question: '¿En qué unidad se mide la resistencia eléctrica y cuál es su aspecto físico típico en SMD?',
    options: [
      'Se mide en Faradios y es de color café claro.',
      'Se mide en Ohmios (Ω) y suele ser un cuerpo negro con números escritos (ej. 104, 4R7).',
      'Se mide en Henrios y tiene forma de resorte.',
      'Se mide en Voltios y tiene 4 patillas metálicas.'
    ],
    correctIndex: 1,
    explanation: 'Las resistencias SMD son rectangulares de color negro, tienen serigrafiados números que indican su valor (como 104 o 4R7) y su unidad de medida es el Ohmio (Ω).',
    sourceDoc: 'MODULO 1',
    difficulty: 'fácil'
  },
  {
    id: 'q7',
    category: 'resistencia',
    question: '¿Cómo funciona una resistencia como "divisor de tensión" en la placa de un celular?',
    options: [
      'Convierte la corriente continua en corriente alterna.',
      'Divide un voltaje en dos para alimentar dos circuitos que necesitan baja tensión, disminuyendo la pérdida de corriente.',
      'Multiplica la tensión de la batería por 4 para alimentar el flash.',
      'Aísla el micrófono del conector de carga.'
    ],
    correctIndex: 1,
    explanation: 'El Módulo 1 explica que el divisor de tensión divide un voltaje en dos para alimentar circuitos que requieren menor tensión, lo cual además prolonga la vida útil de la batería al reducir pérdidas.',
    sourceDoc: 'MODULO 1',
    difficulty: 'medio'
  },
  {
    id: 'q8',
    category: 'filtro',
    question: '¿Cuál es el propósito fundamental de los FILTROS SMD (EMI) en las placas de teléfonos móviles?',
    options: [
      'Regular voltajes altos de carga rápida de 30W a 65W.',
      'Estabilizar señales de alta velocidad (NO voltajes), haciendo que la señal llegue limpia para evitar parpadeos de pantalla.',
      'Almacenar energía magnética para la vibración del teléfono.',
      'Medir la temperatura del procesador cuando juega videojuegos.'
    ],
    correctIndex: 1,
    explanation: 'Los filtros EMI se encargan de limpiar señales de alta velocidad (no voltajes), principalmente en las conexiones directas entre procesador y pantalla o cámaras, previniendo palpitaciones o ruidos de imagen.',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'fácil'
  },
  {
    id: 'q9',
    category: 'filtro',
    question: '¿Cuál es la causa más común de fallo de un filtro EMI y qué técnica de reparación se puede aplicar?',
    options: [
      'Se quema por sobrevoltaje; se debe sustituir únicamente por un diodo Zener.',
      'Se desprende por un golpe físico o mala manipulación; se puede reparar aplicando un JUMPER con hilo fino de cobre.',
      'Se desgasta por calor excesivo; se debe enfriar con spray congelante.',
      'Se llena de polvo y se limpia con agua destilada.'
    ],
    correctIndex: 1,
    explanation: 'Dado que trabajan a muy baja potencia y frecuencia, casi nunca se dañan internamente. Se caen por golpes mecánicos o manipulación brusca, y pueden repararse mediante la técnica de Jumper.',
    sourceDoc: 'MODULO 1',
    difficulty: 'medio'
  },
  {
    id: 'q10',
    category: 'diodo',
    question: 'En un diodo SMD, ¿cómo se identifican el Ánodo y el Cátodo y qué ocurre si se suelda con la polaridad invertida?',
    options: [
      'No tienen polaridad (son bidireccionales) y dan igual.',
      'Las líneas/rayas impresas marcan el Cátodo (-); si se suelda al revés causa un corto circuito o daño en la placa.',
      'Las rayas impresas marcan el Ánodo (+); soldarlo al revés solo reduce el volumen del altavoz.',
      'El lado más largo es el Cátodo y no pasa nada si se invierte.'
    ],
    correctIndex: 1,
    explanation: 'Los diodos son válvulas unidireccionales. Las rayas impresas SIEMPRE marcan el Cátodo (-). Soldarlo con polaridad invertida causa cortocircuito y quema la placa.',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'fácil'
  },
  {
    id: 'q11',
    category: 'diodo',
    question: '¿Qué tipo de diodo se encarga de elevar el voltaje de la batería (~4.7V) hasta unos 19.0V para la retroiluminación (Backlight) de la pantalla?',
    options: [
      'Diodo Rectificador de pared.',
      'Diodo Zener.',
      'Diodo LED infrarrojo.',
      'Diodo de germanio convencional.'
    ],
    correctIndex: 1,
    explanation: 'Tanto en el Módulo 1 como en la Guía Maestra se resalta que el Diodo Zener es crucial en el circuito elevador de backlight, tomando 4.7V y elevándolos hasta ~19.0V.',
    sourceDoc: 'MODULO 1',
    difficulty: 'medio'
  },
  {
    id: 'q12',
    category: 'diodo',
    question: '¿Dónde se utilizan comúnmente los DIODOS SCHOTTKY en un teléfono celular?',
    options: [
      'En la bobina de carga inalámbrica de 50W.',
      'En líneas de comunicación con interacción del usuario como conectores USB, Jack de audio, lector SIM y micro SD.',
      'Exclusivamente dentro del parlante auricular.',
      'En la pantalla para emitir luz blanca.'
    ],
    correctIndex: 1,
    explanation: 'Los diodos Schottky destacan por su altísima velocidad de conmutación y baja caída de tensión, usándose en líneas de interfaz como USB, audio Jack, lector SIM y MicroSD.',
    sourceDoc: 'MODULO 1',
    difficulty: 'medio'
  },
  {
    id: 'q13',
    category: 'diodo',
    question: '¿Por qué se llama al Diodo TVS el "Guardaespaldas del Circuito"?',
    options: [
      'Porque es de color verde camuflaje.',
      'Porque es un supresor de picos bidireccional que se sacrifica (se quema) para evitar que descargas electrostáticas dañen el procesador.',
      'Porque bloquea llamadas no deseadas en el módem GSM.',
      'Porque tiene una contraseña de seguridad encriptada.'
    ],
    correctIndex: 1,
    explanation: 'El diodo TVS (Transient Voltage Suppressor) es bidireccional y actúa como un guardaespaldas: ante un pico de alta tensión o descarga electrostática, absorbe el impacto quemándose para proteger la mainboard.',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'fácil'
  },
  {
    id: 'q14',
    category: 'termistor',
    question: '¿Cuál es la diferencia fundamental entre un termistor NTC y un termistor PTC, y cuál es el más común en placas móviles?',
    options: [
      'NTC: A mayor temperatura, mayor resistencia. PTC es el más común en celulares.',
      'NTC: A mayor temperatura, MENOR resistencia (es el más común en mainboards móviles). PTC: A mayor temperatura, mayor resistencia.',
      'Ambos mantienen la resistencia fija sin importar la temperatura.',
      'NTC se usa para el flash y PTC para la cámara frontal.'
    ],
    correctIndex: 1,
    explanation: 'NTC (Coeficiente de Temperatura Negativo) disminuye su resistencia a medida que sube la temperatura, y es el estándar utilizado en las placas de teléfonos móviles.',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'medio'
  },
  {
    id: 'q15',
    category: 'termistor',
    question: '¿Cuáles son las 3 UBICACIONES CLAVE donde se encuentran los termistores en la mainboard de un celular?',
    options: [
      'Pantalla, botón de volumen y bandeja SIM.',
      'Puerto de carga, cerca del Procesador, y en el circuito de Radiofrecuencia (señal GSM).',
      'Cámara trasera, motor vibrador y auricular.',
      'Conector de batería, flash LED y micrófono superior.'
    ],
    correctIndex: 1,
    explanation: 'El Mapa de Calor de la Guía Maestra y Módulo 1 ubican los 3 termistores en: 1) Puerto de carga (monitorea la corriente de carga), 2) Procesador (evita sobrecalentamiento de cálculo), 3) Radiofrecuencia (altas frecuencias de transmisión GSM).',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'medio'
  },
  {
    id: 'q16',
    category: 'termistor',
    question: '¿Qué es un "FALSO POSITIVO" causado por un termistor en un teléfono móvil?',
    options: [
      'Que el teléfono cree que la pantalla es táctil cuando no lo es.',
      'Que el sistema operativo muestre una alerta de "Temperatura demasiado alta o baja" y bloquee la carga aún cuando el dispositivo está físicamente frío.',
      'Que la cámara tome fotos con colores invertidos.',
      'Que el teléfono marque señal 5G cuando en realidad es 3G.'
    ],
    correctIndex: 1,
    explanation: 'Un termistor dañado, desoldado o ausente envía un valor resistivo fuera de rango al microcontrolador, causando un "falso positivo" en el sistema operativo que impide la carga normal.',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'fácil'
  },
  {
    id: 'q17',
    category: 'termistor',
    question: '¿Cómo se comprueba con el multímetro si un termistor NTC está en buen estado en el taller de reparación?',
    options: [
      'Midiendo en escala de Ohmios, aplicar calor suave y verificar si el valor de resistencia desciende de forma controlada.',
      'Poner en continuidad y golpear la placa con una pinza.',
      'Medir en voltaje alterno (AC) mientras el teléfono está apagado.',
      'Sumergir la placa en agua con sal y medir amperios.'
    ],
    correctIndex: 0,
    explanation: 'La prueba técnica consiste en colocar el multímetro en escala de ohmios sobre el termistor, aplicar calor suave (con la punta del soldador cerca o aire tibio) y verificar que el valor resistivo varíe en tiempo real.',
    sourceDoc: 'MODULO 1',
    difficulty: 'medio'
  },
  {
    id: 'q18',
    category: 'bobina',
    question: '¿Cómo funciona una BOBINA SMD (Inductor) y qué analogía técnica resume su comportamiento?',
    options: [
      'Es un "tanque de liberación rápida" que almacena electrones en un dieléctrico.',
      'Es un "resorte magnético" compuesto por hilo enrollado sobre ferrita que almacena energía magnética y se opone a cambios bruscos de corriente.',
      'Es un obstáculo que solo transforma electricidad en calor permanente.',
      'Es una compuerta lógica que solo deja pasar voltajes pares.'
    ],
    correctIndex: 1,
    explanation: 'La bobina o inductor es un "resorte magnético": hilo enrollado en un núcleo de ferrita que al circular corriente genera un campo magnético y se opone con firmeza a los cambios bruscos de corriente.',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'fácil'
  },
  {
    id: 'q19',
    category: 'bobina',
    question: '¿Dónde se encuentran principalmente las bobinas SMD en la placa móvil y cómo se prueban con el multímetro?',
    options: [
      'Cerca de los circuitos de gestión de energía (fuentes conmutadas / PMIC); se prueban verificando continuidad (deben dar continuidad casi 0Ω) o probador de inductancia.',
      'Pegadas al cristal táctil; se prueban en escala de mega-ohmios.',
      'En el conector de los audífonos; no se pueden medir con multímetro.',
      'Solo dentro de la tarjeta SIM.'
    ],
    correctIndex: 0,
    explanation: 'Las bobinas se sitúan alrededor de las fuentes de energía y convertidores DC-DC. Al ser un hilo continuo, una bobina sana debe dar continuidad (pitar con resistencia muy baja) entre sus terminales.',
    sourceDoc: 'MODULO 1',
    difficulty: 'fácil'
  },
  {
    id: 'q20',
    category: 'simbologia',
    question: 'En un diagrama esquemático de celular, ¿cuál es el símbolo universal que representa a un Condensador?',
    options: [
      'Dos líneas paralelas perpendiculares al circuito, separadas por un espacio (-||-).',
      'Una línea con picos en zigzag (-/\\/\\/\\-).',
      'Un bucle espiral continuo (-UUUU-).',
      'Un triángulo que apunta contra una barra vertical (-|>|-).'
    ],
    correctIndex: 0,
    explanation: 'En el Diccionario Visual de Simbología Eléctrica, el condensador se representa con dos placas paralelas separadas (-||-), reflejando sus dos placas conductoras y dieléctrico.',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'fácil'
  },
  {
    id: 'q21',
    category: 'simbologia',
    question: '¿Cuál es la diferencia entre el símbolo esquemático de un Diodo Zener y un Diodo LED?',
    options: [
      'El Zener tiene alas dobladas en la barra catódica (en forma de Z), mientras que el LED incluye dos flechas salientes que representan la emisión de luz.',
      'El Zener es un círculo cerrado y el LED es un cuadrado con espirales.',
      'El Zener no tiene triángulo semiconductor.',
      'Son idénticos y no hay ninguna distinción gráfica.'
    ],
    correctIndex: 0,
    explanation: 'El diodo Zener tiene dobleces angulados en su cátodo simulando una "Z", mientras que el Diodo LED cuenta con flechas orientadas hacia el exterior que simbolizan fotones de luz emitida.',
    sourceDoc: 'Guía Maestra SMD',
    difficulty: 'medio'
  },
  {
    id: 'q22',
    category: 'diodo',
    question: '¿Por qué los diodos LED SMD en las pantallas de celulares están conectados comúnmente en paralelo?',
    options: [
      'Para que si uno se quema, el teléfono vibre de inmediato.',
      'Para que la corriente pueda ser reciclada y así prolongar la vida útil de la batería.',
      'Porque en serie consumirían más de 220 Voltios.',
      'Para emitir rayos UV que desinfecten la pantalla.'
    ],
    correctIndex: 1,
    explanation: 'El Módulo 1 (página 15) detalla que los diodos LED SMD se conectan en paralelo para que la corriente pueda ser reciclada, prolongando la autonomía de la batería.',
    sourceDoc: 'MODULO 1',
    difficulty: 'difícil'
  }
];
