import { IDataIcon } from './data-icon.interface';
import { IDataListButton } from './data-list-button.interface';
import { IDataText } from './data-text.interface';

export interface IDataDialogMessage {
  icon?: IDataIcon;
  title?: IDataText;
  text?: IDataText;
  buttons: Array<IDataListButton>;
}
