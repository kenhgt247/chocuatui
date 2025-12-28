import { GoogleGenAI } from "@google/genai";

/**
 * AI Service for Chợ Của Tui
 * Uses Gemini 3 Flash for super-fast analysis and low latency.
 */

const getAIInstance = () => {
  return new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
};

export const aiSmartFill = async (imageData: string, title?: string) => {
  try {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: imageData.split(',')[1], mimeType: 'image/jpeg' } },
          { text: `Phân tích ảnh sản phẩm này${title ? ` (Tiêu đề: ${title})` : ''}. 
          Trả về JSON chuẩn: { 
            "category": "string (chọn từ: Điện tử, Xe cộ, Bất động sản, Thời trang, Đồ gia dụng, Thú cưng, Mẹ & Bé)", 
            "condition": "string (Mới 100% | Mới 99% | Đã sử dụng)", 
            "brand": "string", 
            "model": "string", 
            "suggestTitle": "string (viết hoa chữ cái đầu, hấp dẫn)", 
            "keywords": ["string"] 
          }` }
        ]
      },
      config: { responseMimeType: "application/json" }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error('AI SmartFill Error:', error);
    throw error;
  }
};

export const aiPriceInsight = async (price: number, category: string, recentPrices: number[]) => {
  try {
    const ai = getAIInstance();
    const prompt = `Sản phẩm danh mục "${category}" giá ${price} VNĐ. 
    Giá tham khảo thị trường: ${recentPrices.length > 0 ? recentPrices.join(', ') : 'đang cập nhật'}. 
    Đánh giá giá này là "Rẻ", "Hợp lý" hay "Cao" và giải thích ngắn gọn < 30 từ.
    Trả về JSON: { "rating": "Rẻ" | "Hợp lý" | "Cao", "explanation": "string" }.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error('AI PriceInsight Error:', error);
    throw error;
  }
};

export const aiDescriptionAssistant = async (data: { title: string, price: number, category: string, condition: string }) => {
  try {
    const ai = getAIInstance();
    const prompt = `Viết mô tả rao vặt chuyên nghiệp cho: ${data.title}, giá ${data.price}, danh mục ${data.category}, tình trạng ${data.condition}. 
    Cấu trúc: 
    - Giới thiệu ngắn gọn.
    - Thông số kỹ thuật/Chi tiết.
    - Cam kết chất lượng & Bảo hành.
    - Lời mời gọi mua hàng (CTA).
    Dùng icon phù hợp. Trả về text thuần.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });

    return { description: response.text };
  } catch (error) {
    console.error('AI Description Error:', error);
    throw error;
  }
};