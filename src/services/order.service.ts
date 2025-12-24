import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDto } from '../models/order.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = '/api/orders';

  constructor(private readonly http: HttpClient) {}

  getOrder(orderId: string): Observable<OrderDto> {
    return this.http.get<OrderDto>(`${this.apiUrl}/${orderId}`);
  }
}
