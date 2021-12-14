import { Routes } from '@angular/router';
import { ModuleTypeEnum } from '../language/enums/module-type.enum';
import { MainContainerComponent } from './components/main-container/main-container.component';

export const coreRoutes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ModuleTypeEnum.LOGIN,
      },
      {
        path: ModuleTypeEnum.LOGIN,
        loadChildren: () => import('./modules/login-module/login.module').then((m) => m.LoginModule),
      },
      {
        path: ModuleTypeEnum.INTRODUCTION,
        loadChildren: () => import('../../app/introduction/introduction.module').then((m) => m.IntroductionModule),
      },
      {
        path: ModuleTypeEnum.TASK,
        loadChildren: () => import('../../app/task/task.module').then((m) => m.TaskModule),
      },
      {
        path: ModuleTypeEnum.PAGE_NOT_FOUND,
        loadChildren: () => import('./modules/page-not-found-module/page-not-found.module').then((m) => m.PageNotFoundModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: ModuleTypeEnum.PAGE_NOT_FOUND,
  },
];
