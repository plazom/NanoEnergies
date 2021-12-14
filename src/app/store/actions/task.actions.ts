import { Action } from '@ngrx/store';
import { IUserResponse } from 'src/app/api/interfaces/user-response.interface';
import { IUsersResponse } from 'src/app/api/interfaces/users-response.interface';


export enum ETaskActions {
  LoadData = '[Task] Load Data',
  LoadDataSuccess = '[Task] Load Data Success',
  LoadUserDetail = '[Task] Load User Detail',
  LoadUserDetailSuccess = '[Task] Load User Detail Success'
}

export class LoadDataAction implements Action {
  public readonly type = ETaskActions.LoadData;
  constructor(public page: number) {}
}

export class LoadDataSuccessAction implements Action {
  public readonly type = ETaskActions.LoadDataSuccess;
  constructor(public payload: IUsersResponse) {}
}
// ==========================================
export class LoadUserDetailAction implements Action {
  public readonly type = ETaskActions.LoadUserDetail;
  constructor(public id: number) {}
}

export class LoadUserDetailSuccessAction implements Action {
  public readonly type = ETaskActions.LoadUserDetailSuccess;
  constructor(public payload: IUserResponse) {}
}
export type TaskActions = LoadDataAction | LoadDataSuccessAction | LoadUserDetailAction | LoadUserDetailSuccessAction;
