import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { configReducer } from './config.reducer';
import { loginReducer } from './login.reducer';
import { taskReducer } from './task.reducer';

export const appReducer: ActionReducerMap<IAppState, any> = {
  config: configReducer,
  login: loginReducer,
  task: taskReducer
};
