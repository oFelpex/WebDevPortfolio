import { Type } from '@angular/core';

export interface UndertaleHomeVariation {
  id: string;
  component: () => Promise<Type<any>>;
}

export const undertaleHomeVariations: UndertaleHomeVariation[] = [
  {
    id: 'ruins-flowey',
    component: () =>
      import('../variations/ruins-flowey/ruins-flowey.component').then(
        (m) => m.RuinsFloweyComponent,
      ),
  },
  {
    id: 'snowdin-toriel',
    component: () =>
      import('../variations/snowdin-toriel/snowdin-toriel.component').then(
        (m) => m.SnowdinTorielComponent,
      ),
  },
  {
    id: 'waterfall-papyrus',
    component: () =>
      import('../variations/waterfall-papyrus/waterfall-papyrus.component').then(
        (m) => m.WaterfallPapyrusComponent,
      ),
  },
  {
    id: 'hotland-undyne',
    component: () =>
      import('../variations/hotland-undyne/hotland-undyne.component').then(
        (m) => m.HotlandUndyneComponent,
      ),
  },
  {
    id: 'core-alphys',
    component: () =>
      import('../variations/core-alphys/core-alphys.component').then(
        (m) => m.CoreAlphysComponent,
      ),
  },
  {
    id: 'the-end',
    component: () =>
      import('../variations/the-end/the-end.component').then(
        (m) => m.TheEndComponent,
      ),
  },
];
