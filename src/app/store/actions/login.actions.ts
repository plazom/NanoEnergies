import { Action } from '@ngrx/store';
import { ILogin } from 'src/app/api/interfaces/login.interface';

export enum ELoginActions {
  LoginToServer = '[Login] Login To Server',
  SetToken = '[Login] Set Token',
  SetTokenSuccess = '[Login] Set Token Success',
}

export class LoginToServerAction implements Action {
  public readonly type = ELoginActions.LoginToServer;
  constructor(public payload: ILogin) {}
}

export class SetTokenAction implements Action {
  public readonly type = ELoginActions.SetToken;
  constructor(public payload: string) {}
}

export class SetTokenSuccessAction implements Action {
  public readonly type = ELoginActions.SetTokenSuccess;
  constructor(public payload: string) {}
}

export type LoginActions = LoginToServerAction | SetTokenAction | SetTokenSuccessAction;
