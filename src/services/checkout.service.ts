import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckoutRequestDto } from '../models/checkout.dto';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = '/api/checkout/guest';

  constructor(private readonly http: HttpClient) {}

  guestCheckout(checkoutData: CheckoutRequestDto): Observable<{ orderId: string }> {
    return this.http.post<{ orderId: string }>(this.apiUrl, checkoutData);
  }
}
