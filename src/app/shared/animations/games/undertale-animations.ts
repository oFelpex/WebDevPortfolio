import { animate, style, transition, trigger } from '@angular/animations';

export const undertaleOpenFromCenter = trigger('undertaleOpenFromCenter', [
  transition(':enter', [
    style({ clipPath: 'inset(0 50% 0 50%)' }),
    animate('1200ms', style({ clipPath: 'inset(0 0 0 0)' })),
  ]),
]);
