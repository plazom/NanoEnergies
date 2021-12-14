import { Action } from '@ngrx/store';
import { LanguageEnum } from '../../language/enums/language.enum';


export enum EConfigActions {
  SetLanguage = '[Config] Set Language',
  SetLanguageSuccess = '[Config] Set Language Success'
}

export class SetLanguageAction implements Action {
  public readonly type = EConfigActions.SetLanguage;
  constructor(public payload: LanguageEnum) {}
}

export class SetLanguageSuccessAction implements Action {
  public readonly type = EConfigActions.SetLanguageSuccess;
  constructor(public payload: LanguageEnum) {}
}
export type ConfigActions = SetLanguageAction | SetLanguageSuccessAction;
