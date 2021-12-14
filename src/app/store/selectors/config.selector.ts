import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IConfigState } from '../state/config.state';


const configState = (state: IAppState) => state.config;

export const getLanguage = createSelector(
  configState,
  (state: IConfigState) => state.lang
);
