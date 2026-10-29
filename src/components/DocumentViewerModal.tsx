import React, { useState } from 'react';
import { X, BookOpen, ExternalLink, Download, FileText } from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ isOpen, onClose }) => {
  const [selectedDoc, setSelectedDoc] = useState<'guia' | 'modulo'>('guia');

  if (!isOpen) return null;

  const docUrl = selectedDoc === 'guia' 
    ? '/assets/aistudio/Gu_a_Maestra_de_Componentes_SMD_9ac35417.pdf'
    : '/assets/aistudio/MODULO_1_8264da85.pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold text-white">
                Documentos Oficiales de Estudio
              </h2>
              <span className="text-[11px] text-slate-400">
                Material de origen proporcionado para el examen de mantenimiento y reparación
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setSelectedDoc('guia')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  selectedDoc === 'guia'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Guía Maestra SMD (Presentación)
              </button>
              <button
                onClick={() => setSelectedDoc('modulo')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  selectedDoc === 'modulo'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                MÓDULO 1 (Manual Completo)
              </button>
            </div>

            <a
              href={docUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Abrir en pestaña nueva"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Frame */}
        <div className="flex-1 bg-slate-950 relative">
          <iframe
            src={`${docUrl}#toolbar=1`}
            className="w-full h-full border-0"
            title="Visor de Documento de Estudio"
          />
        </div>

        {/* Footer info */}
        <div className="px-6 py-2.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Documento activo: {selectedDoc === 'guia' ? 'Guía_Maestra_de_Componentes_SMD.pdf' : 'MODULO 1.pdf'}</span>
          </div>
          <a
            href={docUrl}
            download
            className="text-amber-400 hover:underline flex items-center gap-1 font-mono"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar archivo</span>
          </a>
        </div>
      </div>
    </div>
  );
};
