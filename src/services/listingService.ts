
import { db, storage } from '../firebase/config';
import { collection, doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export const createListingWithPackage = async (userId: string, sellerName: string, data: any) => {
  const batch = writeBatch(db);
  const listingRef = doc(collection(db, 'listings'));
  
  // 1. Upload ảnh trước (đơn giản hóa bằng base64 string từ previews)
  const imageUrls = [];
  for (let i = 0; i < data.previews.length; i++) {
    const storageRef = ref(storage, `listings/${userId}/${listingRef.id}_${i}.jpg`);
    await uploadString(storageRef, data.previews[i], 'data_url');
    const url = await getDownloadURL(storageRef);
    imageUrls.push(url);
  }

  // 2. Tạo đối tượng tin đăng
  const listingData = {
    title: data.title,
    description: data.description,
    price: Number(data.price),
    category: data.category,
    condition: data.condition,
    images: imageUrls,
    sellerId: userId,
    sellerName: sellerName,
    sellerVerified: data.isVerified || false,
    tags: data.tags,
    status: 'active',
    stats: { views: 0, saves: 0 },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  batch.set(listingRef, listingData);

  // 3. Nếu có mua gói (Urgent/Cheap), tạo invoice
  if (data.tags.urgent || data.tags.cheap) {
    const invoiceRef = doc(collection(db, 'invoices'));
    batch.set(invoiceRef, {
      listingId: listingRef.id,
      sellerId: userId,
      type: data.tags.urgent ? 'urgent' : 'cheap',
      amount: data.tags.urgent ? 50000 : 20000,
      status: 'paid', // Giả định thanh toán thành công
      createdAt: serverTimestamp()
    });
  }

  await batch.commit();
  return listingRef.id;
};
