
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronRight, ChevronLeft, CheckCircle2, Upload, Loader2, DollarSign, Crown, Zap, Sparkles, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { aiSmartFill, aiPriceInsight, aiDescriptionAssistant } from '../services/aiService';
import { createListingWithPackage } from '../services/listingService';
import { CATEGORIES } from '../data/demo';

const PostWizard: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]?.label || 'Điện tử');
  const [condition, setCondition] = useState('Mới 100%');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState({ urgent: false, cheap: false });
  const [priceInsight, setPriceInsight] = useState<{rating: string, explanation: string} | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const runSmartFill = async () => {
    if (previews.length === 0) return alert("Cần ảnh để AI phân tích!");
    setAiLoading(true);
    try {
      const res = await aiSmartFill(previews[0], title);
      if (res.suggestTitle) setTitle(res.suggestTitle);
      if (res.category) setCategory(res.category);
      if (res.condition) setCondition(res.condition);
    } catch (err) {
      alert("AI đang bận, bạn vui lòng tự điền nhé.");
    } finally {
      setAiLoading(false);
    }
  };

  const handlePriceBlur = async () => {
    if (!price || !category) return;
    try {
      const res = await aiPriceInsight(Number(price), category, []);
      setPriceInsight(res);
    } catch (err) {}
  };

  const runAIDescription = async () => {
    if (!title) return alert("Nhập tiêu đề trước nhé!");
    setAiLoading(true);
    try {
      const res = await aiDescriptionAssistant({ title, price: Number(price), category, condition });
      setDescription(res.description);
    } catch (err) {
      alert("Không thể tạo mô tả lúc này.");
    } finally {
      setAiLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!user || !profile) return;
    setLoading(true);
    try {
      await createListingWithPackage(user.uid, profile.displayName || 'Người bán', {
        title, price, category, condition, description, tags, previews, isVerified: profile.isVerified
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Đăng tin thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 max-w-2xl mx-auto flex flex-col pb-32">
      <div className="h-1.5 bg-slate-200 w-full sticky top-0 z-50">
        <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>

      <div className="p-6 space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-black text-slate-800">Ảnh & Tiêu đề</h1>
              <p className="text-slate-400 text-sm mt-1">AI sẽ giúp bạn điền tin nhanh hơn từ hình ảnh.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {previews.map((src, idx) => (
                <div key={idx} className="aspect-square relative rounded-3xl overflow-hidden shadow-md border-2 border-white">
                  <img src={src} className="w-full h-full object-cover" />
                  <button onClick={() => setPreviews(previews.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white"><X size={14}/></button>
                </div>
              ))}
              <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-blue-200 bg-blue-50/30 rounded-3xl text-blue-600 cursor-pointer active:scale-95 transition-all">
                <Camera size={32} />
                <span className="text-[10px] font-black mt-2 uppercase">Thêm ảnh</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>

            <div className="space-y-4">
              <button 
                onClick={runSmartFill} 
                disabled={aiLoading || previews.length === 0}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 disabled:opacity-50"
              >
                {aiLoading ? <Loader2 className="animate-spin" size={18}/> : <Sparkles size={18}/>}
                ✨ AI PHÂN TÍCH ẢNH & TỰ ĐIỀN
              </button>
              
              <label className="block">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tiêu đề tin đăng</span>
                <input 
                  type="text" 
                  className="mt-2 block w-full px-5 py-4 rounded-2xl bg-white border-slate-100 border shadow-sm focus:border-blue-500 outline-none font-bold" 
                  placeholder="Ví dụ: iPhone 15 Pro Max 256GB..." 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-black text-slate-800">Thông tin chi tiết</h1>
              <p className="text-slate-400 text-sm mt-1">Càng chi tiết, tin của bạn càng uy tín.</p>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Giá bán (VNĐ)</span>
                  <div className="relative mt-2">
                    <input 
                      type="number" 
                      className="block w-full pl-10 pr-4 py-4 rounded-2xl bg-white border-slate-100 border shadow-sm font-black text-blue-600"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      onBlur={handlePriceBlur}
                    />
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  </div>
                </label>
                <div className="flex flex-col justify-end">
                   {priceInsight && (
                     <div className={`p-4 rounded-2xl border text-center font-black text-[10px] uppercase tracking-widest transition-all ${
                       priceInsight.rating === 'Rẻ' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                       priceInsight.rating === 'Cao' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                     }`}>
                        {priceInsight.rating} • {priceInsight.explanation}
                     </div>
                   )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Danh mục</span>
                  <select className="mt-2 block w-full px-5 py-4 rounded-2xl bg-white border-slate-100 border font-bold" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tình trạng</span>
                  <select className="mt-2 block w-full px-5 py-4 rounded-2xl bg-white border-slate-100 border font-bold" value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option>Mới 100%</option><option>Mới 99%</option><option>Đã sử dụng</option>
                  </select>
                </label>
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mô tả</span>
                  <button 
                    onClick={runAIDescription} 
                    disabled={aiLoading}
                    className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 flex items-center gap-1 active:scale-95 transition-all"
                  >
                    {aiLoading ? <Loader2 className="animate-spin" size={10}/> : <Sparkles size={10} />} ✨ AI GỢI Ý MÔ TẢ
                  </button>
                </div>
                <textarea 
                  rows={6}
                  className="block w-full px-5 py-4 rounded-2xl bg-white border-slate-100 border shadow-sm text-sm font-medium focus:border-blue-500 outline-none"
                  placeholder="Mô tả sản phẩm, lý do bán..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
             <div>
              <h1 className="text-3xl font-black text-slate-800">Tăng tốc chốt đơn</h1>
              <p className="text-slate-400 text-sm mt-1">Chọn gói dịch vụ để tin của bạn nổi bật hơn.</p>
            </div>

            <div className="space-y-4">
              <button onClick={() => setTags(prev => ({ ...prev, urgent: !prev.urgent }))} className={`w-full p-6 rounded-[2.5rem] border-2 text-left transition-all ${tags.urgent ? 'border-blue-600 bg-blue-50 shadow-inner' : 'border-white bg-white shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg"><Crown size={24} /></div>
                    <div><p className="font-black text-slate-800 text-sm">Tin Khẩn Cấp (Urgent)</p><p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Ghim đầu trang + Tiếp cận gấp 5 lần</p></div>
                  </div>
                  {tags.urgent && <CheckCircle2 className="text-blue-600" />}
                </div>
              </button>
              <button onClick={() => setTags(prev => ({ ...prev, cheap: !prev.cheap }))} className={`w-full p-6 rounded-[2.5rem] border-2 text-left transition-all ${tags.cheap ? 'border-emerald-500 bg-emerald-50 shadow-inner' : 'border-white bg-white shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500 p-3 rounded-2xl text-white shadow-lg"><Zap size={24} /></div>
                    <div><p className="font-black text-slate-800 text-sm">Gói Rẻ Vô Địch</p><p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Gắn nhãn thu hút lượt click</p></div>
                  </div>
                  {tags.cheap && <CheckCircle2 className="text-emerald-500" />}
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 glass-morphism border-t border-slate-100 flex gap-4 z-50 safe-bottom">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="p-4 rounded-2xl bg-slate-100 text-slate-500 active:scale-95 transition-all"><ChevronLeft /></button>
        )}
        <button 
          onClick={() => {
            if (step === 3) handlePublish();
            else setStep(step + 1);
          }}
          disabled={loading || (step === 1 && (!title || previews.length === 0))}
          className={`flex-grow flex items-center justify-center gap-2 text-white font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-all uppercase tracking-widest text-sm disabled:opacity-50 ${step === 3 ? 'bg-blue-600 shadow-blue-200' : 'bg-slate-800 shadow-slate-200'}`}
        >
          {loading ? <Loader2 className="animate-spin" /> : step === 3 ? <><Upload size={20} /> Đăng tin ngay</> : <>Tiếp tục <ChevronRight size={20} /></>}
        </button>
      </div>
    </div>
  );
};

export default PostWizard;
