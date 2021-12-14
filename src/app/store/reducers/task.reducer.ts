import { ETaskActions, LoadDataSuccessAction, LoadUserDetailSuccessAction, TaskActions } from '../actions/task.actions';
import { initialTaskState, ITaskState } from '../state/task.state';

export const taskReducer = (
  state = initialTaskState,
  action: TaskActions
): ITaskState => {
  switch (action.type) {
    case ETaskActions.LoadDataSuccess: {
      return {
        ...state,
        data: (action as LoadDataSuccessAction).payload,
      };
    }
    case ETaskActions.LoadUserDetailSuccess: {
      return {
        ...state,
        userDetail: (action as LoadUserDetailSuccessAction).payload,
      };
    }
    default:
      return state;
  }
};
