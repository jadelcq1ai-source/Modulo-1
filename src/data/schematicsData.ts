export interface SchematicSymbol {
  id: string;
  name: string;
  category: string;
  ascii: string;
  svgType: 'tierra' | 'bateria' | 'resistencia' | 'condensador' | 'bobina' | 'diodo_zener' | 'diodo_led' | 'antena';
  realComponentId: string;
  description: string;
  schematicReadingTip: string;
}

export const SCHEMATIC_SYMBOLS: SchematicSymbol[] = [
  {
    id: 'sym-tierra',
    name: 'Conexión a Tierra (GND)',
    category: 'Referencia',
    ascii: '⏚',
    svgType: 'tierra',
    realComponentId: 'gnd',
    description: 'Punto de referencia común de 0 Voltios y retorno del circuito en toda la placa del celular.',
    schematicReadingTip: 'Cualquier componente conectado a este símbolo tiene un extremo en contacto directo con el chasis metálico o plano de masa.'
  },
  {
    id: 'sym-bateria',
    name: 'Batería (VBAT / VBUS)',
    category: 'Alimentación',
    ascii: '+||||-',
    svgType: 'bateria',
    realComponentId: 'bateria',
    description: 'Fuente de corriente continua que suministra energía eléctrica química al dispositivo (3.7V - 4.4V).',
    schematicReadingTip: 'La placa más larga representa el polo positivo (+) y la más corta el polo negativo (-).'
  },
  {
    id: 'sym-resistencia',
    name: 'Resistencia (R)',
    category: 'Pasivo',
    ascii: '-/\\/\\/\\-',
    svgType: 'resistencia',
    realComponentId: 'resistencia',
    description: 'Obstáculo al paso de la corriente que convierte parte de la energía eléctrica en calor disipado.',
    schematicReadingTip: 'Se identifica con la letra "R" seguida del número (ej. R2401) y su valor en Ω, kΩ o MΩ.'
  },
  {
    id: 'sym-condensador',
    name: 'Condensador (C)',
    category: 'Pasivo',
    ascii: '-||-',
    svgType: 'condensador',
    realComponentId: 'condensador',
    description: 'Dos placas conductoras separadas por un dieléctrico. Almacena carga y estabiliza picos de voltaje.',
    schematicReadingTip: 'Se rotula como "C" (ej. C1034) con valores en pF, nF o µF. Suele colocarse en paralelo entre la línea positiva y tierra.'
  },
  {
    id: 'sym-bobina',
    name: 'Bobina / Inductor (L)',
    category: 'Pasivo',
    ascii: '-UUUU-',
    svgType: 'bobina',
    realComponentId: 'bobina',
    description: 'Espiral de hilo esmaltado sobre ferrita. Almacena energía en un campo magnético y se opone a cambios de corriente.',
    schematicReadingTip: 'Se identifica con la letra "L" (ej. L5002) y su valor en µH o nH. Frecuente en fuentes de alimentación (Buck / Boost).'
  },
  {
    id: 'sym-zener',
    name: 'Diodo Zener (ZD)',
    category: 'Semiconductor',
    ascii: '-|\\>|-',
    svgType: 'diodo_zener',
    realComponentId: 'diodo',
    description: 'Diodo que trabaja en polarización inversa para regular o elevar voltajes críticos (ej. 4.7V a 19.0V en Backlight).',
    schematicReadingTip: 'Sus alas anguladas en el cátodo se asemejan a una letra "Z". La flecha apunta hacia el cátodo en polarización normal.'
  },
  {
    id: 'sym-led',
    name: 'Diodo LED (LED)',
    category: 'Semiconductor',
    ascii: '-|>|->>',
    svgType: 'diodo_led',
    realComponentId: 'diodo',
    description: 'Emite fotones de luz visible cuando la corriente lo atraviesa directamente. Conectados en paralelo en pantallas.',
    schematicReadingTip: 'Tiene dos flechitas diagonales que salen del triángulo, indicando la emisión de luz hacia el exterior.'
  },
  {
    id: 'sym-antena',
    name: 'Antena (ANT)',
    category: 'Radiofrecuencia',
    ascii: 'Ψ',
    svgType: 'antena',
    realComponentId: 'antena',
    description: 'Elemento transductor que convierte señales de RF guiadas en ondas electromagnéticas aéreas para GSM, Wi-Fi y GPS.',
    schematicReadingTip: 'Tiene forma de "Y" o tridente. Generalmente se sitúa al final de las líneas de RF protegidas por filtros y diodos TVS.'
  }
];
