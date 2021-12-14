import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDataDialogMessage } from '../../interfaces/data-dialog-message.interface';
import { IDataListButton } from '../../interfaces/data-list-button.interface';
import { IDialogMessageResponse } from '../../interfaces/dialog-message-response.interface';
import { objectToArray } from '../../utils/transform-util';

@Component({
  selector: 'ne-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDataDialogMessage
  ) {}

  trackByNameFn(button: IDataListButton): string {
    const data = button.dataButton;
    if (data && data.dataText && data.dataText.value) {
      return data.dataText.value;
    } else if (data.icon) {
      return data.icon.name;
    }
    return '';
  }

  onButtonClick(dataButton: IDataListButton): void {
    const result: IDialogMessageResponse = { buttonData: dataButton };
    this.dialogRef.close(result);
  }
  getIconStyle(): {} {
    if (this.data?.icon?.colorStyle && Object.prototype.hasOwnProperty.call(this.data.icon.colorStyle, "color")) {
        return this.data.icon.colorStyle;
    }
    return {'color': this.data?.icon?.colorStyle}
  }
}
