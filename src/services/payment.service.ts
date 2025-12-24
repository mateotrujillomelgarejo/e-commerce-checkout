import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentInitResponseDto } from '../models/payment.dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = '/api/payments/init';

  constructor(private readonly http: HttpClient) {}

  initiatePayment(orderId: string): Observable<PaymentInitResponseDto> {
    return this.http.post<PaymentInitResponseDto>(this.apiUrl, { orderId });
  }
}
