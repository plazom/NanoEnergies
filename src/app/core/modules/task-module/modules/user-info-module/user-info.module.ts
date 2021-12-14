import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskService } from '../../services/task.service';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    TranslateModule,
  ],
  declarations: [
    UserInfoComponent,
  ],
  providers: [
    TaskService
  ],
  exports: [
    UserInfoComponent
  ],
})
export class UserInfoModule {
}
