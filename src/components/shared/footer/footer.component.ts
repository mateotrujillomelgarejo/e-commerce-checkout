import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="text-center p-6 text-[#7a6a6f] text-xs mt-7">
      Purple Sky &bull; Envíos internacionales · Pedidos con 1 día de anticipación · RUC 10705538978
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}
