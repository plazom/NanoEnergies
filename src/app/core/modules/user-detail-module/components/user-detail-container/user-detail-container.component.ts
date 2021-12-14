import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUserResponse } from 'src/app/api/interfaces/user-response.interface';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { LanguageService } from 'src/app/language/services/language.service';
import { TranslateGlService } from 'src/app/language/services/translate-gl.service';
import { BaseContainerDirective } from 'src/app/shared/directives/base-container.directive';
import { UserDetailService } from '../../services/user-detail.service';

@Component({
  selector: 'ne-user-detail',
  templateUrl: './user-detail-container.component.html',
  styleUrls: ['./user-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailContainerComponent extends BaseContainerDirective {
  userData?: IUserResponse;
  id?: number;
  protected moduleType: ModuleTypeEnum;

  constructor(protected translateGlService: TranslateGlService, protected translateService: TranslateService,
    protected  languageService: LanguageService, protected cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private userDetailService: UserDetailService) {
    super();
    this.moduleType = ModuleTypeEnum.USER_DETAIL;
  }

  override ngOnInit(): void {
      super.ngOnInit();
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
        this.subscription.add(
            this.userDetailService.getUserDetail$().subscribe(data =>{
                this.userData = data;
                this.cdr.markForCheck();
            })
        )
        this.userDetailService.loadUserDetail(this.id || 0);
      });
  }

  onBackClick(): void {
    this.userDetailService.goToList();
  }
}
