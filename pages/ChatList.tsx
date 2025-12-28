
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, MessageCircle } from 'lucide-react';
import { MOCK_CHATS } from '../data/demo';

const ChatList: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="sticky top-0 bg-white p-6 border-b border-slate-100 flex items-center justify-between z-40">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Trò chuyện</h1>
        <button className="p-2.5 bg-slate-50 rounded-2xl text-slate-400"><Search size={20} /></button>
      </div>

      <div className="p-6 space-y-4">
        {MOCK_CHATS.map(chat => (
          <Link 
            key={chat.id} 
            to={`/chat/${chat.id}`}
            className="flex items-center gap-5 bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          >
            <div className="relative shrink-0">
              <img src={chat.avatar} className="w-16 h-16 rounded-[1.8rem] object-cover border-2 border-slate-50" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-black text-sm text-slate-800 truncate leading-none">{chat.listingTitle}</h3>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{chat.updatedAt}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate">{chat.lastMessage}</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl text-slate-300">
              <ChevronRight size={18} />
            </div>
          </Link>
        ))}
        {MOCK_CHATS.length === 0 && (
          <div className="text-center py-20">
             <MessageCircle size={48} className="mx-auto text-slate-200 mb-4" />
             <p className="text-slate-400 font-bold">Chưa có cuộc hội thoại nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
