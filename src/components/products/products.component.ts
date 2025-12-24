import { ChangeDetectionStrategy, Component, signal, WritableSignal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductoDto } from '../../models/product.dto';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  products = signal<ProductoDto[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loading.set(true);

    this.productService.getProducts().pipe(
      catchError(() => {
        this.error.set('Could not fetch products.');
        this.loading.set(false);
        return of([]);
      })
    ).subscribe(products => {
      console.log(products);
      this.products.set(products);
      this.loading.set(false);
    });
  }

  addToCart(productId: string): void {
    this.cartService.addItem(productId).subscribe();
  }
}
