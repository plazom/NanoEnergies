import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ILoginResponse } from 'src/app/api/interfaces/login-response.interface';
import { ApiService } from 'src/app/api/services/api.service';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { LocalStorageKeysEnum } from 'src/app/shared/enums/local-storage-keys.enum';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ELoginActions, LoginToServerAction, SetTokenAction, SetTokenSuccessAction } from '../actions/login.actions';


@Injectable()
export class LoginEffects {

  loginToServer$ = createEffect( () => this._actions$.pipe(
    ofType<LoginToServerAction>(ELoginActions.LoginToServer),
    switchMap((action) => {
      return this.apiService.loginToServer$(action.payload);
    }),
    switchMap((loginResponse: ILoginResponse) => {
      this.localStorageService.setItem(LocalStorageKeysEnum.TOKEN, loginResponse.token);
      if(loginResponse.token){
        this.router.navigate([ModuleTypeEnum.TASK]);
      }
      return of(new SetTokenSuccessAction(loginResponse.token));
    })
  ));

  setToken$ = createEffect( () => this._actions$.pipe(
    ofType<SetTokenAction>(ELoginActions.SetToken),
    switchMap((action) => {
      if(action.payload){
        this.localStorageService.setItem(LocalStorageKeysEnum.TOKEN, action.payload);
      } else {
        this.router.navigate([ModuleTypeEnum.LOGIN]);
        this.localStorageService.removeItem(LocalStorageKeysEnum.TOKEN);
      }
      return of(new SetTokenSuccessAction(action.payload));
    })
  ));

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private apiService: ApiService,
    private _actions$: Actions) {}
}
