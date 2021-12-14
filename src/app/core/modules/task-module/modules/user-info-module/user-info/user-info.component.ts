import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IUserResponse } from 'src/app/api/interfaces/user-response.interface';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { LanguageService } from 'src/app/language/services/language.service';
import { TranslateGlService } from 'src/app/language/services/translate-gl.service';
import { BaseContainerDirective } from 'src/app/shared/directives/base-container.directive';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'ne-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent extends BaseContainerDirective {
  @Input() data?: IUserResponse;
  @Input() showInfo = false;
  protected moduleType: ModuleTypeEnum;

  constructor(protected translateGlService: TranslateGlService, protected translateService: TranslateService,
    protected  languageService: LanguageService, protected cdr: ChangeDetectorRef, private taskService: TaskService) {
    super();
    this.moduleType = ModuleTypeEnum.USER_INFO;
  }

  override ngOnInit(): void {
      super.ngOnInit();
  }

  getUserId(): string {
    return this.data?.id ? this.data.id.toString() : '--';
  }


  getAvatarUrl(): string {
    return this.data?.avatar || '';
  }

  getUserEmail(): string {
    return this.data?.email || '--';
  }

  getUserFirstName(): string {
    return this.data?.first_name || '--';
  }

  getUserLastName(): string {
    return this.data?.last_name || '--';
  }

  getAvatarStyle(): {}{
    return this.showInfo ? {cursor: 'pointer'}: {};
  }

  goToDetail(): void {
    if (this.data?.id) {
      this.taskService.goToDetail(this.data.id);
    }
  }
}
