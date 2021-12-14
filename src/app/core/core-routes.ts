import { Routes } from '@angular/router';
import { ModuleTypeEnum } from '../language/enums/module-type.enum';
import { LoginGuard } from '../shared/guards/login-guard';
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
        canActivate: [LoginGuard],
        data: {isLogin: true}
      },
      {
        path: ModuleTypeEnum.INTRODUCTION,
        loadChildren: () => import('./modules/introduction-module/introduction.module').then((m) => m.IntroductionModule),
        canActivate: [LoginGuard],
        data: {isLogin: false}
      },
      {
        path: ModuleTypeEnum.TASK,
        loadChildren: () => import('./modules/task-module/task.module').then((m) => m.TaskModule),
        canActivate: [LoginGuard],
        data: {isLogin: false}
      },
      {
        path: `${ModuleTypeEnum.USER_DETAIL}/:id`,
        loadChildren: () => import('./modules/user-detail-module/user-detail.module').then((m) => m.UserDetailModule),
        canActivate: [LoginGuard],
        data: {isLogin: false}
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
