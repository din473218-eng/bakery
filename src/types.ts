export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  category: 'tiramisu' | 'cakes' | 'cupcakes' | 'cookies' | 'desserts' | 'combos' | 'seasonal';
  image: string;
  rating: number;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'packaging' | 'delivering' | 'delivered';
  customerName: string;
  customerPhone: string;
  address: string;
  couponUsed?: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'chef';
  text: string;
  timestamp: string;
}
