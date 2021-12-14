import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Route, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskContainerComponent } from './components/task-container/task-container.component';
import { UserInfoModule } from './modules/user-info-module/user-info.module';
import { TaskService } from './services/task.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/task/', '.json');
}

const introductionRoutes: Route[] = [
  {
    path: '',
    component: TaskContainerComponent,
    data: {},
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(introductionRoutes),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      isolate: true,
    }),
    UserInfoModule,
  ],
  declarations: [
    TaskContainerComponent,
  ],
  providers: [
    TaskService
  ],
  exports: [
    TaskContainerComponent
  ],
})
export class TaskModule {
}
