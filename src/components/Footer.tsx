
import React from 'react';
import { Facebook, Youtube, Instagram, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="hidden md:block bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black">C</span>
              </div>
              <span className="text-xl font-black text-white tracking-tighter">Chợ Của Tui</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Nền tảng rao vặt ứng dụng AI hàng đầu Việt Nam. Giúp việc mua bán trở nên an toàn, nhanh chóng và thông minh hơn bao giờ hết.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Facebook size={20} /></button>
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Youtube size={20} /></button>
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Instagram size={20} /></button>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Về chúng tôi</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Truyền thông</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Blog kinh nghiệm</a></li>
            </ul>
          </div>

          {/* Support Col */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Hỗ trợ khách hàng</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Quy định đăng tin</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Giải quyết khiếu nại</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Liên hệ</h4>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <Phone size={18} className="text-blue-500" />
                <span>Hotline: 1900 1234</span>
              </div>
              <div className="flex gap-3">
                <Mail size={18} className="text-blue-500" />
                <span>support@chocuatui.vn</span>
              </div>
              <div className="flex gap-3">
                <MapPin size={18} className="text-blue-500" />
                <span>Toà nhà Innovation, Quận 1, TP. HCM</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
              <ShieldCheck className="text-emerald-500" />
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Đã chứng nhận bởi Bộ Công Thương</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <p>© 2024 CHỢ CỦA TUI. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Chính sách cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
