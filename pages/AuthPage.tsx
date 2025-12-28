
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { Mail, Lock, Chrome, ChevronLeft } from 'lucide-react';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err: any) {
      console.error('Auth error:', err);
      setError('Email hoặc mật khẩu không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err: any) {
      console.error('Google Auth error:', err);
      setError('Không thể đăng nhập bằng Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col max-w-md mx-auto">
      <button onClick={() => navigate('/')} className="mb-8 p-2 bg-slate-50 rounded-xl w-fit text-slate-600"><ChevronLeft /></button>
      
      <div className="mb-12">
        <h1 className="text-4xl font-black text-blue-600 mb-3 tracking-tighter">Chợ Của Tui</h1>
        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{isLogin ? 'Chào mừng quay trở lại!' : 'Đăng ký thành viên mới.'}</p>
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-4 mb-10">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="email" 
            placeholder="Email của bạn" 
            className="w-full pl-12 pr-4 py-4.5 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            className="w-full pl-12 pr-4 py-4.5 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-3 rounded-xl border border-red-100">{error}</p>}

        <button 
          disabled={loading}
          className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 active:scale-95 transition-all disabled:opacity-50 uppercase tracking-widest text-sm"
        >
          {loading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </button>
      </form>

      <div className="relative mb-10 text-center">
        <div className="absolute top-1/2 w-full h-px bg-slate-100"></div>
        <span className="relative px-6 bg-white text-slate-400 text-[10px] uppercase font-black tracking-widest">Hoặc</span>
      </div>

      <button 
        onClick={handleGoogleAuth}
        className="w-full py-5 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-black flex items-center justify-center gap-4 active:scale-95 transition-all shadow-sm uppercase tracking-widest text-xs"
      >
        <Chrome size={20} className="text-red-500" /> Tiếp tục với Google
      </button>

      <p className="mt-auto text-center text-xs text-slate-400 font-bold uppercase tracking-wider">
        {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'} 
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="ml-2 text-blue-600 font-black decoration-2 hover:underline"
        >
          {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
