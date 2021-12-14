import { IConfigState, initialConfigState } from './config.state';
import { ILoginState, initialLoginState } from './login.state';
import { ITaskState, initialTaskState } from './task.state';

export interface IAppState {
  config: IConfigState;
  login: ILoginState
  task: ITaskState
}

export const initialAppState: IAppState = {
  config: initialConfigState,
  login: initialLoginState,
  task: initialTaskState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
