import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  constructor(public readonly cartService: CartService) {}

  updateQuantity(productId: string, event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const quantity = parseInt(inputElement.value, 10);

  if (!isNaN(quantity) && quantity > 0) {
    this.cartService.updateItem(productId, quantity).subscribe();
  }
}

removeItem(productId: string): void {
  this.cartService.removeItem(productId).subscribe();
}

}
