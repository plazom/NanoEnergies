import { IUserResponse } from 'src/app/api/interfaces/user-response.interface';
import { IUsersResponse } from 'src/app/api/interfaces/users-response.interface';

export interface ITaskState {
  data?: IUsersResponse;
  userDetail?: IUserResponse;
}

export const initialTaskState: ITaskState = {
  data: undefined,
  userDetail: undefined,
};
