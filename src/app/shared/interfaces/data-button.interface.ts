import { ButtonOrderEnum } from '../enums/button-order.enum';
import { ButtonTypeEnum } from '../enums/button-type.enum';
import { IDataElement } from './data-element.interface';
import { IDataIcon } from './data-icon.interface';
import { IDataText } from './data-text.interface';

export interface IDataButton extends IDataElement {
  type?: ButtonTypeEnum;
  order?: ButtonOrderEnum;
  dataText?: IDataText;
  icon?: IDataIcon;
  width: number; // in pixels
  height: number; // in pixels
  gap?: string; // gap between icon and text. For example '5px'
}
