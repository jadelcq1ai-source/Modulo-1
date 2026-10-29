import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, CheckCircle2, XCircle, Clock, RotateCcw, 
  Award, ArrowRight, ShieldCheck, BookOpen, Sparkles
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion } from '../types/hardware';
import { soundManager } from '../utils/audio';

interface SpeedQuizProps {
  onAddXp: (amount: number) => void;
  bestScore: number;
  onUpdateBestScore: (score: number) => void;
}

export const SpeedQuiz: React.FC<SpeedQuizProps> = ({
  onAddXp,
  bestScore,
  onUpdateBestScore
}) => {
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [questions, setQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30s per question in exam mode
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; selected: number; isCorrect: boolean }[]>([]);

  const currentQ = questions[currentIndex];

  // Timer for exam mode
  useEffect(() => {
    if (mode === 'exam' && !isAnswered && !quizFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (mode === 'exam' && timeLeft === 0 && !isAnswered && !quizFinished) {
      // Time expired
      handleSelectOption(-1); // wrong
    }
  }, [mode, isAnswered, quizFinished, timeLeft]);

  // Handle option select
  const handleSelectOption = (idx: number) => {
    if (isAnswered || quizFinished) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      soundManager.playSuccessChime();
      setScore(prev => prev + 1);
      onAddXp(25);
    } else {
      soundManager.playErrorBuzz();
    }

    setUserAnswers(prev => [
      ...prev,
      { questionId: currentQ.id, selected: idx, isCorrect }
    ]);
  };

  const handleNextQuestion = () => {
    soundManager.playProbeClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(30);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 1 : 0);
      if (finalScore > bestScore) {
        onUpdateBestScore(finalScore);
      }
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {}
    }
  };

  const handleRestartQuiz = () => {
    soundManager.playProbeClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(30);
    setUserAnswers([]);
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span>EVALUACIÓN TÉCNICA OFICIAL</span>
            <span>·</span>
            <span>MÓDULO 1 & GUÍA MAESTRA</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 mt-1">
            <HelpCircle className="w-6 h-6 text-amber-400" />
            <span>Simulador de Evaluación de Hardware</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Preguntas técnicas de opción múltiple con retroalimentación instantánea sobre fallas, polaridad, síntomas y reglas de oro.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => { setMode('practice'); handleRestartQuiz(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'practice'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Práctica Libre
          </button>
          <button
            onClick={() => { setMode('exam'); handleRestartQuiz(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'exam'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Modo Examen (30s)
          </button>
        </div>
      </div>

      {!quizFinished ? (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          {/* Question Meta & Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-amber-400 font-bold">
                Pregunta {currentIndex + 1} de {questions.length}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 capitalize">Categoría: {currentQ.category}</span>
            </div>

            <div className="flex items-center gap-4">
              {mode === 'exam' && (
                <div className={`flex items-center gap-1 font-mono font-bold ${
                  timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-slate-300'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timeLeft}s</span>
                </div>
              )}
              <div className="text-slate-400 font-mono">
                Aciertos: <strong className="text-emerald-400">{score}</strong>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <BookOpen className="w-3 h-3 text-slate-400" />
              <span>Fuente: {currentQ.sourceDoc}</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60';
              if (isAnswered) {
                if (isCorrectAnswer) {
                  style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                } else if (isSelected && !isCorrectAnswer) {
                  style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                } else {
                  style = 'bg-slate-950/40 border-slate-900 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start justify-between gap-3 ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0 text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed pt-0.5">{option}</span>
                  </div>

                  {isAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold flex items-center gap-1.5 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Explicación Técnica:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Footer Controls */}
          {isAnswered && (
            <div className="flex items-center justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 shadow-md shadow-amber-500/20"
              >
                <span>{currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Report Card */
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              ¡Evaluación Completada!
            </h2>
            <p className="text-slate-400 text-xs">
              Has respondido todas las preguntas basadas en el Módulo 1 y la Guía Maestra SMD.
            </p>
          </div>

          {/* Score Badge */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm mx-auto space-y-2">
            <div className="text-4xl font-extrabold font-mono text-amber-400">
              {score} / {questions.length}
            </div>
            <div className="text-sm font-semibold text-slate-300">
              Calificación: {percentage}%
            </div>
            <div className="text-xs text-slate-500">
              {percentage >= 80 
                ? '🏆 Nivel: Maestro de Hardware SMD (Listo para la evaluación)' 
                : percentage >= 60 
                ? '👍 Nivel: Técnico Apto (Repasar fallas de TVS y NTC)' 
                : '📚 Nivel: Aprendiz (Se recomienda revisar el laboratorio interactivo)'}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 shadow-md shadow-amber-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar Evaluación</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
