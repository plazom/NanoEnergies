import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

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
export class MainContainerComponent {
  navItems: Array<NavItem> = [
    {
      name: 'TUBS.INTRODUCTION',
      url: '/introduction',
    },
    {
      name: 'TUBS.TASK',
      url: '/task',
    },
  ];


  constructor(private router: Router) {}

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

  isActive(navItem: NavItem): boolean {
    return this.getActiveUrl() === navItem.url;
  }
}
