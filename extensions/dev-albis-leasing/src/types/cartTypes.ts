export type ShoppingCartItem = {
  discounted_price: number;
  final_price: number;
  handle: string;
  id: number;
  image: string;
  key: string;
  line_price: number;
  product_id: number;
  product_title: string;
  quantity: number;
  title: string;
  url: string;
  variant_id: number;
};

export type ShoppingCart = {
  token: string;
  currency: string;
  item_count: number;
  total_price: number;
  items: Array<ShoppingCartItem>;
};
