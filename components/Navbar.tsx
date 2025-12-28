import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusSquare, MessageCircle, User, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, profile } = useAuth();

  const getAvatarUrl = () => {
    if (profile?.photoURL) return profile.photoURL;
    if (user?.uid) return `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`;
    return "https://api.dicebear.com/7.x/avataaars/svg?seed=guest";
  };

  return (
    <header className="hidden md:block sticky top-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl">C</span>
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">Chợ Của Tui</span>
        </Link>

        {/* Search */}
        <div className="flex-grow max-w-xl relative group">
          <input 
            type="text" 
            placeholder="Tìm iPhone, SH, MacBook..." 
            className="w-full bg-slate-100 border-2 border-transparent focus:border-blue-600/10 focus:bg-white rounded-[1.2rem] py-3.5 pl-12 pr-4 text-sm font-semibold transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link to="/post" className="btn-ai !py-3 !px-5 text-xs uppercase tracking-widest shadow-blue-100">
            <PlusSquare size={18} />
            Đăng tin
          </Link>

          <div className="flex items-center gap-4 border-l border-slate-100 pl-6">
            <Link to="/chats" className="p-3 hover:bg-slate-100 rounded-2xl text-slate-600 transition-all relative">
              <MessageCircle size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Link>
            <button className="p-3 hover:bg-slate-100 rounded-2xl text-slate-600 transition-all">
              <Bell size={22} />
            </button>
            
            {user ? (
              <Link to="/profile" className="flex items-center gap-3 p-1.5 pr-4 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all">
                <img 
                  src={getAvatarUrl()} 
                  className="w-8 h-8 rounded-xl object-cover border border-white" 
                  alt="Avatar" 
                />
                <span className="text-xs font-black text-slate-700">{profile?.displayName?.split(' ')[0] || 'Tài khoản'}</span>
              </Link>
            ) : (
              <Link to="/auth" className="text-sm font-black text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">Đăng nhập</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;