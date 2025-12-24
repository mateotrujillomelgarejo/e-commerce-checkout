export interface GuestCheckoutDto {
  fullname: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  postal?: string;
  notes?: string;
}

export interface CheckoutRequestDto {
  cartId: string;
  guestInfo: GuestCheckoutDto;
  paymentMethod: string;
}
