import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoDto } from '../models/product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/api/productos'; // Using relative URL for proxy

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(this.apiUrl);
  }
}
