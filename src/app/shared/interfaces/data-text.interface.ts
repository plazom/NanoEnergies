import { FontWeightEnum } from '../enums/font-weight.enum';
import { TextAlignEnum } from '../enums/text-align.enum';

export interface IDataText {
  value?: string;
  url?: string;
  toolTip?: string;
  fontColor?: string;
  fontSize?: string;
  fontWeight?: FontWeightEnum;
  textAlign?: TextAlignEnum;
}
