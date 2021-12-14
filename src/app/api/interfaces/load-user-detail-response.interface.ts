import { IUserResponse } from './user-response.interface';

export interface ILoadUserDetailResponse {
   data: IUserResponse;
   support: {
     url: string;
     text: string;
   }
}
