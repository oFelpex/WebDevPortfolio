import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

/* state animation
   USED IN:
   Home: intro-section */
export const fadeIn_opacity_loading = trigger('fadeIn_opacity_loading', [
  state('loading', style({ opacity: 0 })),
  state('loaded', style({ opacity: 1 })),
  transition('loading => loaded', animate('300ms ease-in-out')),
]);

/* :enter/:leave animation
   USED IN:
   Loading */
export const fadeIn_fadeOut = trigger('fadeIn_fadeOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('300ms ease-in-out', style({ opacity: 0 }))]),
]);
