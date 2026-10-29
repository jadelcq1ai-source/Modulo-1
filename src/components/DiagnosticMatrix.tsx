import React, { useState } from 'react';
import { 
  Table, Search, AlertTriangle, ShieldAlert, 
  CheckCircle2, Sparkles, HelpCircle, Activity 
} from 'lucide-react';
import { DIAGNOSTIC_MATRIX_ROWS } from '../data/componentsData';
import { soundManager } from '../utils/audio';

export const DiagnosticMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredRows = DIAGNOSTIC_MATRIX_ROWS.filter((row) => {
    const matchesSearch = 
      row.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.multimeter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.consequence.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'jumper') return matchesSearch && row.actionBadge.includes('Jumper');
    if (selectedFilter === 'obligatorio') return matchesSearch && row.actionBadge.includes('Obligatorio');
    return matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
          <span>HOJA MAESTRA DE CONSULTA RÁPIDA</span>
          <span>·</span>
          <span>GUÍA MAESTRA SMD (SLIDE 15)</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Table className="w-6 h-6 text-amber-400" />
          <span>Matriz Maestra de Diagnóstico SMD en Mainboards</span>
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Tabla de referencia técnica para identificar rápidamente causas comunes, síntomas físicos microscópicos, pruebas de multímetro y la consecuencia crítica de retirar cada componente sin instalar su reemplazo.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Buscar por síntoma, causa o test..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => { setSelectedFilter('all'); soundManager.playProbeClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Todos los Componentes
            </button>
            <button
              onClick={() => { setSelectedFilter('jumper'); soundManager.playProbeClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedFilter === 'jumper'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Solo Admite Jumper
            </button>
            <button
              onClick={() => { setSelectedFilter('obligatorio'); soundManager.playProbeClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedFilter === 'obligatorio'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Reemplazo Obligatorio
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Responsive Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="p-4 whitespace-nowrap">Componente</th>
                <th className="p-4 whitespace-nowrap">Causa Común</th>
                <th className="p-4 whitespace-nowrap">Síntoma Físico</th>
                <th className="p-4 whitespace-nowrap">Test Multímetro</th>
                <th className="p-4 whitespace-nowrap">Consecuencia sin él</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  {/* Component Name & Symbol */}
                  <td className="p-4 font-bold text-white whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-amber-400 font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {row.symbol}
                      </span>
                      <span>{row.component}</span>
                    </div>
                  </td>

                  {/* Common Cause */}
                  <td className="p-4 text-slate-300">
                    {row.cause}
                  </td>

                  {/* Physical Symptom */}
                  <td className="p-4">
                    <span className="text-slate-200 font-medium">{row.symptom}</span>
                  </td>

                  {/* Multimeter Test */}
                  <td className="p-4 font-mono text-sky-300">
                    {row.multimeter}
                  </td>

                  {/* Consequence without it */}
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="text-slate-300 leading-relaxed">{row.consequence}</div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        row.actionBadge.includes('Jumper')
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : row.actionBadge.includes('Obligatorio')
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      }`}>
                        {row.actionBadge}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Golden Rules Summary Cards below table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase">
            <ShieldAlert className="w-4 h-4" />
            <span>Condensador Retirado</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            La placa puede encender al quitar un corto, pero dejarlo ausente causa daños graves inmediatos por sobrevoltaje y rizado.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>Resistencia Retirada</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            A diferencia del condensador, retirar una resistencia provoca una falla inminente y total del circuito. Reemplazo mandatorio.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Filtro EMI Desprendido</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Maneja datos de alta velocidad (no voltaje). Se puede revivir la línea de pantalla o cámara aplicando un Jumper con hilo de cobre.
          </p>
        </div>
      </div>
    </div>
  );
};
