import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpErrorInterceptor } from '../interceptors/http-error.interceptor';
import { LanguageModule } from '../language/language.module';
import { PaginatorI18n } from '../language/services/paginatorI18n.service';
import { TranslateGlService } from '../language/services/translate-gl.service';
import { LoginGuard } from '../shared/guards/login-guard';
import { MaterialModule } from '../shared/material.module';
import { DialogMessageService } from '../shared/services/dialog-message.service';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { coreRoutes } from './core-routes';
import { LoginService } from './modules/login-module/services/login.service';
import { PowerModule } from './modules/power-module/power.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/root/', '.json');
}

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes),
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LanguageModule,
    MaterialModule,
    PowerModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'cs'},
    {
      provide: MatPaginatorIntl, deps: [TranslateService],
      useFactory: (translateService: TranslateService) => new PaginatorI18n(translateService).getPaginatorIntl()
    },
    DialogMessageService, TranslateGlService, LoginService, LoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  declarations: [
    MainContainerComponent,
  ],
  exports: [
    MainContainerComponent,
  ],
})
export class CoreModule {}
