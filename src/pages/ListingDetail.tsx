
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';
import { MOCK_LISTINGS } from '../data/demo';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = MOCK_LISTINGS.find(l => l.id === id);

  if (!item) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ position: 'relative' }}>
        <img src={item.images[0]} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 40, left: 20, right: 20, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => navigate(-1)} className="glass" style={{ width: 44, height: 44, borderRadius: 14, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={24} />
          </button>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="glass" style={{ width: 44, height: 44, borderRadius: 14, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Share2 size={20} />
            </button>
            <button className="glass" style={{ width: 44, height: 44, borderRadius: 14, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px', background: 'white', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', marginTop: '-32px', position: 'relative', boxShadow: '0 -10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 900, lineHeight: 1.3 }}>{item.title}</h1>
            <p style={{ margin: '8px 0 0 0', fontSize: '26px', fontWeight: 900, color: '#0066FF' }}>{item.price.toLocaleString('vi-VN')} đ</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: '24px' }}>
          <div style={{ background: '#F0F2F5', padding: '10px 16px', borderRadius: '14px', flex: 1 }}>
            <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#8E8E93', textTransform: 'uppercase' }}>Tình trạng</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: 700 }}>{item.condition}</p>
          </div>
          <div style={{ background: '#F0F2F5', padding: '10px 16px', borderRadius: '14px', flex: 1 }}>
            <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#8E8E93', textTransform: 'uppercase' }}>Khu vực</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: 700 }}>TP. Hồ Chí Minh</p>
          </div>
        </div>

        <div style={{ background: '#F8F9FB', padding: '20px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: '24px' }}>
          <img src={item.seller.avatar} style={{ width: 56, height: 56, borderRadius: 20 }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>{item.seller.name}</h4>
              {item.seller.verified && <ShieldCheck size={16} color="#0066FF" />}
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#8E8E93' }}>Điểm uy tín: <span style={{ color: '#24A148', fontWeight: 800 }}>{item.seller.trustScore}/100</span></p>
          </div>
          <button style={{ background: 'white', border: '1px solid #E0E0E0', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 800 }}>Xem shop</button>
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '12px' }}>Mô tả sản phẩm</h3>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#525252', whiteSpace: 'pre-wrap' }}>{item.description}</p>
      </div>

      <div className="glass" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '20px 24px', borderTop: '1px solid #F0F2F5', display: 'flex', gap: 12 }}>
        <button className="glass" style={{ border: '1px solid #E0E0E0', width: 60, height: 60, borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={24} />
        </button>
        <button 
          onClick={() => navigate(`/chat/new`)}
          className="ai-glow-button" 
          style={{ flex: 1, borderRadius: '18px', gap: 12 }}
        >
          <MessageSquare size={22} />
          <span>Chat với người bán</span>
        </button>
      </div>
    </div>
  );
};

export default ListingDetail;
