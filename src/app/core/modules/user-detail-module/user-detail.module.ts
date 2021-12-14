import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Route, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserInfoModule } from '../task-module/modules/user-info-module/user-info.module';
import { UserDetailContainerComponent } from './components/user-detail-container/user-detail-container.component';
import { UserDetailService } from './services/user-detail.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/task/', '.json');
}

const introductionRoutes: Route[] = [
  {
    path: '',
    component: UserDetailContainerComponent,
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
      loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]},
      isolate: true,
    }),
    UserInfoModule
  ],
  declarations: [
    UserDetailContainerComponent,
  ],
  providers: [
    UserDetailService
  ],
  exports: [
  ],
})
export class UserDetailModule {
}
