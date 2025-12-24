export interface OrderItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderDto {
  id: string;
  status: 'Paid' | 'Cancelled' | 'Pending';
  total: number;
  items: OrderItemDto[];
  createdAt: string;
}
