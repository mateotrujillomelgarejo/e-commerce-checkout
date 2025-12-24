import { Injectable } from '@angular/core';

const CART_ID_KEY = 'ps_cart_id';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  
  constructor() {}

  public saveCartId(cartId: string): void {
    localStorage.setItem(CART_ID_KEY, cartId);
  }

  public getCartId(): string | null {
    return localStorage.getItem(CART_ID_KEY);
  }

  public clearCartId(): void {
    localStorage.removeItem(CART_ID_KEY);
  }
}
