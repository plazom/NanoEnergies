import { ColorStyleEnum } from '../enums/color-style.enum';
import { IColorStyle } from '../interfaces/color-style.interface';

export const objectToArray = (anyObject: any): any[] => Object.keys(anyObject).map((index: string) => anyObject[index]);

export const findValueInObject = (object: any, findValue: any): any | undefined => {
  const values: any[] = objectToArray(object);
  return values.find(element => element === findValue);
};

export const colorStyleToCSS = (colorStyle: IColorStyle | ColorStyleEnum): object => {
  if (colorStyle && findValueInObject(ColorStyleEnum, colorStyle) === undefined){
    const clrStyle = colorStyle as IColorStyle;
    return {
      color: clrStyle.color,
      'background-color': clrStyle.backgroundColor,
    };
  }
  return {};
};

export const widthHeightToCSS = (width: number, height: number ): object => {
  let result = {};
  if (width){
    const value = `${Math.ceil(width)}px`;
    result = { width: value, 'max-width': value, 'min-width': value };
  }

  if (height){
    result = {... result, height: `${Math.ceil(height)}px`, 'line-height': `${Math.ceil(height)}px`};
  }

  return result;
};

export const minWidthHeightToCSS = (width: number, height: number, grow: number = 1): object => {
  let result = {};
  if (width){
    result = { 'min-width': `${Math.ceil(width * grow)}px` };
  }

  if (height){
    result = {... result, 'min-height': `${Math.ceil(height * grow)}px`};
  }
  return result;
};

