
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { Send, ChevronLeft, Phone, MoreVertical, ShieldCheck, AlertTriangle } from 'lucide-react';

const ChatRoom: React.FC = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatInfo, setChatInfo] = useState<any>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleStatusChange = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  useEffect(() => {
    if (!chatId) return;

    // Fetch chat info
    const fetchChatInfo = async () => {
      try {
        const snap = await getDoc(doc(db, 'chats', chatId));
        if (snap.exists()) setChatInfo(snap.data());
      } catch (err) {
        console.error('Error fetching chat info:', err);
      }
    };
    fetchChatInfo();

    // Listen for messages
    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error('Snapshot error:', error);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !chatId) return;

    const msgText = newMessage;
    setNewMessage('');

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text: msgText,
        senderId: user.uid,
        createdAt: serverTimestamp()
      });

      await updateDoc(doc(db, 'chats', chatId), {
        lastMessage: msgText,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Không thể gửi tin nhắn. Vui lòng kiểm tra kết nối.');
    }
  };

  const renderMessageTime = (date: any) => {
    if (!date) return 'Đang gửi...';
    const jsDate = date?.toDate ? date.toDate() : new Date(date);
    return jsDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 max-w-2xl mx-auto">
      {/* Header */}
      <div className="glass-morphism p-4 flex items-center gap-3 border-b border-slate-200 z-50">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 rounded-xl text-slate-600"><ChevronLeft size={20} /></button>
        <div className="flex-grow flex items-center gap-3 overflow-hidden">
          <div className="relative shrink-0">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chatInfo?.listingId || 'default'}`} 
              className="w-10 h-10 rounded-xl border border-slate-200 object-cover" 
              alt="Listing" 
            />
          </div>
          <div className="overflow-hidden">
            <h1 className="font-black text-sm text-slate-800 truncate leading-none mb-1">{chatInfo?.listingTitle || 'Đang tải...'}</h1>
            <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck size={10} /> Người bán uy tín
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400"><Phone size={20} /></button>
          <button className="p-2 text-slate-400"><MoreVertical size={20} /></button>
        </div>
      </div>

      {isOffline && (
        <div className="bg-amber-500 text-white text-[10px] font-black py-1 px-4 text-center uppercase tracking-widest flex items-center justify-center gap-2">
          <AlertTriangle size={12} /> Bạn đang ngoại tuyến. Tin nhắn sẽ được gửi khi có mạng.
        </div>
      )}

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm shadow-sm relative ${
              msg.senderId === user?.uid 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              <p className="leading-relaxed font-medium">{msg.text}</p>
              <p className={`text-[9px] mt-1.5 font-bold uppercase opacity-60 flex justify-end`}>
                {renderMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Footer / Input */}
      <div className="p-6 bg-white border-t border-slate-100 safe-bottom">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Nhập tin nhắn..." 
            className="flex-grow px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-sm font-medium"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button 
            type="submit" 
            className="p-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100 active:scale-95 transition-all disabled:opacity-50"
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
