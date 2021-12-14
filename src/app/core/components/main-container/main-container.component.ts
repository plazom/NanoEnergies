import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { TranslateGlService } from 'src/app/language/services/translate-gl.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { BaseContainerDirective } from 'src/app/shared/directives/base-container.directive';
import { LanguageService } from 'src/app/language/services/language.service';

export type NavItem = Readonly<{
  name: string;
  url: string;
}>;

@Component({
  selector: 'ne-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent extends BaseContainerDirective {
  protected moduleType: ModuleTypeEnum;
  navItems: Array<NavItem> = [
    {
      name: 'TUBS.INTRODUCTION',
      url: `/${ModuleTypeEnum.INTRODUCTION}`,
    },
    {
      name: 'TUBS.TASK',
      url: `/${ModuleTypeEnum.TASK}`,
    },
  ];


  constructor(private router: Router, protected translateGlService : TranslateGlService, protected translateService: TranslateService,
    protected localStorageService: LocalStorageService, protected languageService: LanguageService, protected cdr: ChangeDetectorRef) {
      super();
      this.moduleType = ModuleTypeEnum.GLOBAL;
  }

  trackByNameFn(_: any, item:NavItem){
    return item.name;
  }

  getActiveUrl(): string {
    return this.router.url;
  }

  onSelectedIndexChange(index: number): void {
    this.navigate(this.navItems[index].url);
  }

  navigate(url: string): void {
    if (this.getActiveUrl() !== url) {
      this.router.navigateByUrl(url);
    }
  }

  getSelectedIndex(): number {
     return this.navItems.findIndex(item => this.isActive(item));
  }

  isActive(navItem: NavItem): boolean {
    return this.getActiveUrl() === navItem.url;
  }
}
