import { IUserResponse } from './user-response.interface';

export interface IUsersResponse {
   page: number;
   per_page: number;
   total: number;
   total_pages: number;
   data: Array<IUserResponse>;
   support: {
     url: string;
     text: string;
   }
}
