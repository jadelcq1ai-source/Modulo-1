import React, { useState } from 'react';
import { 
  RotateCw, Check, AlertCircle, Shuffle, ChevronLeft, 
  ChevronRight, Sparkles, BookOpen, Layers
} from 'lucide-react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { Flashcard } from '../types/hardware';
import { soundManager } from '../utils/audio';

interface FlashcardsDeckProps {
  onAddXp: (amount: number) => void;
  masteredCardIds: string[];
  setMasteredCardIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FlashcardsDeck: React.FC<FlashcardsDeckProps> = ({
  onAddXp,
  masteredCardIds,
  setMasteredCardIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [cards, setCards] = useState<Flashcard[]>(FLASHCARDS_DATA);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const categories = ['Todos', 'Anatomía', 'Diagnóstico', 'Reglas de Oro', 'Diodos', 'Simbología'];

  const filteredCards = selectedCategory === 'Todos'
    ? cards
    : cards.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isMastered = currentCard ? masteredCardIds.includes(currentCard.id) : false;

  const handleFlip = () => {
    soundManager.playProbeClick();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    soundManager.playProbeClick();
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    soundManager.playProbeClick();
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleShuffle = () => {
    soundManager.playProbeClick();
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const handleRate = (rating: 'facil' | 'dudoso' | 'dificil') => {
    if (!currentCard) return;

    if (rating === 'facil') {
      soundManager.playSuccessChime();
      if (!isMastered) {
        setMasteredCardIds(prev => [...prev, currentCard.id]);
        onAddXp(15);
      }
    } else if (rating === 'dudoso') {
      soundManager.playProbeClick();
      onAddXp(5);
    } else {
      soundManager.playErrorBuzz();
    }

    handleNext();
  };

  if (!currentCard) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center text-slate-400">
        No hay tarjetas en esta categoría.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Strip */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span>MEMORIZACIÓN & REPETICIÓN ESPACIADA</span>
            <span>·</span>
            <span>TÉCNICO SMD</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 mt-1">
            <Layers className="w-6 h-6 text-amber-400" />
            <span>Flashcards Técnicas Interactivas</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pon a prueba tu memoria activa sobre conceptos de condensadores, resistencias, diodos, termistores y filtros.
          </p>
        </div>

        <button
          onClick={handleShuffle}
          className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Shuffle className="w-3.5 h-3.5 text-amber-400" />
          <span>Barajar Tarjetas</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900 rounded-xl border border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
              soundManager.playProbeClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Progress & Card Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Tarjeta {currentIndex + 1} de {filteredCards.length}</span>
        <div className="flex items-center gap-3">
          <span>Dominadas: <strong className="text-emerald-400">{masteredCardIds.length}</strong> / {cards.length}</span>
          {isMastered && <span className="text-emerald-400 font-bold">✓ Aprendida</span>}
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div 
        onClick={handleFlip}
        className="w-full min-h-[320px] rounded-2xl cursor-pointer select-none transition-all duration-300 transform relative"
        style={{ perspective: '1000px' }}
      >
        <div className={`w-full h-full min-h-[320px] rounded-2xl border p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 ${
          isFlipped 
            ? 'bg-slate-950 border-amber-500/40 text-slate-100 ring-1 ring-amber-500/20' 
            : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
        }`}>
          {/* Card Top Pill & Category */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-amber-400 font-bold uppercase tracking-wider">
              {currentCard.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
              <RotateCw className="w-3 h-3 text-slate-400" />
              <span>Clic para {isFlipped ? 'ver pregunta' : 'voltear'}</span>
            </div>
          </div>

          {/* Card Main Body */}
          <div className="my-auto py-6">
            {!isFlipped ? (
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                  {currentCard.frontQuestion}
                </h2>
                {currentCard.frontHint && (
                  <p className="text-xs text-slate-400 italic">
                    Pista: {currentCard.frontHint}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-base sm:text-lg text-emerald-300 font-medium leading-relaxed whitespace-pre-line">
                  {currentCard.backAnswer}
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-amber-400 block">Nota técnica para examen:</span>
                  <p>{currentCard.technicalNote}</p>
                </div>
              </div>
            )}
          </div>

          {/* Card Footer Tag */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{currentCard.badge || 'SMD'}</span>
            <span>Espacio o Clic para voltear</span>
          </div>
        </div>
      </div>

      {/* Recall Assessment Buttons (Visible when flipped) */}
      {isFlipped ? (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 block text-center">
            ¿Qué tan bien recordabas este concepto?
          </span>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleRate('dificil')}
              className="py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
            >
              Difícil (Repetir)
            </button>
            <button
              onClick={() => handleRate('dudoso')}
              className="py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
            >
              Dudoso (+5 XP)
            </button>
            <button
              onClick={() => handleRate('facil')}
              className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
            >
              Fácil (+15 XP) ✓
            </button>
          </div>
        </div>
      ) : (
        /* Navigation Controls */
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
