
export const CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: '🛍️' },
  { id: 'tech', label: 'Điện tử', icon: '📱' },
  { id: 'moto', label: 'Xe cộ', icon: '🏍️' },
  { id: 'home', label: 'Gia dụng', icon: '🏠' },
  { id: 'fashion', label: 'Thời trang', icon: '👕' },
  { id: 'pet', label: 'Thú cưng', icon: '🐶' },
  { id: 'baby', label: 'Mẹ & Bé', icon: '👶' },
];

export const MOCK_LISTINGS = Array.from({ length: 20 }).map((_, i) => ({
  id: `${i + 1}`,
  title: [
    'iPhone 15 Pro Max 256GB VN/A',
    'Honda SH 150i ABS 2023',
    'MacBook Air M2 13 inch 8/256',
    'Bàn làm việc gỗ sồi tự nhiên',
    'Váy lụa thiết kế cao cấp',
    'Poodle nâu đỏ 2 tháng tuổi',
    'Xe đẩy em bé Combi Nhật Bản',
  ][i % 7] + (i > 7 ? ` - Mẫu ${i}` : ''),
  price: [25000000, 95000000, 21000000, 1500000, 450000, 3500000, 2200000][i % 7],
  category: ['tech', 'moto', 'tech', 'home', 'fashion', 'pet', 'baby'][i % 7],
  condition: i % 3 === 0 ? 'Mới 100%' : 'Đã sử dụng',
  images: [`https://picsum.photos/seed/item${i}/600/600`],
  tags: { urgent: i % 5 === 0, cheap: i % 4 === 0 },
  seller: {
    id: `u${i}`,
    name: ['Minh Quân', 'Thu Thảo', 'Hoàng Nam', 'Bích Phượng'][i % 4],
    verified: i % 2 === 0,
    trustScore: 85 + (i % 15),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  },
  createdAt: new Date(Date.now() - i * 3600000).toISOString(),
  description: 'Sản phẩm chính hãng, đầy đủ giấy tờ bảo hành. Cần pass lại cho người có nhu cầu thực sự. Giá có thể thương lượng nhẹ cho người thiện chí.'
}));

export const MOCK_CHATS = [
  { id: 'c1', listingId: '1', listingTitle: 'iPhone 15 Pro Max', lastMessage: 'Máy còn fix không bạn?', updatedAt: '10 phút trước', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
  { id: 'c2', listingId: '2', listingTitle: 'Honda SH 150i', lastMessage: 'Sáng mai mình qua xem xe nhé', updatedAt: '1 giờ trước', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
];
