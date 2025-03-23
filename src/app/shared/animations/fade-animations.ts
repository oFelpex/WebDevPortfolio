import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

// Home: navigation-cards
export const fadeInDownToUp_fadeOutUpToDown = trigger(
  'fadeInDownToUp_fadeOutUpToDown',
  [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(100px)' }),
      animate(
        '300ms ease-in-out',
        style({ opacity: 1, transform: 'translateY(0px)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '300ms ease-in-out',
        style({ opacity: 0, transform: 'translateY(100px)' })
      ),
    ]),
  ]
);

// About-me: first-half, second-half
export const fadeInUpToDown = trigger('fadeInUpToDown', [
  state('loading', style({ opacity: 0, transform: 'translateY(-100px)' })),
  state(
    'loaded',
    style({
      opacity: 1,
      transform: 'translateY(0px)',
    })
  ),
  transition('loading => loaded', animate('300ms ease-in-out')),
]);

/*  OBS: Used with @for(){}
    About-me: photos cards; 
    Projects: projects cards; */
export const fadeInDownToUp = trigger('fadeInDownToUp', [
  transition(':enter', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(100px)' }),
        stagger(100, [
          animate(
            '200ms ease-out',
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
