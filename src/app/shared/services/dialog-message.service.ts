import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogMessageComponent } from '../components/dialog-message/dialog-message.component';
import { ButtonTypeEnum } from '../enums/button-type.enum';
import { ColorStyleEnum } from '../enums/color-style.enum';
import { DialogMessageResponseEnum } from '../enums/dialog-message-response.enum';
import { FontWeightEnum } from '../enums/font-weight.enum';
import { TextAlignEnum } from '../enums/text-align.enum';
import { IColorStyle } from '../interfaces/color-style.interface';
import { IDataDialogMessage } from '../interfaces/data-dialog-message.interface';

@Injectable()
export class DialogMessageService {
  constructor(public dialog: MatDialog) {}

  create(
    data: IDataDialogMessage,
    width = '450px'
  ): MatDialogRef<DialogMessageComponent, any> {
    return this.dialog.open(DialogMessageComponent, {
      width,
      data,
    });
  }

  getDialogMessageData(
    title: string,
    text: string,
    iconName: string,
    iconColorStyle: IColorStyle | ColorStyleEnum,
    yesButtLabel: string,
    yesIconName: string,
    cancelButtLabel?: string,
    cancelIconName?: string
  ): IDataDialogMessage {
    const popupData: IDataDialogMessage = {
      icon: {
        name: iconName,
        colorStyle: iconColorStyle,
        fontSize: 75,
      },
      title: {
        value: title,
        fontSize: '32px',
        fontWeight: FontWeightEnum.BOLD,
        textAlign: TextAlignEnum.CENTER,
      },
      text: {
        value: text,
        fontSize: '21px',
        textAlign: TextAlignEnum.CENTER,
      },
      buttons: [],
    };

    if (yesButtLabel) {
      const iconYes = yesIconName
        ? { name: yesIconName, colorStyle: { color: '#ffffff' } }
        : undefined;
      popupData.buttons.push({
        responseType: DialogMessageResponseEnum.APPROVE,
        dataButton: {
          type: ButtonTypeEnum.RAISED,
          dataText: {
            value: yesButtLabel,
          },
          colorStyle: ColorStyleEnum.PRIMARY,
          icon: iconYes,
          width: 0,
          height: 0
        },
      });
    }

    if (cancelButtLabel) {
      const iconCancel = cancelIconName
        ? { name: cancelIconName, colorStyle: { color: '#ffffff' } }
        : undefined;
      popupData.buttons.push({
        responseType: DialogMessageResponseEnum.CANCEL,
        dataButton: {
          type: ButtonTypeEnum.RAISED,
          dataText: {
            value: cancelButtLabel,
          },
          colorStyle: ColorStyleEnum.WARN,
          icon: iconCancel,
          width: 0,
          height: 0
        },
      });
    }

    return popupData;
  }

  getQuestionDialogMessageData(
    title: string,
    text: string,
    yesButtLabel: string,
    cancelButtLabel: string
  ): IDataDialogMessage {
    return this.getDialogMessageData(
      title,
      text,
      'help_outline',
      { color: '#f8bb86' },
      yesButtLabel,
      '',
      cancelButtLabel
    );
  }

  getResultDialogMessageData(
    isSuccess: boolean,
    title: string,
    text: string,
    yesButtLabel: string,
    yesIconName?: string
  ): IDataDialogMessage {
    return this.getDialogMessageData(
      title,
      text,
      isSuccess ? 'check_circle' : 'error_outline',
      isSuccess ? ColorStyleEnum.PRIMARY : ColorStyleEnum.WARN,
      yesButtLabel,
      yesIconName || ''
    );
  }


  getNotificationDialogMessageData(
    title: string,
    text: string,
    yesButtLabel?: string,
    yesIconName?: string
  ): IDataDialogMessage {
    if (!yesButtLabel){
      yesButtLabel = 'Ok';
    }
    return this.getDialogMessageData(
      title,
      text,
      'priority_high',
      ColorStyleEnum.PRIMARY,
      yesButtLabel,
      yesIconName || ''
    );
  }

}
