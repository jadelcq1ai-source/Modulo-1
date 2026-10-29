import { Flashcard } from '../types/hardware';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Anatomía',
    frontQuestion: '¿Cuál es la estructura interna básica de un Condensador SMD?',
    frontHint: 'Piensa en las placas y el material intermedio',
    backAnswer: 'Dos placas conductoras paralelas separadas por un dieléctrico aislante (plástico o cerámica). Almacena energía rápida en su campo eléctrico interno.',
    technicalNote: 'El tamaño físico del capacitor indica su valor de capacitancia (Faradios) y voltaje soportado.',
    badge: 'Condensador'
  },
  {
    id: 'fc-2',
    category: 'Reglas de Oro',
    frontQuestion: '¿Qué sucede si retiras un condensador en corto de la placa de un celular?',
    frontHint: '¿Enciende? ¿Es opcional dejarlo así?',
    backAnswer: 'El teléfono puede volver a encender, pero es ESTRICTAMENTE OBLIGATORIO instalar uno nuevo para evitar que sobrevoltajes destruyan componentes críticos.',
    technicalNote: 'Nunca hagas un jumper sobre un condensador conectado a tierra, causarías un corto mortal.',
    badge: 'Regla de Oro'
  },
  {
    id: 'fc-3',
    category: 'Anatomía',
    frontQuestion: '¿Cómo se identifican físicamente las Resistencias SMD en la placa?',
    frontHint: 'Color y serigrafía',
    backAnswer: 'Cuerpo rectangular de color NEGRO con números serigrafiados (ej. 104 = 100kΩ, 4R7 = 4.7Ω). Se mide en Ohmios (Ω).',
    technicalNote: 'Se diferencian del condensador porque los condensadores son café claro y no llevan números.',
    badge: 'Resistencia'
  },
  {
    id: 'fc-4',
    category: 'Reglas de Oro',
    frontQuestion: '¿Qué ocurre si retiras una Resistencia SMD y no la reemplazas?',
    frontHint: 'A diferencia del condensador...',
    backAnswer: 'Causa una FALLA INMINENTE Y TOTAL en ese circuito. La línea queda abierta e inservible. El reemplazo inmediato es obligatorio.',
    technicalNote: 'A diferencia del condensador, nunca puede dejarse la pista vacía.',
    badge: 'Regla de Oro'
  },
  {
    id: 'fc-5',
    category: 'Diagnóstico',
    frontQuestion: '¿Qué es un Filtro SMD (EMI) y qué síntoma produce cuando se desprende?',
    frontHint: 'Piensa en la pantalla y señales de datos',
    backAnswer: 'Estabiliza señales de alta velocidad (NO voltajes). Cuando se desprende por un golpe, la pantalla palpita, tiene interrupciones o líneas de ruido.',
    technicalNote: 'Conecta directamente el procesador con la pantalla (interfaz MIPI).',
    badge: 'Filtro EMI'
  },
  {
    id: 'fc-6',
    category: 'Reglas de Oro',
    frontQuestion: '¿Cuál es la técnica de reparación permitida para un Filtro EMI?',
    frontHint: 'Hilo de cobre esmaltado...',
    backAnswer: 'Técnica de JUMPER: Se puede restaurar la comunicación puenteando los pads de entrada y salida con un cable fino de cobre esmaltado.',
    technicalNote: 'Dado que no maneja alto voltaje, el jumper conduce la señal limpia directamente.',
    badge: 'Filtro EMI'
  },
  {
    id: 'fc-7',
    category: 'Diodos',
    frontQuestion: '¿Cómo se identifica la polaridad de un Diodo SMD y cuál es el riesgo de invertirlo?',
    frontHint: '¿Qué marcan las rayas impresas?',
    backAnswer: 'Las líneas impresas en el cuerpo SIEMPRE marcan el Cátodo (-). Soldar con polaridad invertida provoca un cortocircuito masivo y daña la placa.',
    technicalNote: 'Ánodo = Positivo (+). Cátodo = Negativo (-). El flujo va en un solo sentido.',
    badge: 'Diodo'
  },
  {
    id: 'fc-8',
    category: 'Diodos',
    frontQuestion: '¿Qué función cumple el Diodo Zener en la retroiluminación (Backlight)?',
    frontHint: 'Elevación de voltaje desde la batería',
    backAnswer: 'Regula y eleva el voltaje de la batería de ~4.7V hasta unos 19.0V para encender los LEDs de iluminación de la pantalla.',
    technicalNote: 'Sin este diodo elevador, la pantalla se verá negra aunque la imagen táctil funcione a contraluz.',
    badge: 'Diodo Zener'
  },
  {
    id: 'fc-9',
    category: 'Diodos',
    frontQuestion: '¿Por qué el Diodo TVS es llamado el "Guardaespaldas del Circuito"?',
    frontHint: 'Protección contra picos y ESD',
    backAnswer: 'Es un supresor de picos transitorios BIDIRECCIONAL sin polaridad. Al llegar una sobretensión o estática, se quema para salvar al procesador.',
    technicalNote: 'Quitar un TVS quemado revive el circuito, pero dejarlo ausente elimina para siempre la protección contra descargas.',
    badge: 'Diodo TVS'
  },
  {
    id: 'fc-10',
    category: 'Diodos',
    frontQuestion: '¿Dónde se encuentran típicamente los Diodos Schottky en un celular?',
    frontHint: 'Líneas donde interactúa el usuario',
    backAnswer: 'En líneas de comunicación de alta velocidad y baja caída de tensión: Conector USB, Jack de manos libres, Lector SIM y MicroSD.',
    technicalNote: 'Poseen conmutación ultra veloz y pérdida mínima de milivoltios.',
    badge: 'Diodo Schottky'
  },
  {
    id: 'fc-11',
    category: 'Anatomía',
    frontQuestion: '¿Qué es un Termistor NTC y cómo responde al calor en una mainboard móvil?',
    frontHint: 'Coeficiente Negativo',
    backAnswer: 'A MAYOR temperatura, MENOR es su resistencia eléctrica interna. Es el tipo de termistor más común en teléfonos móviles.',
    technicalNote: 'PTC es lo contrario (a mayor temperatura, mayor resistencia).',
    badge: 'Termistor'
  },
  {
    id: 'fc-12',
    category: 'Diagnóstico',
    frontQuestion: '¿Cuáles son las 3 zonas críticas donde hay termistores en un celular?',
    frontHint: 'Mapa de calor',
    backAnswer: '1. Puerto de carga (monitorea la corriente de carga).\n2. Cerca del Procesador (CPU).\n3. Módulo de Radiofrecuencia (señal GSM de alta frecuencia).',
    technicalNote: 'La configuración en placa casi siempre es: Termistor + Resistencia + Condensador en paralelo.',
    badge: 'Termistor'
  },
  {
    id: 'fc-13',
    category: 'Diagnóstico',
    frontQuestion: '¿Qué causa un "Falso Positivo" de temperatura en el sistema operativo?',
    frontHint: 'Mensaje de alerta con teléfono frío',
    backAnswer: 'Un termistor dañado, con sulfato o desprendido envía mediciones erróneas. El OS muestra "Temperatura demasiado alta/baja" y detiene la carga.',
    technicalNote: 'Se comprueba midiendo con multímetro en ohmios y aplicando calor suave: debe variar.',
    badge: 'Termistor'
  },
  {
    id: 'fc-14',
    category: 'Anatomía',
    frontQuestion: '¿Cómo funciona una Bobina SMD (Inductor) y qué almacena?',
    frontHint: 'El resorte magnético',
    backAnswer: 'Hilo de cobre enrollado en núcleo de ferrita. Almacena energía en un campo magnético y se opone tenazmente a los cambios bruscos de corriente.',
    technicalNote: 'Se ubica cerca de fuentes de alimentación (PMIC) y circuitos de gestión de energía.',
    badge: 'Bobina'
  },
  {
    id: 'fc-15',
    category: 'Diagnóstico',
    frontQuestion: '¿Cómo se comprueba una Bobina SMD en buen estado con el multímetro?',
    frontHint: '¿Debe pitar o marcar circuito abierto?',
    backAnswer: 'Debe dar CONTINUIDAD total (sonar el buzzer del multímetro) con una resistencia casi nula (0.1Ω a 2Ω).',
    technicalNote: 'Si marca OL (circuito abierto), el hilo interno se partió por un golpe o sobrecalentamiento.',
    badge: 'Bobina'
  },
  {
    id: 'fc-16',
    category: 'Diagnóstico',
    frontQuestion: '¿Cuáles son las 4 aplicaciones clave del condensador en placa móvil?',
    frontHint: 'Módulo 1 página 4',
    backAnswer: '1. Almacenamiento de energía rápida (flash, vibrador).\n2. Nivelación de voltaje.\n3. Generación de retrasos (temporización).\n4. Regulación de corriente continua (suavizar picos).',
    technicalNote: 'Actúa como una batería ultra rápida de carga y descarga inmediata.',
    badge: 'Condensador'
  },
  {
    id: 'fc-17',
    category: 'Simbología',
    frontQuestion: '¿Cómo se representa esquemáticamente la Conexión a Tierra (GND)?',
    frontHint: 'Líneas horizontales descendentes',
    backAnswer: 'Una línea vertical que termina en 3 líneas horizontales decrecientes en forma de triángulo invertido (⏚).',
    technicalNote: 'Es el punto de referencia común de 0V de la placa.',
    badge: 'Simbología'
  },
  {
    id: 'fc-18',
    category: 'Simbología',
    frontQuestion: '¿Qué diferencia visual tiene el símbolo del Diodo Zener respecto al convencional?',
    frontHint: 'La barra del cátodo tiene alas en Z',
    backAnswer: 'La barra vertical del cátodo tiene dos pestañas o quiebres doblados simulando una "Z", indicando su zona de avalancha o regulación inversa.',
    technicalNote: 'El diodo convencional tiene una sola barra vertical recta perpendicular.',
    badge: 'Simbología'
  }
];
