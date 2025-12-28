
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin, Crown } from 'lucide-react';

const ListingCard: React.FC<{ listing: any }> = ({ listing }) => {
  const price = new Intl.NumberFormat('vi-VN').format(listing.price);
  
  return (
    <Link to={`/listing/${listing.id}`} className="group">
      <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative">
        {/* Media */}
        <div className="aspect-square relative overflow-hidden bg-slate-100">
          <img 
            src={listing.images?.[0] || 'https://picsum.photos/400/400'} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            loading="lazy"
            alt={listing.title}
          />
          {listing.tags?.urgent && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-widest">
              <Crown size={10} /> Tin khẩn
            </div>
          )}
          <button className="absolute top-3 right-3 p-2.5 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:text-red-500 transition-all">
            <Heart size={18} fill={listing.isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-grow space-y-2">
          <h4 className="font-bold text-sm text-slate-800 line-clamp-2 leading-snug min-h-[40px]">
            {listing.title}
          </h4>
          <p className="text-blue-600 font-black text-lg tracking-tight">
            {price} đ
          </p>
          
          <div className="pt-3 border-t border-slate-50 mt-auto flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <div className="w-5 h-5 rounded-full bg-slate-100 flex-shrink-0">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${listing.sellerId}`} alt="avatar" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 truncate">{listing.sellerName || 'Người bán'}</span>
              {listing.sellerVerified && <ShieldCheck size={12} className="text-blue-500" />}
            </div>
            <div className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
              <MapPin size={10} /> HCM
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
