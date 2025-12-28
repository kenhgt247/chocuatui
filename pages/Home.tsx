
import React, { useState, useEffect } from 'react';
import { Search, Flame, Crown, Sparkles, SlidersHorizontal, PackageOpen } from 'lucide-react';
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
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeCategory]);

  const filtered = listings.filter(l => l.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fade-in px-4 md:px-0 py-6 space-y-8">
      {/* Search Header Mobile */}
      <div className="md:hidden space-y-4">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Chợ Của Tui</h1>
        <div className="flex gap-2">
          <div className="flex-grow relative">
            <input 
              type="text" 
              placeholder="Tìm SH, iPhone, Bàn làm việc..." 
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-sm border border-slate-100 font-medium text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
          <button className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-600 shadow-sm"><SlidersHorizontal size={20} /></button>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 rounded-[2.5rem] p-8 flex flex-col justify-center overflow-hidden shadow-2xl shadow-blue-200">
        <div className="z-10 space-y-2">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">Tin Tức Mới</span>
          <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">ĐĂNG TIN AI<br/>BÁN TRONG 30 GIÂY</h2>
          <p className="text-blue-100 text-xs md:text-sm font-medium opacity-80">Trải nghiệm nền tảng rao vặt ứng dụng AI đầu tiên.</p>
        </div>
        <Sparkles className="absolute right-[-20px] bottom-[-20px] text-white/10 w-48 h-48 rotate-12" />
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-4 no-scrollbar -mx-4 px-4 py-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.label)}
            className={`flex flex-col items-center gap-3 shrink-0 group transition-all ${activeCategory === cat.label ? 'scale-105' : ''}`}
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] flex items-center justify-center text-2xl shadow-sm border-2 transition-all ${
              activeCategory === cat.label 
              ? 'bg-blue-600 border-blue-100 text-white shadow-blue-200' 
              : 'bg-white border-transparent text-slate-400'
            }`}>
              {cat.icon}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-tighter ${activeCategory === cat.label ? 'text-blue-600' : 'text-slate-500'}`}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <Flame className="text-orange-500 animate-pulse" size={18} /> Tin đăng dành cho bạn
          </h3>
          <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase">Mới nhất</div>
        </div>

        {loading ? (
          <div className="bento-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-[4/5] bg-white rounded-[2rem] border border-slate-50 animate-pulse"></div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="bento-grid">
            {filtered.map(item => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <PackageOpen size={64} className="mx-auto text-slate-200" />
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Không tìm thấy sản phẩm phù hợp</p>
          </div>
        )}
      </section>

      {/* Post Button Mobile Floating */}
      <button 
        onClick={() => window.location.hash = '#/post'}
        className="md:hidden fixed bottom-24 right-6 bg-slate-900 text-white px-6 py-4 rounded-[2rem] shadow-2xl flex items-center gap-3 active:scale-95 transition-all z-50 border border-slate-800"
      >
        <Sparkles size={20} className="text-blue-400" />
        <span className="font-black text-[10px] uppercase tracking-widest">Đăng tin nhanh</span>
      </button>
    </div>
  );
};

export default Home;
