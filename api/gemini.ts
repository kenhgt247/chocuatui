
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { task, payload } = req.body;

  try {
    switch (task) {
      case 'smartFill': {
        const { imageData, title } = payload;
        // Fix: Use { parts: [...] } structure for multi-part content turns
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
        // Fix: Access .text as a property directly
        return res.status(200).json(JSON.parse(response.text || '{}'));
      }

      case 'priceInsight': {
        const { price, category, recentPrices } = payload;
        const prompt = `Sản phẩm danh mục "${category}" giá ${price} VNĐ. 
        Giá tham khảo thị trường: ${recentPrices.length > 0 ? recentPrices.join(', ') : 'đang cập nhật'}. 
        Đánh giá giá này là "Rẻ", "Hợp lý" hay "Cao" và giải thích ngắn gọn < 30 từ.
        Trả về JSON: { "rating": "Rẻ" | "Hợp lý" | "Cao", "explanation": "string" }.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });
        // Fix: Access .text as a property directly
        return res.status(200).json(JSON.parse(response.text || '{}'));
      }

      case 'description': {
        const { title, price, category, condition } = payload;
        const prompt = `Viết mô tả rao vặt chuyên nghiệp cho: ${title}, giá ${price}, danh mục ${category}, tình trạng ${condition}. 
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
        // Fix: Access .text as a property directly
        return res.status(200).json({ description: response.text });
      }

      default:
        return res.status(400).json({ error: 'Invalid task' });
    }
  } catch (error: any) {
    console.error('Gemini Error:', error);
    return res.status(500).json({ error: 'AI đang bận, vui lòng thử lại sau.' });
  }
}
