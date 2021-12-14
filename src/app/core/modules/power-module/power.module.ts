import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginService } from '../login-module/services/login.service';
import { PowerContainerComponent } from './components/power-container/power-container.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
  ],
  declarations: [
    PowerContainerComponent,
  ],
  providers: [
    LoginService
  ],
  exports: [
    PowerContainerComponent
  ]
})
export class PowerModule {
}
