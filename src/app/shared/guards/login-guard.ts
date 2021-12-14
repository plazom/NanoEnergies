import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/core/modules/login-module/services/login.service';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { LocalStorageKeysEnum } from '../enums/local-storage-keys.enum';
import { LocalStorageService } from '../services/local-storage.service';


@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService, private localStorageService: LocalStorageService) { }

  canActivate(_route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
      const route = _route;
      const isLogin = route.data['isLogin'] as boolean;
      const activeUrl = route.routeConfig?.path ? `/${route.routeConfig?.path}`: '';
      return this.loginService.getToken$().pipe(switchMap(token => {
        const storageToken = this.localStorageService.getItem(LocalStorageKeysEnum.TOKEN);
        let noToken = !Boolean(token) && !Boolean(storageToken);
        if (noToken) {
          if(activeUrl !== `/${ModuleTypeEnum.LOGIN}`) {
            this.router.navigate([ModuleTypeEnum.LOGIN]);
          }
        } else {
          if(!token && storageToken){
            this.loginService.setToken(storageToken);
          }
          if(activeUrl === `/${ModuleTypeEnum.LOGIN}`) {
            this.router.navigate([ModuleTypeEnum.TASK]);
          }
        }
        return of(isLogin ? noToken : !noToken);
      }));
  }
}
