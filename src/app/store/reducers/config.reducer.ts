import { ConfigActions, EConfigActions, SetLanguageSuccessAction } from '../actions/config.actions';
import { IConfigState, initialConfigState } from '../state/config.state';

export const configReducer = (
  state = initialConfigState,
  action: ConfigActions
): IConfigState => {
  switch (action.type) {
    case EConfigActions.SetLanguageSuccess: {
      return {
        ...state,
        lang: (action as SetLanguageSuccessAction).payload,
      };
    }
    default:
      return state;
  }
};
