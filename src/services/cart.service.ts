import { Injectable, signal, computed, WritableSignal, Signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CartDto } from '../models/cart.dto';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = '/api/cart';

  private readonly cartState: WritableSignal<CartDto | null> = signal(null);
  public readonly cart: Signal<CartDto | null> = this.cartState.asReadonly();
  public readonly cartCount = computed(() => this.cart()?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0);
  public readonly loading: WritableSignal<boolean> = signal(false);
  public readonly error: WritableSignal<string | null> = signal(null);

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService
  ) {
    this.loadInitialCart();
    effect(() => {
        const currentCart = this.cart();
        if (currentCart) {
            this.storageService.saveCartId(currentCart.id);
        }
    });
  }
  
  private getCartId(): string | null {
    return this.storageService.getCartId();
  }

  loadInitialCart(): void {
    const cartId = this.getCartId();
    if (cartId) {
      this.loading.set(true);
      // API FIX: Backend expects cartId as a query parameter
      this.http.get<CartDto>(`${this.apiUrl}?cartId=${cartId}`).pipe(
        tap(cart => {
          this.cartState.set(cart);
          this.loading.set(false);
        }),
        catchError(err => {
          this.error.set('Failed to load cart.');
          this.storageService.clearCartId();
          this.loading.set(false);
          return of(null);
        })
      ).subscribe();
    }
  }

  addItem(productId: string, quantity: number = 1): Observable<CartDto> {
  this.loading.set(true);

  const payload = {
    cartId: this.getCartId(),
    productId,
    quantity
  };

  return this.http.post<CartDto>(`${this.apiUrl}/items`, payload).pipe(
    tap(cart => {
      this.cartState.set(cart);
      this.loading.set(false);
    })
  );
}

updateItem(productId: string, quantity: number): Observable<CartDto> {
  this.loading.set(true);

  const payload = {
    cartId: this.getCartId(),
    quantity
  };

  return this.http.put<CartDto>(
    `${this.apiUrl}/items/${productId}`,
    payload
  ).pipe(
    tap(cart => {
      this.cartState.set(cart);
      this.loading.set(false);
    })
  );
}

removeItem(productId: string): Observable<CartDto> {
  this.loading.set(true);

  const cartId = this.getCartId();

  return this.http.delete<CartDto>(
    `${this.apiUrl}/items/${productId}?cartId=${cartId}`
  ).pipe(
    tap(cart => {
      this.cartState.set(cart);
      this.loading.set(false);
    })
  );
}


  clearCart(): void {
    this.cartState.set(null);
    this.storageService.clearCartId();
  }
}
