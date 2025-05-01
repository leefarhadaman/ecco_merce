export interface Product {
  id: number;
  name: string;
  category: string[];
  price: number;
  image: string;
  description: string;
  specifications: Record<string, string>;
  rating: number;
  quantity?: number;
}

export interface Category {
  name: string;
  subcategories?: Category[];
}

export interface Order {
  id: number;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  items: Product[];
  tracking?: { status: string; date: string }[];
}

export interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}