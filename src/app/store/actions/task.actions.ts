import { Action } from '@ngrx/store';


export enum ETaskActions {
  LoadData = '[Task] Load Data',
  LoadDataSuccess = '[Task] Load Data Success'
}

export class LoadDataAction implements Action {
  public readonly type = ETaskActions.LoadData;
  constructor(public payload: any) {}
}

export class LoadDataSuccessAction implements Action {
  public readonly type = ETaskActions.LoadDataSuccess;
  constructor(public payload: any) {}
}
export type TaskActions = LoadDataAction | LoadDataSuccessAction;
