
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, User, Plus, Search } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[100] glass rounded-[2.5rem] shadow-2xl px-8 py-4 border border-white/40">
      <div className="flex items-center justify-between">
        <NavLink to="/" className={({ isActive }) => `p-3 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:bg-slate-50'}`}>
          <Home size={22} />
        </NavLink>
        <NavLink to="/chats" className={({ isActive }) => `p-3 rounded-2xl transition-all relative ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:bg-slate-50'}`}>
          <MessageCircle size={22} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </NavLink>
        <NavLink to="/post" className="w-14 h-14 bg-slate-900 rounded-[1.4rem] flex items-center justify-center text-white shadow-xl shadow-slate-200 -mt-12 active:scale-90 transition-all border-4 border-[#F8FAFC]">
          <Plus size={28} />
        </NavLink>
        <button className="p-3 text-slate-400"><Search size={22} /></button>
        <NavLink to="/profile" className={({ isActive }) => `p-3 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:bg-slate-50'}`}>
          <User size={22} />
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
