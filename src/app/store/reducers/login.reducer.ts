import { ELoginActions, LoginActions, SetTokenSuccessAction } from '../actions/login.actions';
import { initialLoginState, ILoginState } from '../state/login.state';

export const loginReducer = (
  state = initialLoginState,
  action: LoginActions
): ILoginState => {
  switch (action.type) {
    case ELoginActions.SetTokenSuccess: {
      return {
        ...state,
        token: (action as SetTokenSuccessAction).payload,
      };
    }
    default:
      return state;
  }
};
