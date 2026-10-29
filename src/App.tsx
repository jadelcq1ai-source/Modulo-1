import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WorkbenchLab } from './components/WorkbenchLab';
import { TriageGame } from './components/TriageGame';
import { SpeedQuiz } from './components/SpeedQuiz';
import { FlashcardsDeck } from './components/FlashcardsDeck';
import { DiagnosticMatrix } from './components/DiagnosticMatrix';
import { SchematicsMatcher } from './components/SchematicsMatcher';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { Cpu, Award, Zap, BookOpen, Layers, CheckCircle } from 'lucide-react';
import { soundManager } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<'workbench' | 'triage' | 'quiz' | 'flashcards' | 'matrix' | 'schematics'>('workbench');
  const [isDocsModalOpen, setIsDocsModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Persistent user stats in localStorage
  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('smd_app_xp');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [completedCases, setCompletedCases] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smd_app_cases');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [masteredCards, setMasteredCards] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smd_app_cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('smd_app_best_score');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smd_app_xp', xp.toString());
      localStorage.setItem('smd_app_cases', JSON.stringify(completedCases));
      localStorage.setItem('smd_app_cards', JSON.stringify(masteredCards));
      localStorage.setItem('smd_app_best_score', bestScore.toString());
    } catch {}
  }, [xp, completedCases, masteredCards, bestScore]);

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const updateBestScore = (newScore: number) => {
    setBestScore(newScore);
  };

  // Technician Rank based on XP
  const getRank = () => {
    if (xp >= 1000) return 'Maestro de Mainboards (Nivel 5)';
    if (xp >= 600) return 'Especialista en Microelectrónica (Nivel 4)';
    if (xp >= 350) return 'Técnico SMD Senior (Nivel 3)';
    if (xp >= 150) return 'Técnico SMD Junior (Nivel 2)';
    return 'Aprendiz de Taller (Nivel 1)';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation Bar following the strict 3-Zone Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        xp={xp}
        onOpenDocs={() => setIsDocsModalOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Mobile Tab Selector (shown only on small screens) */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto p-2 bg-slate-900 border-b border-slate-800 text-xs">
        <button
          onClick={() => { setActiveTab('workbench'); soundManager.playProbeClick(); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
            activeTab === 'workbench' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Laboratorio
        </button>
        <button
          onClick={() => { setActiveTab('triage'); soundManager.playProbeClick(); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
            activeTab === 'triage' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Triage Casos
        </button>
        <button
          onClick={() => { setActiveTab('quiz'); soundManager.playProbeClick(); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
            activeTab === 'quiz' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Evaluación
        </button>
        <button
          onClick={() => { setActiveTab('flashcards'); soundManager.playProbeClick(); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
            activeTab === 'flashcards' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Flashcards
        </button>
        <button
          onClick={() => { setActiveTab('matrix'); soundManager.playProbeClick(); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
            activeTab === 'matrix' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Matriz
        </button>
        <button
          onClick={() => { setActiveTab('schematics'); soundManager.playProbeClick(); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
            activeTab === 'schematics' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Simbología
        </button>
      </div>

      {/* Main Viewport Content */}
      <main className="flex-1 pb-16">
        {activeTab === 'workbench' && <WorkbenchLab />}
        {activeTab === 'triage' && (
          <TriageGame
            onAddXp={addXp}
            completedCaseIds={completedCases}
            setCompletedCaseIds={setCompletedCases}
          />
        )}
        {activeTab === 'quiz' && (
          <SpeedQuiz
            onAddXp={addXp}
            bestScore={bestScore}
            onUpdateBestScore={updateBestScore}
          />
        )}
        {activeTab === 'flashcards' && (
          <FlashcardsDeck
            onAddXp={addXp}
            masteredCardIds={masteredCards}
            setMasteredCardIds={setMasteredCards}
          />
        )}
        {activeTab === 'matrix' && <DiagnosticMatrix />}
        {activeTab === 'schematics' && <SchematicsMatcher onAddXp={addXp} />}
      </main>

      {/* Quiet Technical Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-6 text-center text-xs text-slate-500 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <span>Rango Técnico: <strong className="text-amber-400">{getRank()}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Casos Resueltos: {completedCases.length}</span>
          <span aria-hidden="true">·</span>
          <span>Tarjetas Dominadas: {masteredCards.length}</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Basado rigurosamente en el MÓDULO 1 y la Guía Maestra de Componentes SMD para Mantenimiento y Reparación de Celulares.
        </p>
      </footer>

      {/* Original PDFs Viewer Modal */}
      <DocumentViewerModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />
    </div>
  );
}
