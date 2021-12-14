import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Route, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '../shared/shared.module';
import { TaskContainerComponent } from './components/task-container/task-container.component';

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
    FlexLayoutModule,
    RouterModule.forChild(introductionRoutes),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  declarations: [
    TaskContainerComponent,
  ],
  providers: [
  ],
  exports: [
    TaskContainerComponent
  ],
})
export class TaskModule {
}
