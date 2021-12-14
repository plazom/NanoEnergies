import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonOrderEnum } from '../../enums/button-order.enum';
import { ColorStyleEnum } from '../../enums/color-style.enum';
import { IDataButton } from '../../interfaces/data-button.interface';
import { IDataText } from '../../interfaces/data-text.interface';
import { colorStyleToCSS, findValueInObject, minWidthHeightToCSS, widthHeightToCSS } from '../../utils/transform-util';

@Component({
  selector: 'ne-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {

  private _buttonData?: IDataButton;
  get buttonData(): IDataButton | undefined {
    return this._buttonData || undefined;
  }

  @Input('buttonData')
  set buttonData(value: IDataButton | undefined) {
    this._buttonData = value;
    this.refreshAllData();
  }

  @Input() grow = 1;
  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<IDataButton>();

  buttonColor: ColorStyleEnum | undefined;
  containerStyle?: object;
  buttonStyle?: object;
  gapBetweenTextIcon?: string;
  dataText?: IDataText;
  textOrder?: object;
  iconOrder?: object;
  constructor(private cdr: ChangeDetectorRef) {}

  refreshAllData(): void {
    if (this.buttonData){
      this.containerStyle = this.getContainerStyle();
      this.buttonColor = findValueInObject(ColorStyleEnum, this.buttonData.colorStyle);
      this.buttonStyle = this.getButtonStyle();
      this.gapBetweenTextIcon = this.getGap();
      this.dataText = this.getButtonDataText();
      this.textOrder = this.getTextOrderStyle();
      this.iconOrder = this.getIconOrderStyle();
      this.cdr.markForCheck();
    }
  }

  getContainerStyle(): object | undefined {
    if (this.buttonData){
      return {... minWidthHeightToCSS(this.buttonData.width, this.buttonData.height, this.buttonData.grow)};
    }
    return undefined;
  }

  getButtonDataText(): IDataText {
    if (this.buttonData && this.buttonData.dataText) {
      return this.buttonData.dataText;
    }
    return {};
  }

  getTextOrderStyle(): object {
    const order = this.buttonData && this.buttonData.order && this.buttonData.order === ButtonOrderEnum.ICON_TEXT ? 2 : 1;
    return {order};
  }

  getIconOrderStyle(): object {
    const order = this.buttonData && this.buttonData.order && this.buttonData.order === ButtonOrderEnum.ICON_TEXT ? 1 : 2;
    return {order};
  }

  getGap(): string {
    return this.buttonData && this.buttonData.gap ? this.buttonData.gap : '0px';
  }

  getButtonStyle(): object {
    let result = {};
    const data = this.buttonData;
    if (data){
      if (data.colorStyle) {
        result = {... result, ...colorStyleToCSS(data.colorStyle)};
      }
      if (data.width && data.height) {
        result = {... result, ...widthHeightToCSS(data.width * this.grow, data.height * this.grow)};
      }
      if (!data.dataText) {
        result = {...result, padding: '0px'};
      }
    }
    return result;
  }

  changeGrow(value: boolean): void{
    if (this.buttonData && this.buttonData.grow) {
      const newValue = value ? this.buttonData.grow : 1;
      if (this.grow !== newValue){
        this.grow = newValue;
        this.buttonStyle = this.getButtonStyle();
        this.cdr.markForCheck();
      }
    }
  }

  onButtonClick(): void {
    if (!this.buttonData?.hidden){
      this.buttonClick.emit(this.buttonData);
    }
  }
}
