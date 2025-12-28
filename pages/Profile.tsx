
import React from 'react';
import { LogOut, ShieldCheck, Heart, Package, ChevronRight, Settings, Wallet, History, Star, Award } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-blue-600 pt-12 pb-24 px-6 relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" className="w-20 h-20 rounded-3xl border-4 border-white/20 shadow-2xl object-cover" />
            <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-lg">
              <ShieldCheck size={16} className="text-blue-500" />
            </div>
          </div>
          <div className="text-white">
            <h1 className="text-xl font-black">Nguyễn Văn Admin</h1>
            <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">Bậc: Chuyên gia rao vặt</p>
          </div>
        </div>
        <button className="absolute top-12 right-6 p-2.5 bg-white/10 rounded-2xl text-white backdrop-blur-md">
          <Settings size={20} />
        </button>
      </div>

      <div className="px-6 -mt-12 space-y-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-5 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col items-center">
            <div className="bg-amber-100 p-2.5 rounded-2xl text-amber-600 mb-2"><Star size={20} fill="currentColor"/></div>
            <p className="text-xl font-black text-slate-800">100</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Điểm uy tín</p>
          </div>
          <div className="bg-white p-5 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col items-center">
            <div className="bg-indigo-100 p-2.5 rounded-2xl text-indigo-600 mb-2"><Award size={20}/></div>
            <p className="text-xl font-black text-slate-800">Bạch kim</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Huy hiệu</p>
          </div>
        </div>

        {/* Wallet */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
              <Wallet size={14} /> Ví Chợ Tui
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-black text-slate-800">1.250.000 <span className="text-sm font-bold text-slate-400">VNĐ</span></h2>
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-black text-xs shadow-lg shadow-blue-100 active:scale-95 transition-all uppercase tracking-widest">Nạp</button>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-50 shadow-sm divide-y divide-slate-50">
          {[
            { icon: <Package />, label: 'Quản lý tin đăng', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: <History />, label: 'Lịch sử mua hàng', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: <Heart />, label: 'Tin đã lưu', color: 'text-rose-500', bg: 'bg-rose-50' }
          ].map((item, i) => (
            <button key={i} className="w-full p-5 flex items-center justify-between active:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 ${item.bg} ${item.color} rounded-xl`}>{item.icon}</div>
                <span className="font-bold text-slate-700 text-sm">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
          ))}
        </div>

        <button className="w-full p-5 bg-slate-100 text-slate-500 rounded-[2rem] font-black flex items-center justify-center gap-2 active:bg-red-50 active:text-red-500 transition-all uppercase text-[10px] tracking-widest">
          <LogOut size={18} /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Profile;
