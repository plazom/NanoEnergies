import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Flag } from 'src/app/shared/types/flag.type';
import { LoginService } from '../../../login-module/services/login.service';

@Component({
  selector: 'ne-power',
  templateUrl: './power-container.component.html',
  styleUrls: ['./power-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PowerContainerComponent {
  private subscription = new Subscription()
  @Input() power: Flag =
  {
    id: 'power',
    imgUp: 'assets/imgs/power.png',
    imgDown: 'assets/imgs/power32.png',
    selected: false,
  };
  constructor(private cdr: ChangeDetectorRef, private loginService: LoginService) {
    this.subscription.add(
      this.loginService.getToken$().subscribe(token => {
        this.setState(!Boolean(token));
      })
    );
  }

  setState(selected: boolean): void{
    this.power = {...this.power, selected};
    this.cdr.markForCheck();
  }

  logout(): void {
    this.loginService.logout();
  }
}
