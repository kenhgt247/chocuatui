
import React from 'react';
import { Facebook, Youtube, Instagram, ShieldCheck, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="hidden md:block bg-white border-t border-slate-100 pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-12 border-b border-slate-50 pb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><span className="text-white font-black text-sm">C</span></div>
            <span className="text-xl font-black text-slate-800 tracking-tighter">Chợ Của Tui</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">Nền tảng rao vặt ứng dụng AI số 1 Việt Nam. Giúp việc mua bán trở nên an toàn và thông minh hơn.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Youtube size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Instagram size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-6">Liên kết</h4>
          <ul className="space-y-4 text-sm font-bold text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Giới thiệu</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Tuyển dụng</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Truyền thông</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-6">Hỗ trợ</h4>
          <ul className="space-y-4 text-sm font-bold text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Trung tâm hỗ trợ</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">An toàn mua bán</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Liên hệ hỗ trợ</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-6">Trụ sở</h4>
          <div className="space-y-4 text-sm text-slate-500 font-medium leading-relaxed">
            <p className="flex items-start gap-3"><Mail size={16} className="text-blue-600 shrink-0" /> support@chocuatui.vn</p>
            <p className="flex items-start gap-3"><Phone size={16} className="text-blue-600 shrink-0" /> 1900 6868</p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <ShieldCheck className="text-emerald-500" />
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Đã chứng nhận bởi Bộ Công Thương</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        <p>© 2024 CHỢ CỦA TUI. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#">Điều khoản</a>
          <a href="#">Bảo mật</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
