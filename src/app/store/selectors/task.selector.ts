import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ITaskState } from '../state/task.state';


const taskState = (state: IAppState) => state.task;

export const getTaskData = createSelector(
  taskState,
  (state: ITaskState) => state.data
);
