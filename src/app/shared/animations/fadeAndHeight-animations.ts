import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

// Contact-me-form: inputs
export const fadeInDownToUp_height = trigger('fadeInDownToUp_height', [
  state(
    'hide',
    style({
      opacity: 0,
      visibility: 'hidden',
      height: '0px',
    })
  ),
  state(
    'show',
    style({
      opacity: 1,
      visibility: 'visible',
      height: '*',
    })
  ),
  transition('hide <=> show', [animate('300ms ease-out')]),
]);
