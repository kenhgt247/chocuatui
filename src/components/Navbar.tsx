
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PlusSquare, MessageCircle, User, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="hidden md:block sticky top-0 z-[100] bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white font-black text-xl">C</span>
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">Chợ Của Tui</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow max-w-2xl relative">
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm, thương hiệu..." 
            className="w-full bg-slate-100 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link to="/post" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100 hover:scale-105 transition-all">
            <PlusSquare size={18} />
            Đăng tin
          </Link>

          <div className="flex items-center gap-4 border-l border-slate-100 pl-6 text-slate-500">
            <Link to="/chats" className="p-2 hover:bg-slate-50 rounded-xl transition-colors relative">
              <MessageCircle size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Link>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <Bell size={22} />
            </button>
            
            {user ? (
              <Link to="/profile" className="flex items-center gap-2 p-1 pl-3 hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all">
                <img 
                  src={profile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
                  className="w-8 h-8 rounded-xl object-cover" 
                  alt="Avatar"
                />
                <ChevronDown size={14} />
              </Link>
            ) : (
              <Link to="/auth" className="text-sm font-black text-blue-600 hover:underline">Đăng nhập</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
