import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ModuleTypeEnum } from '../../language/enums/module-type.enum';
import { LanguageService } from '../../language/services/language.service';
import { TranslateGlService } from '../../language/services/translate-gl.service';

@Directive()
export abstract class BaseContainerDirective implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  protected abstract moduleType: ModuleTypeEnum;
  protected abstract translateGlService: TranslateGlService;
  protected abstract translateService: TranslateService;
  protected abstract languageService: LanguageService;
  protected abstract cdr: ChangeDetectorRef;

  protected dataWasLoaded = false;
  ngOnInit(): void {
    this.subscription.add(
      this.translateGlService.setInstance(this.translateService, this.moduleType).subscribe(_ => {
        this.refreshAllData();
      })
    );
  }

  refreshAllData(): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.translateGlService.removeInstance(this.moduleType);
  }

}
