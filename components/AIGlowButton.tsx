
import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIGlowButtonProps {
  onClick: () => void;
  loading?: boolean;
  label: string;
  disabled?: boolean;
}

const AIGlowButton: React.FC<AIGlowButtonProps> = ({ onClick, loading, label, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-black overflow-hidden shadow-xl shadow-indigo-200 active:scale-95 transition-all disabled:opacity-50 group"
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex items-center justify-center gap-2 relative z-10 uppercase tracking-widest text-xs">
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles className="animate-pulse" size={18} />}
        {label}
      </div>
    </button>
  );
};

export default AIGlowButton;
