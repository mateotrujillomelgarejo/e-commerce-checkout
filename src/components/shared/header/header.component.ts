import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  public readonly isProductsPage = signal(false);
  private readonly destroy$ = new Subject<void>();
  
  constructor(
    public readonly cartService: CartService,
    private readonly router: Router
  ) {
    this.isProductsPage.set(this.router.url.includes('/products'));
    
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: NavigationEnd) => {
        this.isProductsPage.set(event.urlAfterRedirects.includes('/products'));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
