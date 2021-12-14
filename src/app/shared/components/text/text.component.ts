import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IDataText } from '../../interfaces/data-text.interface';

@Component({
  selector: 'ne-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  private _dataText?: IDataText;
  get dataText(): IDataText | undefined {
    return this._dataText;
  }

  @Input('dataText')
  set dataText(value: IDataText | undefined) {
    this._dataText = value;
    if (value){
      this.createStyles();
    }
  }

  layoutAlign?: string;
  textStyle?: object;
  constructor() { }

  createStyles(): void {
    this.layoutAlign = this.getLayoutAlign();
    this.textStyle = this.getTextStyle();
  }

  getLayoutAlign(): string {
    const align = this.dataText && this.dataText.textAlign ? this.dataText.textAlign : 'start';
    return align.concat(' center');
  }

  getTextStyle(): object {
    return {
      color: this.dataText?.fontColor,
      'font-size': this.dataText?.fontSize,
      'font-weight': this.dataText?.fontWeight,
    };
  }

}
