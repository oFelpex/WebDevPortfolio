import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

// Home: Intro-section
export const getDownToUp_getUptoDown = trigger('getDownToUp_getUptoDown', [
  state(
    'getUp',
    style({
      transform: 'translateY(50px)',
    })
  ),
  state(
    'getDown',
    style({
      transform: 'translateY(100px)',
    })
  ),
  transition('getDown <=> getUp', animate('300ms ease-in-out')),
]);
