export interface CartItemDto {
  id: string;
  productId: string;
  quantity: number;
}

export interface CartDto {
  id: string; // This is the cartId
  items: CartItemDto[];
}
