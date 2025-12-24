import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-payment',
  template: `
    <div class="text-center p-10 bg-white rounded-lg shadow-md">
      @if (error()) {
        <h2 class="text-xl font-semibold text-red-600">Error en el pago</h2>
        <p class="text-gray-600 mt-2">{{ error() }}</p>
      } @else {
        <h2 class="text-xl font-semibold text-[#ff6b9a]">Procesando tu pago...</h2>
        <p class="text-gray-600 mt-2">Serás redirigido a la pasarela de pago en unos momentos.</p>
      }
    </div>
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnInit {
  orderId = input.required<string>();
  error = signal<string | null>(null);

  // FIX: Use constructor injection as inject() is not resolving types correctly.
  constructor(private readonly paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.initiatePayment(this.orderId()).pipe(
      catchError(err => {
        console.error('Payment initiation failed', err);
        this.error.set('No se pudo iniciar el proceso de pago. Por favor, contacta a soporte.');
        return of(null);
      })
    ).subscribe(response => {
      if (response && response.paymentUrl) {
        window.location.href = response.paymentUrl;
      }
    });
  }
}
