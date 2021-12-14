import { LanguageEnum } from '../../language/enums/language.enum';


export interface IConfigState {
  lang: LanguageEnum;
}

export const initialConfigState: IConfigState = {
  lang: LanguageEnum.NONE,
};
