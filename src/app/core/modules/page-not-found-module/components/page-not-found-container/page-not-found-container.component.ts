import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { LanguageService } from 'src/app/language/services/language.service';
import { TranslateGlService } from 'src/app/language/services/translate-gl.service';
import { BaseContainerDirective } from 'src/app/shared/directives/base-container.directive';

@Component({
  selector: 'ne-page-not-found',
  templateUrl: './page-not-found-container.component.html',
  styleUrls: ['./page-not-found-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundContainerComponent extends BaseContainerDirective {
  protected moduleType: ModuleTypeEnum;
  constructor(protected translateGlService: TranslateGlService, protected translateService: TranslateService,
    protected  languageService: LanguageService, protected cdr: ChangeDetectorRef) {
    super();
    this.moduleType = ModuleTypeEnum.PAGE_NOT_FOUND;
  }

}
