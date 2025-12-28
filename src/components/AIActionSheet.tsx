
import React from 'react';
import { Sparkles, X, Lightbulb, Zap, ShieldCheck } from 'lucide-react';

interface AIActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const AIActionSheet: React.FC<AIActionSheetProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-xl animate-slideUp bg-white rounded-t-[3rem] p-8 shadow-2xl relative">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
              <Sparkles size={24} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">{title}</h2>
              <p className="text-xs font-bold text-purple-500 uppercase tracking-widest">Powered by Gemini AI</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-100 rounded-2xl text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {children}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          <ShieldCheck size={14} className="text-blue-500" /> Bảo mật & Riêng tư bởi AI Chợ Tui
        </div>
      </div>
    </div>
  );
};

export default AIActionSheet;
