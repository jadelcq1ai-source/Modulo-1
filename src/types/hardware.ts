export type ComponentType = 
  | 'condensador'
  | 'resistencia'
  | 'filtro'
  | 'diodo'
  | 'termistor'
  | 'bobina';

export type DiodeSubType = 
  | 'rectificador'
  | 'schottky'
  | 'zener'
  | 'led'
  | 'tvs';

export interface ComponentInfo {
  id: ComponentType;
  name: string;
  technicalAlias: string;
  analogy: string;
  symbol: string;
  measuringUnit: string;
  measuringUnitSymbol: string;
  colorAppearance: string;
  bidirectional: boolean;
  structure: string;
  primaryFunctions: string[];
  mobileLocations: string[];
  failureCauses: {
    title: string;
    description: string;
  }[];
  damageVisualSigns: string[];
  multimeterTest: {
    mode: 'Continuidad' | 'Ohmios' | 'Capacitancia' | 'Caída de Tensión (Diodo)' | 'Inductancia';
    healthyReading: string;
    faultyReading: string;
    instructions: string;
  };
  goldenRule: {
    type: 'mandatory_replace' | 'jumper_possible' | 'critical_failure_if_removed';
    message: string;
  };
}

export interface TriageCase {
  id: string;
  title: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  deviceModel: string;
  customerSymptom: string;
  boardSection: string;
  faultyComponent: ComponentType;
  faultDetail: string;
  microscopeClues: {
    visualState: 'normal' | 'burnt_black' | 'corroded_electrolysis' | 'detached_missing' | 'central_hole' | 'cracked';
    description: string;
  };
  multimeterReadings: {
    mode: 'Continuidad' | 'Ohmios' | 'Diodo' | 'Capacitancia';
    value: string;
    isBeeping: boolean;
    explanation: string;
  };
  thermalReading: {
    tempC: number;
    hotspot: boolean;
    description: string;
  };
  options: {
    id: string;
    diagnosis: string;
    action: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  xpReward: number;
}

export interface QuizQuestion {
  id: string;
  category: ComponentType | 'simbologia' | 'reglas_oro';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceDoc: 'MODULO 1' | 'Guía Maestra SMD';
  difficulty: 'fácil' | 'medio' | 'difícil';
}

export interface Flashcard {
  id: string;
  category: 'Anatomía' | 'Diagnóstico' | 'Simbología' | 'Reglas de Oro' | 'Diodos';
  frontQuestion: string;
  frontHint?: string;
  backAnswer: string;
  technicalNote: string;
  badge?: string;
}

export interface SchematicSymbolItem {
  id: string;
  name: string;
  symbolSvg: string;
  componentType: ComponentType | 'bateria' | 'antena' | 'tierra';
  description: string;
  mobileUse: string;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  completedCases: string[];
  quizBestScore: number;
  quizzesTaken: number;
  cardsMastered: string[];
  unlockedBadges: string[];
}
