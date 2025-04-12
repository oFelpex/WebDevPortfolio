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
export const fadeInDownToUp_fadeOutUpToDown_enter = trigger(
  'fadeInDownToUp_fadeOutUpToDown_enter',
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

export const fadeInDownToUp_fadeOutUpToDown_state = trigger(
  'fadeInDownToUp_fadeOutUpToDown_state',
  [
    state(
      'hide',
      style({
        opacity: 0,
        visibility: 'hidden',
        transform: 'translateY(200px)',
      })
    ),
    state(
      'show',
      style({
        opacity: 1,
        visibility: 'visible',
        transform: 'translateY(0px)',
      })
    ),
    transition('hide <=> show', animate('300ms ease-in-out')),
  ]
);

/*  OBS: Used with @for(){}
    USED IN:
    About-me: photos cards; 
    Projects: projects cards; */
export const fadeInDownToUp_query = trigger('fadeInDownToUp_query', [
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

/* 
    *Depends of LoadingService*
    USED IN:
    Contact-me: section contact-me-container */
export const fadeInDownToUp_loading = trigger('fadeInDownToUp_loading', [
  state('loading', style({ opacity: 0, transform: 'translateY(100px)' })),
  state(
    'loaded',
    style({
      opacity: 1,
      transform: 'translateY(0px)',
    })
  ),
  transition('loading => loaded', animate('300ms ease-in-out')),
]);

/* 
    *Depends of LoadingService*
    USED IN:
    About-me: first-half, second-half */
export const fadeInUpToDown_loading = trigger('fadeInUpToDown_loading', [
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
