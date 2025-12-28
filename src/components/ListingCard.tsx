
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Crown, MapPin } from 'lucide-react';

interface ListingCardProps {
  listing: any;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  return (
    <Link to={`/listing/${listing.id}`} className="block group">
      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full">
        {/* Media Section */}
        <div className="aspect-square relative overflow-hidden bg-slate-50">
          <img 
            src={listing.images?.[0] || 'https://picsum.photos/400/400'} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            alt={listing.title}
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {listing.tags?.urgent && (
              <div className="bg-blue-600 text-white text-[8px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-blue-200 uppercase tracking-widest flex items-center gap-1 animate-pulse">
                <Crown size={10} /> Ưu tiên
              </div>
            )}
          </div>
          
          <button className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:text-red-500 transition-colors">
            <Heart size={18} />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
             <div className="glass-morphism rounded-2xl p-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-[10px] text-white font-black">AI</div>
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-tighter truncate">Đã kiểm duyệt bởi AI</span>
             </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-5 flex flex-col flex-grow space-y-3">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-800 line-clamp-2 leading-tight min-h-[40px]">
              {listing.title}
            </h3>
            <p className="text-blue-600 font-black text-lg tracking-tight">
              {formatPrice(listing.price)}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-50 mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-6 h-6 rounded-full bg-slate-100 shrink-0">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${listing.sellerId}`} alt="avatar" />
              </div>
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-[10px] font-bold text-slate-500 truncate">{listing.sellerName || 'Người bán'}</span>
                {listing.sellerVerified && <ShieldCheck size={12} className="text-blue-500" />}
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
              <MapPin size={10} /> HCM
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
