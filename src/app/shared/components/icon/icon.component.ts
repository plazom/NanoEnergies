import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ColorStyleEnum } from '../../enums/color-style.enum';
import { IDataIcon } from '../../interfaces/data-icon.interface';
import { colorStyleToCSS, findValueInObject, minWidthHeightToCSS, widthHeightToCSS } from '../../utils/transform-util';

@Component({
  selector: 'ne-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {

  private _iconData?: IDataIcon;
  get iconData(): IDataIcon | undefined {
    return this._iconData;
  }

  @Input('iconData')
  set iconData(value: IDataIcon | undefined) {
    this._iconData = value;
    this.createStyles();
  }

  private _grow = 1;
  get grow(): number {
    return this._grow;
  }

  @Input('grow')
  set grow(value: number) {
    this._grow = value;
    this.iconStyle = this.getIconStyle();
  }

  colorIcon: ColorStyleEnum | undefined;
  containerStyle?: object;
  iconClass?: object;
  iconStyle?: object;

  constructor(private cdr: ChangeDetectorRef) {}

  createStyles(): void{
    this.colorIcon = this.getColor();
    this.containerStyle = this.getContainerStyle();
    this.iconClass = this.getIconClass();
    this.iconStyle = this.getIconStyle();
  }

  getColor(): ColorStyleEnum | undefined {
    return findValueInObject(ColorStyleEnum, this.iconData?.colorStyle);
  }

  getContainerStyle(): object | undefined {
    if (this.iconData && this.iconData.fontSize && this.iconData.fontSize > 60){
      return minWidthHeightToCSS(this.iconData.fontSize, this.iconData.fontSize, this.iconData.grow);
    }
    return undefined;
  }

  getIconClass(): object {
    return {disabled: this.iconData?.disabled };
  }

  getIconStyle(): object {
    let result = {};
    const data = this.iconData;
    if (data){
      if (data.colorStyle) {
        result = {... result, ...colorStyleToCSS(data.colorStyle)};
      }
      if (data.fontSize) {
        result = {... result, ...widthHeightToCSS(data.fontSize * this.grow, data.fontSize * this.grow), 'font-size': `${data.fontSize * this.grow}px` };
      }
      if (data.flipHorizontally) {
        result = {... result, transform: 'scaleX(-1)'};
      }
    }
    return result;
  }

  changeGrow(value: boolean): void{
    if (this.iconData && this.iconData.grow) {
      this.grow = value ? this.iconData.grow : 1;
      this.iconStyle = this.getIconStyle();
      this.cdr.markForCheck();
    }
  }
}
