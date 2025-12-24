import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { CheckoutRequestDto } from '../../models/checkout.dto';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  loading: WritableSignal<boolean> = signal(false);
  error: WritableSignal<string | null> = signal(null);

  constructor(
    public readonly cartService: CartService,
    private readonly checkoutService: CheckoutService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['Perú', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postal: [''],
      notes: [''],
      paymentMethod: ['card', Validators.required]
    });
  }

  submitCheckout(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    const cartId = this.cartService.cart()?.id;
    if (!cartId) {
        this.error.set("No se encontró un carrito activo.");
        return;
    }

    this.loading.set(true);
    this.error.set(null);

    const request: CheckoutRequestDto = {
        cartId: cartId,
        guestInfo: this.checkoutForm.value,
        paymentMethod: this.checkoutForm.value.paymentMethod
    };
    
    this.checkoutService.guestCheckout(request).pipe(
        catchError(err => {
            this.error.set('Hubo un error al procesar tu orden. Por favor, intenta de nuevo.');
            this.loading.set(false);
            return of(null);
        })
    ).subscribe((response: { orderId: string } | null) => {
        if (response) {
            this.cartService.clearCart();
            this.router.navigate(['/payment', response.orderId]);
        }
        this.loading.set(false);
    });
  }
}
