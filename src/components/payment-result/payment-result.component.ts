import { ChangeDetectionStrategy, Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderDto } from '../../models/order.dto';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentResultComponent implements OnInit {
  orderId = input<string>();

  order: WritableSignal<OrderDto | null> = signal(null);
  loading: WritableSignal<boolean> = signal(true);
  error: WritableSignal<string | null> = signal(null);

  // FIX: Use constructor injection as inject() is not resolving types correctly.
  constructor(private readonly orderService: OrderService) {}

  ngOnInit(): void {
    const orderId = this.orderId();
    if (orderId) {
      this.orderService.getOrder(orderId).pipe(
        catchError(err => {
          this.error.set('No pudimos encontrar los detalles de tu orden.');
          return of(null);
        })
      ).subscribe(data => {
        this.order.set(data);
        this.loading.set(false);
      });
    } else {
      this.error.set('No se proporcionó un ID de orden válido.');
      this.loading.set(false);
    }
  }
}
