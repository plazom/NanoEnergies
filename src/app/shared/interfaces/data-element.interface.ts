import { ColorStyleEnum } from '../enums/color-style.enum';
import { IColorStyle } from './color-style.interface';

export interface IDataElement {
  tooltip?: string;
  colorStyle?: IColorStyle | ColorStyleEnum;
  disabled?: boolean;
  visible?: boolean;
  hidden?: boolean;
  grow?: number; // if true i make the size button bigger on over event width *= grow; height *= grow;
}
