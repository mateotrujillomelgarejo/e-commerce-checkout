export interface PaymentInitResponseDto {
  paymentUrl: string;
  orderId: string; // Assuming backend sends orderId for reference
}
