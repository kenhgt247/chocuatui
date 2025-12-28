
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { MessageCircle, ShieldCheck, Share2, Heart, ChevronLeft, MapPin, Clock, WifiOff } from 'lucide-react';

const ListingDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    
    // Using onSnapshot instead of getDoc for better offline support.
    // onSnapshot will return data from cache immediately if available.
    const unsubscribe = onSnapshot(doc(db, 'listings', id), 
      (snap) => {
        if (snap.exists()) {
          setListing({ id: snap.id, ...snap.data() });
          setLoading(false);
        } else {
          setError('Sản phẩm không tồn tại hoặc đã bị xóa.');
          setLoading(false);
        }
      }, 
      (err: any) => {
        console.error('Error fetching listing:', err);
        // If we are offline and the document is not in cache, Firestore throws an error.
        if (err.code === 'unavailable' || !navigator.onLine) {
          setError('Sản phẩm này chưa được lưu để xem ngoại tuyến. Vui lòng kết nối mạng.');
        } else {
          setError('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại.');
        }
        setLoading(false);
      }
    );
    
    return () => unsubscribe();
  }, [id]);

  const handleChat = async () => {
    if (!user) return navigate('/auth');
    if (!listing) return;
    if (user.uid === listing.sellerId) return alert('Đây là tin đăng của bạn!');

    setLoading(true);
    try {
      const chatsRef = collection(db, 'chats');
      const q = query(chatsRef, 
        where('listingId', '==', id),
        where('participants', 'array-contains', user.uid)
      );
      const querySnapshot = await getDocs(q);
      
      let chatId = '';
      const existingChat = querySnapshot.docs.find(doc => doc.data().participants.includes(listing.sellerId));
      
      if (existingChat) {
        chatId = existingChat.id;
      } else {
        const newChat = await addDoc(collection(db, 'chats'), {
          listingId: id,
          listingTitle: listing.title,
          listingImage: listing.images?.[0] || '',
          participants: [user.uid, listing.sellerId],
          lastMessage: 'Đã bắt đầu trò chuyện',
          updatedAt: serverTimestamp()
        });
        chatId = newChat.id;
      }
      navigate(`/chat/${chatId}`);
    } catch (err: any) {
      console.error('Chat error:', err);
      alert('Không thể bắt đầu chat. Vui lòng thử lại khi có mạng.');
    } finally {
      setLoading(false);
    }
  };

  const renderDate = (date: any) => {
    if (!date) return '';
    const jsDate = date?.toDate ? date.toDate() : new Date(date);
    return jsDate.toLocaleDateString('vi-VN');
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-medium">Đang tải sản phẩm...</p>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 max-w-sm w-full">
        <div className="bg-red-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 text-red-500">
          <WifiOff size={32} />
        </div>
        <p className="text-slate-800 font-black mb-2">Lỗi tải dữ liệu</p>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">{error}</p>
        <div className="space-y-3">
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-blue-600 text-white px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-100 active:scale-95 transition-all"
          >
            Thử lại
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-slate-100 text-slate-600 px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Top Controls */}
      <div className="sticky top-0 z-50 glass-morphism p-4 flex justify-between items-center border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-slate-50 rounded-2xl text-slate-600"><ChevronLeft size={20} /></button>
        <div className="flex gap-2">
          <button className="p-2.5 bg-slate-50 rounded-2xl text-slate-600"><Share2 size={20} /></button>
          <button className="p-2.5 bg-slate-50 rounded-2xl text-slate-600"><Heart size={20} /></button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="w-full aspect-[4/3] bg-slate-100 overflow-x-auto snap-x flex no-scrollbar">
        {listing.images?.map((img: string, idx: number) => (
          <img key={idx} src={img} className="w-full h-full object-cover shrink-0 snap-center" alt={`Ảnh ${idx}`} />
        ))}
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-800 leading-tight">{listing.title}</h1>
          <p className="text-3xl font-black text-blue-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(listing.price)}
          </p>
          <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-500" /> Toàn quốc</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {renderDate(listing.createdAt)}</span>
          </div>
        </div>

        {/* Seller Card */}
        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${listing.sellerId}`} className="w-14 h-14 rounded-2xl border-2 border-white shadow-md object-cover" alt="Seller" />
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow">
                <ShieldCheck size={12} className="text-blue-500" />
              </div>
            </div>
            <div>
              <p className="font-black text-slate-800 flex items-center gap-1.5">
                {listing.sellerName || 'Người bán'} 
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Uy tín: 5/5 ⭐ • Đang online</p>
            </div>
          </div>
          <button className="text-[10px] font-black text-blue-600 border-2 border-blue-100 px-4 py-2 rounded-xl bg-white shadow-sm uppercase tracking-widest">Xem shop</button>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h2 className="font-black text-slate-800 uppercase text-xs tracking-widest border-b border-slate-100 pb-2">Mô tả chi tiết</h2>
          <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
            {listing.description}
          </div>
        </div>

        {/* Specs Table */}
        <div className="bg-slate-50 rounded-2xl p-5 text-sm space-y-3 border border-slate-100">
          <div className="flex justify-between items-center"><span className="text-slate-400 font-bold uppercase text-[10px]">Danh mục</span><span className="font-black text-slate-700">{listing.category}</span></div>
          <div className="flex justify-between items-center"><span className="text-slate-400 font-bold uppercase text-[10px]">Tình trạng</span><span className="font-black text-slate-700">{listing.condition}</span></div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 glass-morphism border-t border-slate-100 flex gap-4 z-50 safe-bottom">
        <button 
          onClick={handleChat}
          className="flex-grow flex items-center justify-center gap-2 bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 active:scale-95 transition-all uppercase text-sm tracking-widest"
        >
          <MessageCircle size={20} />
          Chat ngay
        </button>
        <button className="bg-slate-800 text-white font-black px-8 py-4 rounded-2xl shadow-xl active:scale-95 uppercase text-sm tracking-widest">
          Mua
        </button>
      </div>
    </div>
  );
};

export default ListingDetail;
