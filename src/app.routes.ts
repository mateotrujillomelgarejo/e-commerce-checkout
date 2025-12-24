import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'payment/:orderId',
    loadComponent: () => import('./components/payment/payment.component').then(m => m.PaymentComponent)
  },
  {
    path: 'payment-result',
    loadComponent: () => import('./components/payment-result/payment-result.component').then(m => m.PaymentResultComponent)
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
