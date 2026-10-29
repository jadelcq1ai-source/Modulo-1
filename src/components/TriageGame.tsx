import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Wrench, Eye, Activity, Flame, CheckCircle, XCircle, 
  ArrowRight, RotateCcw, Award, AlertCircle, Smartphone, Sparkles
} from 'lucide-react';
import { TRIAGE_CASES } from '../data/triageCasesData';
import { TriageCase } from '../types/hardware';
import { soundManager } from '../utils/audio';

interface TriageGameProps {
  onAddXp: (amount: number) => void;
  completedCaseIds: string[];
  setCompletedCaseIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TriageGame: React.FC<TriageGameProps> = ({
  onAddXp,
  completedCaseIds,
  setCompletedCaseIds
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [activeTool, setActiveTool] = useState<'microscope' | 'multimeter' | 'thermal'>('microscope');
  const [multimeterMode, setMultimeterMode] = useState<'Continuidad' | 'Ohmios' | 'Diodo' | 'Capacitancia'>('Continuidad');
  const [probesTouching, setProbesTouching] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const currentCase: TriageCase = TRIAGE_CASES[currentCaseIndex];
  const isCaseCompleted = completedCaseIds.includes(currentCase.id);

  // Probe touch action
  const handleTouchProbes = () => {
    soundManager.playProbeClick();
    setProbesTouching(true);

    if (currentCase.multimeterReadings.isBeeping) {
      setTimeout(() => {
        soundManager.playContinuityBeep(600);
      }, 150);
    }

    setTimeout(() => {
      setProbesTouching(false);
    }, 1200);
  };

  // Submit diagnosis decision
  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitDiagnosis = () => {
    if (!selectedOptionId || hasSubmitted) return;
    setHasSubmitted(true);

    const chosen = currentCase.options.find(o => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      soundManager.playSuccessChime();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      if (!isCaseCompleted) {
        onAddXp(currentCase.xpReward);
        setCompletedCaseIds(prev => [...prev, currentCase.id]);
      }
    } else {
      soundManager.playErrorBuzz();
    }
  };

  const handleNextCase = () => {
    soundManager.playProbeClick();
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setActiveTool('microscope');
    if (currentCaseIndex < TRIAGE_CASES.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
    } else {
      setCurrentCaseIndex(0);
    }
  };

  const handleResetCase = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setActiveTool('microscope');
  };

  const chosenOption = currentCase.options.find(o => o.id === selectedOptionId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header Strip & Case Selection */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span>MESA DE TRABAJO & DIAGNÓSTICO</span>
            <span>·</span>
            <span>CASO {currentCaseIndex + 1} DE {TRIAGE_CASES.length}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-amber-400" />
            <span>Simulador de Triage y Reparación</span>
          </h1>
          <p className="text-slate-400 text-xs">
            Aplica inspección visual, pruebas de multímetro y análisis térmico para resolver averías reales de hardware móvil.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-950 rounded-xl border border-slate-800">
          {TRIAGE_CASES.map((c, idx) => {
            const completed = completedCaseIds.includes(c.id);
            const active = currentCaseIndex === idx;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setCurrentCaseIndex(idx);
                  handleResetCase();
                  soundManager.playProbeClick();
                }}
                className={`px-3 py-2 text-xs font-mono font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  active
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : completed
                    ? 'text-emerald-400 bg-emerald-950/30 hover:bg-emerald-950/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>Caso {idx + 1}</span>
                {completed && <CheckCircle className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Details & Device Info Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Customer Ticket & Fault Context */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                <span>ORDEN DE SERVICIO TÉCNICO</span>
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                currentCase.difficulty === 'Principiante'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : currentCase.difficulty === 'Intermedio'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                Dificultad: {currentCase.difficulty}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Dispositivo recibido:</span>
              <div className="text-lg font-bold text-white">{currentCase.deviceModel}</div>
            </div>

            <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                Síntoma reportado por el cliente
              </span>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{currentCase.customerSymptom}"
              </p>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <span className="font-semibold text-slate-300">Zona sospechosa en mainboard:</span>
              <div className="font-mono text-slate-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                {currentCase.boardSection}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Recompensa al resolver:</span>
              <span className="font-mono text-amber-300 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>+{currentCase.xpReward} XP</span>
              </span>
            </div>
          </div>

          {/* Workbench Tools Selector */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-300 block">Instrumentos de Diagnóstico</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { setActiveTool('microscope'); soundManager.playProbeClick(); }}
                className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                  activeTool === 'microscope'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Microscopio</span>
              </button>

              <button
                onClick={() => { setActiveTool('multimeter'); soundManager.playProbeClick(); }}
                className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                  activeTool === 'multimeter'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Multímetro</span>
              </button>

              <button
                onClick={() => { setActiveTool('thermal'); soundManager.playProbeClick(); }}
                className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                  activeTool === 'thermal'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>Cámara Térmica</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Interactive Visual Instrument & Diagnosis Decider */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Diagnostic Viewport */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
            {/* Viewport Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                {activeTool === 'microscope' && <><Eye className="w-4 h-4 text-sky-400" /><span>Vista Óptica al Microscopio (Zoom 40x)</span></>}
                {activeTool === 'multimeter' && <><Activity className="w-4 h-4 text-amber-400" /><span>Multímetro Digital de Precisión</span></>}
                {activeTool === 'thermal' && <><Flame className="w-4 h-4 text-rose-400" /><span>Análisis Termográfico Infrarrojo</span></>}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                P/N PCB: MAIN-REV-2.4
              </span>
            </div>

            {/* Tool Screen: Microscope */}
            {activeTool === 'microscope' && (
              <div className="space-y-4">
                <div className="relative h-64 w-full bg-stone-950 rounded-xl border border-stone-800 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                  {/* Circular microscope reticle / crosshair */}
                  <div className="w-44 h-44 rounded-full border-2 border-amber-500/40 relative flex items-center justify-center bg-stone-900/90 shadow-2xl">
                    <div className="absolute w-full h-[1px] bg-amber-500/20"></div>
                    <div className="absolute h-full w-[1px] bg-amber-500/20"></div>

                    {/* Component Graphic Representation based on clue */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-28 h-12 rounded border flex items-center justify-center shadow-lg transition-colors ${
                        currentCase.microscopeClues.visualState === 'burnt_black'
                          ? 'bg-stone-950 border-stone-800 text-stone-600'
                          : currentCase.microscopeClues.visualState === 'central_hole'
                          ? 'bg-slate-900 border-amber-500/60'
                          : currentCase.microscopeClues.visualState === 'detached_missing'
                          ? 'bg-amber-950/20 border-dashed border-red-500/50'
                          : 'bg-amber-700/80 border-slate-600'
                      }`}>
                        {currentCase.microscopeClues.visualState === 'central_hole' && (
                          <div className="w-3 h-3 rounded-full bg-black border border-amber-500 shadow-md"></div>
                        )}
                        {currentCase.microscopeClues.visualState === 'detached_missing' && (
                          <span className="text-[10px] font-mono text-red-400 font-bold">PADS VACÍOS</span>
                        )}
                        {currentCase.microscopeClues.visualState === 'burnt_black' && (
                          <span className="text-[10px] font-mono text-stone-500 font-bold">QUEMADO</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-center">
                    <span className="text-xs font-mono text-amber-300/90 bg-slate-950/90 px-3 py-1 rounded-full border border-slate-800 inline-block">
                      {currentCase.microscopeClues.description}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tool Screen: Multimeter */}
            {activeTool === 'multimeter' && (
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  {/* Multimeter LCD Screen */}
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400/80 uppercase block">Modo: {multimeterMode}</span>
                      <div className="font-mono text-3xl font-bold tracking-wider text-emerald-400">
                        {probesTouching ? currentCase.multimeterReadings.value : '----'}
                      </div>
                    </div>
                    {currentCase.multimeterReadings.isBeeping && probesTouching && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono animate-pulse">
                        <Activity className="w-3.5 h-3.5" />
                        <span>BEEP! CONTINUIDAD</span>
                      </div>
                    )}
                  </div>

                  {/* Mode selector & probe action button */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="grid grid-cols-4 gap-1.5 w-full sm:w-auto">
                      {(['Continuidad', 'Ohmios', 'Diodo', 'Capacitancia'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => { setMultimeterMode(mode); soundManager.playProbeClick(); }}
                          className={`px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                            multimeterMode === mode
                              ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {mode.slice(0, 4)}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleTouchProbes}
                      className="w-full sm:flex-1 py-2.5 px-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Activity className="w-4 h-4" />
                      <span>{probesTouching ? 'Midiendo con puntas...' : 'Colocar Puntas de Prueba'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Lectura analizada:</strong> {currentCase.multimeterReadings.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Tool Screen: Thermal Camera */}
            {activeTool === 'thermal' && (
              <div className="space-y-4">
                <div className="h-64 w-full bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Heat map color glow */}
                  <div className={`w-36 h-36 rounded-full blur-2xl transition-all ${
                    currentCase.thermalReading.hotspot
                      ? 'bg-red-500/60 scale-125 animate-pulse'
                      : 'bg-sky-500/20'
                  }`}></div>

                  <div className="relative z-10 text-center space-y-2">
                    <div className="font-mono text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
                      <Flame className={`w-6 h-6 ${currentCase.thermalReading.hotspot ? 'text-red-500' : 'text-sky-400'}`} />
                      <span>{currentCase.thermalReading.tempC} °C</span>
                    </div>
                    <p className="text-xs text-slate-300 max-w-sm">
                      {currentCase.thermalReading.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Diagnosis & Action Selection */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>Decisión Técnica: ¿Cuál es el Diagnóstico y la Acción Correcta?</span>
            </h3>

            <div className="space-y-3">
              {currentCase.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let cardStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                if (hasSubmitted) {
                  if (option.isCorrect) {
                    cardStyle = 'bg-emerald-950/60 border-emerald-500/70 text-emerald-200';
                  } else if (isSelected && !option.isCorrect) {
                    cardStyle = 'bg-rose-950/60 border-rose-500/70 text-rose-200';
                  }
                } else if (isSelected) {
                  cardStyle = 'bg-amber-500/10 border-amber-500/60 text-amber-200';
                }

                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${cardStyle}`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{option.diagnosis}</span>
                      {hasSubmitted && option.isCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {hasSubmitted && isSelected && !option.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      <strong>Acción propuesta:</strong> {option.action}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation box after submit */}
            {hasSubmitted && chosenOption && (
              <div className={`p-4 rounded-xl text-xs space-y-2 border ${
                chosenOption.isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
              }`}>
                <div className="font-bold flex items-center gap-1.5">
                  {chosenOption.isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                  <span>{chosenOption.isCorrect ? '¡Diagnóstico Técnico Certero!' : 'Diagnóstico Incorrecto'}</span>
                </div>
                <p className="leading-relaxed">
                  {chosenOption.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={handleResetCase}
                className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Caso</span>
              </button>

              {!hasSubmitted ? (
                <button
                  onClick={handleSubmitDiagnosis}
                  disabled={!selectedOptionId}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
                >
                  Confirmar Dictamen Técnico
                </button>
              ) : (
                <button
                  onClick={handleNextCase}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <span>Siguiente Caso</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
