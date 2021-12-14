import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { TranslateGlService } from 'src/app/language/services/translate-gl.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LocalStorageKeysEnum } from 'src/app/shared/enums/local-storage-keys.enum';
import { BaseContainerDirective } from 'src/app/shared/directives/base-container.directive';
import { LanguageService } from 'src/app/language/services/language.service';
import { LoginService } from '../../modules/login-module/services/login.service';

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
export class MainContainerComponent extends BaseContainerDirective implements OnInit {
  hasToken = false;
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
    protected localStorageService: LocalStorageService, protected languageService: LanguageService, protected cdr: ChangeDetectorRef, protected loginService: LoginService ) {
      super();
      this.moduleType = ModuleTypeEnum.GLOBAL;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    LocalStorageKeysEnum
    const token = this.localStorageService.getItem(LocalStorageKeysEnum.TOKEN);
    if (token) {
      this.loginService.logout();
    }
    this.subscription.add(
      this.loginService.getToken$().subscribe(token => {
        this.hasToken = Boolean(token);
        this.cdr.markForCheck();
      })
    );
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
    if (this.getActiveUrl() !== url && this.getActiveUrl() !== `/${ModuleTypeEnum.LOGIN}`) {
      this.router.navigateByUrl(url);
    }
  }

  getSelectedIndex(): number {
    const result = this.navItems.findIndex(item => this.isActive(item))
     return result >=0 ? result : 1;
  }

  isActive(navItem: NavItem): boolean {
    return this.getActiveUrl() === navItem.url;
  }

  isMenuVisible(): boolean {
      return this.hasToken && this.router.url.indexOf(ModuleTypeEnum.USER_DETAIL) === -1;
  }
}
