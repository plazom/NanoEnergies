import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { LanguageService } from 'src/app/language/services/language.service';
import { TranslateGlService } from 'src/app/language/services/translate-gl.service';
import { BaseContainerDirective } from 'src/app/shared/directives/base-container.directive';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'ne-login',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent extends BaseContainerDirective {
  form: FormGroup = this.createForm();
  protected moduleType: ModuleTypeEnum;
  constructor(protected translateGlService: TranslateGlService, protected translateService: TranslateService,
    protected  languageService: LanguageService, protected cdr: ChangeDetectorRef, private loginService: LoginService) {
    super();
    this.moduleType = ModuleTypeEnum.LOGIN;
    this.createForm();
  }

  createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('eve.holt@reqres.in', [Validators.required, Validators.email]),
      password: new FormControl('pistol', [Validators.required]),
    });
  }

  getLoginError(): string {
    if (this.form.get('email')?.hasError('email') ) {
        return this.translateGlService.getInstance().instant('ERRORS.INVALID_EMAIL');
    }

    if (this.form.get('email')?.hasError('required') ) {
      return this.translateGlService.getInstance().instant('ERRORS.IS_REQUIRED');
    }

    return '';
  }

  getPasswordError(): string {
    if (this.form.get('email')?.hasError('required') ) {
      return this.translateGlService.getInstance().instant('ERRORS.IS_REQUIRED');
    }
    return '';
  }

  formIsValid(): boolean {
    return !this.form.invalid;
  }

  onSignInClick(): void {
    if (this.formIsValid()) {
      this.loginService.loginToServer({
        email: String(this.form.get('email')?.value),
        password: String(this.form.get('password')?.value),
      });
    }

  }
}
