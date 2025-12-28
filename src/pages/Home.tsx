
import React, { useState, useEffect } from 'react';
import { Search, Flame, DollarSign, Crown, ChevronDown, SlidersHorizontal, PackageOpen, Sparkles } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import ListingCard from '../components/ListingCard';
import { CATEGORIES } from '../data/demo';

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'), limit(50));
    if (activeCategory !== 'Tất cả') {
      q = query(collection(db, 'listings'), where('category', '==', activeCategory), orderBy('createdAt', 'desc'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(data);
      setLoading(false);
    }, (err) => setLoading(false));

    return () => unsubscribe();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header Cao Cấp */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex-grow relative">
            <input 
              type="text" 
              placeholder="Tìm kiếm với AI..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-100 border-none rounded-[1.5rem] text-sm font-bold shadow-inner focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
          <button className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100 active:scale-90 transition-all">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-10">
        {/* Banner Hero */}
        <div className="relative h-56 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 rounded-[3rem] p-10 flex flex-col justify-center overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="z-10 space-y-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">Mùa mua sắm 2024</span>
            <h1 className="text-3xl font-black text-white leading-tight">CHỢ CỦA TUI<br/><span className="text-blue-200">KHOẢNH KHẮC CHỐT ĐƠN</span></h1>
            <p className="text-blue-100 text-xs font-medium max-w-[200px]">Nền tảng rao vặt ứng dụng AI đầu tiên tại Việt Nam.</p>
          </div>
          <div className="absolute bottom-6 right-10 flex gap-2">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20"><Sparkles className="text-white" size={20} /></div>
          </div>
        </div>

        {/* Categories Horizontal */}
        <section className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full" /> Danh mục nổi bật
          </h2>
          <div className="flex overflow-x-auto gap-4 no-scrollbar -mx-6 px-6 py-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.label)}
                className={`group flex flex-col items-center gap-3 transition-all ${activeCategory === cat.label ? 'scale-110' : ''}`}
              >
                <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-2xl shadow-lg transition-all border-2 ${
                  activeCategory === cat.label 
                  ? 'bg-blue-600 border-blue-200 shadow-blue-100' 
                  : 'bg-white border-slate-50 group-hover:border-blue-100 shadow-slate-100'
                }`}>
                  {cat.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-tighter ${activeCategory === cat.label ? 'text-blue-600' : 'text-slate-400'}`}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Bento Listings Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
               <Flame size={18} className="text-orange-500 animate-bounce" /> Tin đăng mới nhất
             </h2>
             <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1">
               Xem tất cả <ChevronDown size={14} className="-rotate-90" />
             </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-6">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] animate-pulse" />
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {listings.map((item, idx) => (
                <div key={item.id} className={idx === 0 ? 'sm:col-span-2' : ''}>
                   <ListingCard listing={item} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Nút Đăng Tin AI Nổi - Đặc trưng của dự án */}
      <button 
        onClick={() => window.location.hash = '#/post'}
        className="fixed bottom-28 right-6 bg-slate-900 text-white p-5 rounded-[2rem] shadow-2xl flex items-center gap-3 active:scale-90 transition-all z-50 group"
      >
        <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
          <Sparkles size={20} />
        </div>
        <span className="font-black text-xs uppercase tracking-widest pr-2">Đăng tin nhanh</span>
      </button>
    </div>
  );
};

export default Home;
