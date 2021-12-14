import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ILoginResponse } from 'src/app/api/interfaces/login-response.interface';
import { ApiService } from 'src/app/api/services/api.service';
import { ELoginActions, LoginToServerAction, SetTokenAction } from '../actions/login.actions';


@Injectable()
export class LoginEffects {

  loginToServer$ = createEffect( () => this._actions$.pipe(
    ofType<LoginToServerAction>(ELoginActions.LoginToServer),
    switchMap((action) => {
      return this.apiService.loginToServer$(action.payload);
    }),
    switchMap((loginResponse: ILoginResponse) => {
      console.log(loginResponse, '!!!!!!!!!!!!!!');
      return of(new SetTokenAction(loginResponse.token));
    })
  ));

  constructor(
    private apiService: ApiService,
    private _actions$: Actions) {}
}
