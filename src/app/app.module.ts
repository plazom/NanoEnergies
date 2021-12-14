import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoaderService } from './shared/services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigEffects } from './store/effects/config.effects';
import { appReducer } from './store/reducers/app.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LoginEffects } from './store/effects/login.effects';
import { ApiService } from './api/services/api.service';
import { TaskEffects } from './store/effects/task.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([ConfigEffects, LoginEffects, TaskEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),

    RouterModule.forRoot([]),
    CoreModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [
    LoaderService,
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
