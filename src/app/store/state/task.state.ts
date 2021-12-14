import { LanguageEnum } from '../../language/enums/language.enum';


export interface ITaskState {
  data: any;
}

export const initialTaskState: ITaskState = {
  data: null,
};
