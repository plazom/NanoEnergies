import { Routes } from '@angular/router';
import { MainContainerComponent } from './components/main-container/main-container.component';

export const coreRoutes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'introduction',
        data: {},
      },
      {
        path: 'introduction',
        loadChildren: () => import('../../app/introduction/introduction.module').then((m) => m.IntroductionModule),
      },
      {
        path: 'task',
        loadChildren: () => import('../../app/task/task.module').then((m) => m.TaskModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'introduction',
    data: {},
  },
];
