
# 🚀 Chợ Của Tui - Hệ sinh thái Rao vặt AI Thông minh

Chào mừng bạn đến với dự án **Chợ Của Tui**. Đây là một nền tảng thương mại điện tử C2C hiện đại, tích hợp Trí tuệ nhân tạo (Gemini AI) để tối ưu trải nghiệm người dùng.

---

## 🛠 1. Hướng dẫn Cấu hình Firebase (CỰC KỲ QUAN TRỌNG)

Để ứng dụng hoạt động đầy đủ tính năng (Đăng hình, Lưu tin, Chat), bạn cần thiết lập Firebase như sau:

### A. Authentication
- Truy cập Firebase Console -> Build -> Authentication.
- Bật phương thức: **Email/Password** và **Google**.

### B. Firestore Database (Dữ liệu)
- Tạo Database ở chế độ **Test Mode** (hoặc dùng Rules bên dưới).
- **Cấu trúc Collections:**
  - `users`: `{ uid, email, displayName, photoURL, isVerified, trustScore, createdAt }`
  - `listings`: `{ title, price, category, images[], description, sellerId, sellerName, tags: { urgent, cheap }, status, createdAt }`
  - `chats`: `{ participants[], lastMessage, listingId, listingTitle, updatedAt }`
  - `invoices`: `{ sellerId, amount, type, status, createdAt }`

### C. Firebase Storage (Hình ảnh)
- Bật Storage để lưu trữ ảnh sản phẩm.
- Tạo thư mục `listings/` để quản lý ảnh theo User ID.

---

## 🔒 2. Firebase Rules (Bảo mật)

Hãy copy nội dung này dán vào tab **Rules** của Firestore và Storage:

### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /listings/{listingId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.sellerId == request.auth.uid;
    }
    match /chats/{chatId} {
      allow read, write: if request.auth != null && request.auth.uid in resource.data.participants;
    }
  }
}
```

### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /listings/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🤖 3. Hướng dẫn sử dụng AI (Gemini Flash 3)

Ứng dụng sử dụng model `gemini-3-flash-preview` để thực hiện 3 nhiệm vụ chính:

1.  **Smart-Fill (Phân tích ảnh):** Khi bạn tải ảnh lên ở màn hình Đăng tin, AI sẽ tự động đề xuất Tiêu đề, Danh mục và Tình trạng sản phẩm.
2.  **Price Insight (Định giá):** AI so sánh giá bạn nhập với thị trường để dán nhãn "Rẻ", "Hợp lý" hoặc "Cao".
3.  **AI Description:** Tự động viết mô tả sản phẩm chuyên nghiệp, có emoji và cấu trúc rõ ràng từ các thông tin cơ bản.

---

## 📦 4. Chạy dự án Local

1.  Clone repo.
2.  `npm install`
3.  Tạo file `.env` và điền các biến Firebase (xem `firebase/config.ts`).
4.  Điền `API_KEY` của Gemini vào môi trường Serverless (Vercel/Netlify).
5.  `npm run dev`

---

## 🎨 5. Quy chuẩn Thiết kế (Design Tokens)
- **Primary:** `#0066FF` (Blue) - Đại diện cho sự tin cậy.
- **Accent:** `#8A3FFC` (Purple) - Đại diện cho AI và công nghệ.
- **Radius:** `24px` - Bo tròn hiện đại, thân thiện mobile.
- **Shadow:** Soft shadows cho cảm giác nổi bật (Elevation).
