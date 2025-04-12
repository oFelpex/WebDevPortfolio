import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

// Home: Intro-section
export const getDownToUp_getUptoDown_introSection = trigger(
  'getDownToUp_getUptoDown_introSection',
  [
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
  ]
);

// Home: Intro-section
export const getUp_return = trigger('getUp_return', [
  state(
    'getUp',
    style({
      transform: 'translateY(-250px)',
    })
  ),
  state(
    'return',
    style({
      transform: 'translateY(0px)',
    })
  ),
  transition('return <=> getUp', animate('300ms ease-in-out')),
]);
