
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, Camera, Check } from 'lucide-react';

const PostWizard = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  // @google/genai Fix: Added missing 'const' keyword to variable declaration
  const navigate = useNavigate();

  // Form mock
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const handleAISmartFill = () => {
    setLoading(true);
    setTimeout(() => {
      setTitle('iPhone 15 Pro Max 256GB - Blue Titanium');
      setLoading(false);
    }, 1200);
  };

  const handleAIDesc = () => {
    setLoading(true);
    setTimeout(() => {
      setDesc('✨ GIỚI THIỆU: Máy xách tay trực tiếp, nguyên zin.\n✨ THÔNG SỐ: Pin 100%, ngoại hình 99%.\n✨ CAM KẾT: Bảo hành trách nhiệm 1 tháng.\n✨ CTA: Liên hệ ngay để ép giá!');
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ padding: '24px', paddingBottom: '120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} style={{ border: 'none', background: 'none' }}>
          <ArrowLeft size={24} />
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ 
              width: 32, height: 6, borderRadius: 4, 
              background: step >= s ? '#0066FF' : '#E0E0E0',
              transition: 'all 0.3s'
            }} />
          ))}
        </div>
        <div style={{ width: 24 }} />
      </div>

      {step === 1 && (
        <div className="fade-in">
          <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>Hình ảnh & Tiêu đề</h2>
          <p style={{ color: '#8E8E93', fontSize: '14px', marginBottom: '24px' }}>Tải ảnh lên để AI giúp bạn điền tin nhanh hơn.</p>
          
          {/* Fix: Changed 'flex_direction' to 'flexDirection' as per React style guidelines */}
          <div style={{ width: '100%', aspectRatio: '1/1', background: '#F0F2F5', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#0066FF', border: '2px dashed #0066FF' }}>
            <Camera size={48} />
            <span style={{ fontWeight: 700, marginTop: '12px' }}>Thêm 1-10 ảnh</span>
          </div>

          <button onClick={handleAISmartFill} disabled={loading} className="ai-glow-button" style={{ width: '100%', marginTop: '24px' }}>
            <Sparkles size={18} />
            {loading ? 'Đang phân tích...' : '✨ AI Smart-Fill từ ảnh'}
          </button>

          <div style={{ marginTop: '24px' }}>
            <label style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#8E8E93' }}>Tiêu đề tin</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: iPhone 15 Pro Max 256GB..." 
              style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E0E0E0', marginTop: '8px', fontSize: '15px', fontWeight: 600 }}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="fade-in">
          <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>Chi tiết tin</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: 800, color: '#8E8E93' }}>GIÁ BÁN (Đ)</label>
            <input 
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0 đ" 
              style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E0E0E0', marginTop: '8px', fontSize: '18px', fontWeight: 900, color: '#0066FF' }}
            />
            <div style={{ marginTop: '8px', display: 'flex', gap: 8 }}>
              <span className="badge-cheap">Giá hợp lý</span>
              <span style={{ fontSize: '11px', color: '#8E8E93' }}>So với 50 tin cùng loại</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '12px', fontWeight: 800, color: '#8E8E93' }}>MÔ TẢ</label>
              <button onClick={handleAIDesc} style={{ border: 'none', background: 'none', color: '#8A3FFC', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>✨ AI Gợi ý mô tả</button>
            </div>
            <textarea 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Viết vài dòng về sản phẩm..." 
              style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E0E0E0', marginTop: '8px', fontSize: '14px', height: '150px', outline: 'none' }}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="fade-in">
          <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>Đặc quyền tin đăng</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: '20px', borderRadius: '24px', border: '2px solid #0066FF', background: '#EBF3FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 800, color: '#0066FF' }}>⚡ Tin Khẩn Cấp (Urgent)</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#525252' }}>Tiếp cận gấp 5 lần người mua bình thường.</p>
              </div>
              <Check color="#0066FF" />
            </div>
            <div style={{ padding: '20px', borderRadius: '24px', border: '2px solid #F0F2F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 800 }}>🏷️ Badge Rẻ Vô Địch</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#8E8E93' }}>Thêm nhãn đỏ nổi bật thu hút lượt click.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="glass" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '20px', borderTop: '1px solid #F0F2F5' }}>
        <button 
          onClick={() => step < 3 ? setStep(step + 1) : navigate('/')}
          className="ai-glow-button" 
          style={{ width: '100%', borderRadius: '18px' }}
        >
          {step === 3 ? 'Hoàn tất & Đăng tin' : 'Tiếp theo'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PostWizard;
