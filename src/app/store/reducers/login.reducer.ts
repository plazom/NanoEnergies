import { ELoginActions, LoginActions, SetTokenAction } from '../actions/login.actions';
import { initialLoginState, ILoginState } from '../state/login.state';

export const loginReducer = (
  state = initialLoginState,
  action: LoginActions
): ILoginState => {
  switch (action.type) {
    case ELoginActions.SetToken: {
      return {
        ...state,
        token: (action as SetTokenAction).payload,
      };
    }
    default:
      return state;
  }
};
