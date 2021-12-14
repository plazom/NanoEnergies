import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ILoginState } from '../state/login.state';

const loginState = (state: IAppState) => state.login;

export const getToken = createSelector(
  loginState,
  (state: ILoginState) => state.token
);
