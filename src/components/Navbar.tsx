import React from 'react';
import { Volume2, VolumeX, Award, Cpu, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  activeTab: 'workbench' | 'triage' | 'quiz' | 'flashcards' | 'matrix' | 'schematics';
  setActiveTab: (tab: 'workbench' | 'triage' | 'quiz' | 'flashcards' | 'matrix' | 'schematics') => void;
  xp: number;
  onOpenDocs: () => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  xp,
  onOpenDocs,
  isMuted,
  setIsMuted
}) => {
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Zone 1: Single text element wordmark */}
      <div 
        onClick={() => setActiveTab('workbench')}
        className="flex items-center gap-2 cursor-pointer group whitespace-nowrap shrink-0"
      >
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
          <Cpu className="w-4 h-4" />
        </div>
        <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
          Técnico SMD Móvil
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Módulo 1</span>
        </span>
      </div>

      {/* Zone 2: Concise single-line navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => { setActiveTab('workbench'); soundManager.playProbeClick(); }}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'workbench' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Laboratorio SMD
        </button>
        <button
          onClick={() => { setActiveTab('triage'); soundManager.playProbeClick(); }}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'triage' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Simulador de Triage
        </button>
        <button
          onClick={() => { setActiveTab('quiz'); soundManager.playProbeClick(); }}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'quiz' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Evaluación Quiz
        </button>
        <button
          onClick={() => { setActiveTab('flashcards'); soundManager.playProbeClick(); }}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'flashcards' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Flashcards
        </button>
        <button
          onClick={() => { setActiveTab('matrix'); soundManager.playProbeClick(); }}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'matrix' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Matriz Diagnóstico
        </button>
        <button
          onClick={() => { setActiveTab('schematics'); soundManager.playProbeClick(); }}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'schematics' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Simbología
        </button>
      </nav>

      {/* Zone 3: 1 primary action area */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono tabular-nums text-amber-300">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>{xp} XP</span>
        </div>

        <button
          onClick={onOpenDocs}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors whitespace-nowrap shrink-0"
          title="Ver documentos oficiales de estudio"
        >
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">PDFs Guía</span>
        </button>

        <button
          onClick={toggleMute}
          className={`p-1.5 rounded-lg border transition-colors ${
            isMuted 
              ? 'text-slate-500 bg-slate-800/50 border-slate-700' 
              : 'text-amber-400 bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
          }`}
          title={isMuted ? 'Activar sonido del multímetro' : 'Silenciar sonido'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
