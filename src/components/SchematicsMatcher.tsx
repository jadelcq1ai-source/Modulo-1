import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileCode, CheckCircle2, RotateCcw, Sparkles, HelpCircle, ArrowRight 
} from 'lucide-react';
import { SCHEMATIC_SYMBOLS, SchematicSymbol } from '../data/schematicsData';
import { soundManager } from '../utils/audio';

interface SchematicsMatcherProps {
  onAddXp: (amount: number) => void;
}

export const SchematicsMatcher: React.FC<SchematicsMatcherProps> = ({ onAddXp }) => {
  const [selectedSymbolId, setSelectedSymbolId] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<'dictionary' | 'matchGame'>('dictionary');
  
  // Game states
  const [gameQuestionIndex, setGameQuestionIndex] = useState<number>(0);
  const [gameScore, setGameScore] = useState<number>(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  const currentSymbol = SCHEMATIC_SYMBOLS.find(s => s.id === selectedSymbolId) || SCHEMATIC_SYMBOLS[0];
  const targetSymbol = SCHEMATIC_SYMBOLS[gameQuestionIndex];

  // Options for current question
  const shuffledOptions = React.useMemo(() => {
    if (!targetSymbol) return [];
    const pool = [...SCHEMATIC_SYMBOLS].sort(() => Math.random() - 0.5);
    const others = pool.filter(s => s.id !== targetSymbol.id).slice(0, 3);
    return [targetSymbol, ...others].sort(() => Math.random() - 0.5);
  }, [gameQuestionIndex, targetSymbol]);

  const handleSelectChoice = (choiceId: string) => {
    if (isAnswered) return;
    setSelectedChoiceId(choiceId);
    setIsAnswered(true);

    if (choiceId === targetSymbol.id) {
      soundManager.playSuccessChime();
      setGameScore(prev => prev + 1);
      onAddXp(20);
    } else {
      soundManager.playErrorBuzz();
    }
  };

  const handleNextGameQuestion = () => {
    soundManager.playProbeClick();
    setSelectedChoiceId(null);
    setIsAnswered(false);

    if (gameQuestionIndex < SCHEMATIC_SYMBOLS.length - 1) {
      setGameQuestionIndex(prev => prev + 1);
    } else {
      setGameCompleted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleRestartGame = () => {
    setGameQuestionIndex(0);
    setGameScore(0);
    setSelectedChoiceId(null);
    setIsAnswered(false);
    setGameCompleted(false);
  };

  // Helper to render authentic schematic symbol diagrams
  const renderSymbolDiagram = (type: string) => {
    switch (type) {
      case 'tierra':
        return (
          <svg className="w-20 h-20 stroke-amber-400" viewBox="0 0 100 100" fill="none" strokeWidth="3">
            <line x1="50" y1="15" x2="50" y2="55" />
            <line x1="20" y1="55" x2="80" y2="55" />
            <line x1="32" y1="68" x2="68" y2="68" />
            <line x1="42" y1="80" x2="58" y2="80" />
          </svg>
        );
      case 'bateria':
        return (
          <svg className="w-20 h-20 stroke-amber-400" viewBox="0 0 100 100" fill="none" strokeWidth="3">
            <line x1="10" y1="50" x2="35" y2="50" />
            <line x1="35" y1="25" x2="35" y2="75" />
            <line x1="45" y1="35" x2="45" y2="65" strokeWidth="4" />
            <line x1="55" y1="25" x2="55" y2="75" />
            <line x1="65" y1="35" x2="65" y2="65" strokeWidth="4" />
            <line x1="65" y1="50" x2="90" y2="50" />
            <text x="20" y="30" fill="#fbbf24" stroke="none" fontSize="12" fontWeight="bold">+</text>
            <text x="75" y="30" fill="#94a3b8" stroke="none" fontSize="14" fontWeight="bold">-</text>
          </svg>
        );
      case 'resistencia':
        return (
          <svg className="w-24 h-20 stroke-amber-400" viewBox="0 0 120 100" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 10 50 L 30 50 L 37 30 L 49 70 L 61 30 L 73 70 L 85 30 L 92 50 L 110 50" />
          </svg>
        );
      case 'condensador':
        return (
          <svg className="w-20 h-20 stroke-amber-400" viewBox="0 0 100 100" fill="none" strokeWidth="3">
            <line x1="10" y1="50" x2="43" y2="50" />
            <line x1="43" y1="25" x2="43" y2="75" />
            <line x1="57" y1="25" x2="57" y2="75" />
            <line x1="57" y1="50" x2="90" y2="50" />
          </svg>
        );
      case 'bobina':
        return (
          <svg className="w-24 h-20 stroke-amber-400" viewBox="0 0 120 100" fill="none" strokeWidth="3" strokeLinecap="round">
            <line x1="10" y1="50" x2="25" y2="50" />
            <path d="M 25 50 C 25 25, 45 25, 45 50" />
            <path d="M 45 50 C 45 25, 65 25, 65 50" />
            <path d="M 65 50 C 65 25, 85 25, 85 50" />
            <path d="M 85 50 C 85 25, 100 25, 100 50" />
            <line x1="100" y1="50" x2="115" y2="50" />
          </svg>
        );
      case 'diodo_zener':
        return (
          <svg className="w-20 h-20 stroke-amber-400" viewBox="0 0 100 100" fill="none" strokeWidth="3" strokeLinejoin="round">
            <line x1="10" y1="50" x2="40" y2="50" />
            <polygon points="40,30 40,70 65,50" fill="#f59e0b" fillOpacity="0.2" />
            <line x1="65" y1="20" x2="65" y2="80" />
            <line x1="65" y1="20" x2="55" y2="20" />
            <line x1="65" y1="80" x2="75" y2="80" />
            <line x1="65" y1="50" x2="90" y2="50" />
          </svg>
        );
      case 'diodo_led':
        return (
          <svg className="w-20 h-20 stroke-amber-400" viewBox="0 0 100 100" fill="none" strokeWidth="3" strokeLinejoin="round">
            <line x1="10" y1="50" x2="40" y2="50" />
            <polygon points="40,30 40,70 65,50" fill="#f59e0b" fillOpacity="0.2" />
            <line x1="65" y1="30" x2="65" y2="70" />
            <line x1="65" y1="50" x2="90" y2="50" />
            {/* Outgoing light arrows */}
            <line x1="60" y1="25" x2="75" y2="10" strokeWidth="2" />
            <polygon points="73,10 77,10 75,14" fill="#fbbf24" />
            <line x1="70" y1="32" x2="85" y2="17" strokeWidth="2" />
            <polygon points="83,17 87,17 85,21" fill="#fbbf24" />
          </svg>
        );
      case 'antena':
        return (
          <svg className="w-20 h-20 stroke-amber-400" viewBox="0 0 100 100" fill="none" strokeWidth="3" strokeLinecap="round">
            <line x1="50" y1="85" x2="50" y2="35" />
            <line x1="25" y1="15" x2="50" y2="35" />
            <line x1="75" y1="15" x2="50" y2="35" />
            <line x1="25" y1="15" x2="75" y2="15" />
            {/* Ground below antenna */}
            <line x1="38" y1="85" x2="62" y2="85" />
            <line x1="44" y1="92" x2="56" y2="92" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span>DICCIONARIO VISUAL DE ESQUEMAS</span>
            <span>·</span>
            <span>SLIDE 14</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 mt-1">
            <FileCode className="w-6 h-6 text-amber-400" />
            <span>Simbología Eléctrica en Esquemáticos</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            El lenguaje universal para leer planos esquemáticos y diagramas de circuito en telefonía celular.
          </p>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => { setGameMode('dictionary'); soundManager.playProbeClick(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              gameMode === 'dictionary'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Diccionario
          </button>
          <button
            onClick={() => { setGameMode('matchGame'); handleRestartGame(); soundManager.playProbeClick(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              gameMode === 'matchGame'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mini-Juego de Reconocimiento
          </button>
        </div>
      </div>

      {gameMode === 'dictionary' ? (
        /* Dictionary Grid Mode */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Symbols Grid (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SCHEMATIC_SYMBOLS.map((sym) => {
              const isSelected = (selectedSymbolId || SCHEMATIC_SYMBOLS[0].id) === sym.id;
              return (
                <button
                  key={sym.id}
                  onClick={() => {
                    setSelectedSymbolId(sym.id);
                    soundManager.playProbeClick();
                  }}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="h-16 flex items-center justify-center">
                    {renderSymbolDiagram(sym.svgType)}
                  </div>
                  <span className="text-xs font-bold text-white leading-tight">
                    {sym.name.split(' (')[0]}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400/90">
                    {sym.name.match(/\((.*?)\)/)?.[0] || ''}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Symbol Inspector Details (5 cols) */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Categoría: {currentSymbol.category}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                {currentSymbol.ascii}
              </span>
            </div>

            <div className="h-28 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-center">
              {renderSymbolDiagram(currentSymbol.svgType)}
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                {currentSymbol.name}
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {currentSymbol.description}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <span className="font-bold text-amber-400 block">Cómo interpretarlo en el plano esquemático:</span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {currentSymbol.schematicReadingTip}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Match Game Mode */
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          {!gameCompleted ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
                <span className="font-mono text-amber-400 font-bold">
                  Símbolo {gameQuestionIndex + 1} de {SCHEMATIC_SYMBOLS.length}
                </span>
                <span className="font-mono text-slate-400">
                  Puntaje: <strong className="text-emerald-400">{gameScore}</strong>
                </span>
              </div>

              {/* Target Symbol Diagram */}
              <div className="h-44 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-4">
                {renderSymbolDiagram(targetSymbol.svgType)}
                <span className="text-xs text-slate-500 font-mono mt-2">¿A qué componente corresponde este símbolo?</span>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shuffledOptions.map((opt) => {
                  const isSelected = selectedChoiceId === opt.id;
                  const isCorrect = opt.id === targetSymbol.id;

                  let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                  if (isAnswered) {
                    if (isCorrect) {
                      style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      style = 'bg-slate-950/50 border-slate-900 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectChoice(opt.id)}
                      disabled={isAnswered}
                      className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt.name}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="flex items-center justify-end pt-2">
                  <button
                    onClick={handleNextGameQuestion}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2"
                  >
                    <span>{gameQuestionIndex < SCHEMATIC_SYMBOLS.length - 1 ? 'Siguiente Símbolo' : 'Ver Resultados'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <Sparkles className="w-12 h-12 text-amber-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">
                ¡Desafío de Simbología Superado!
              </h2>
              <div className="text-3xl font-mono font-bold text-amber-400">
                {gameScore} / {SCHEMATIC_SYMBOLS.length} Aciertos
              </div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Excelente memorización de los símbolos esquemáticos de la Guía Maestra SMD.
              </p>
              <button
                onClick={handleRestartGame}
                className="mt-4 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Volver a Jugar</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
