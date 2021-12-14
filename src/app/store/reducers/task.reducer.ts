import { ETaskActions, LoadDataSuccessAction, TaskActions } from '../actions/task.actions';
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
    default:
      return state;
  }
};
