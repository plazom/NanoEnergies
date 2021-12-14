import { IDataElement } from './data-element.interface';

export interface IDataIcon extends IDataElement {
  name: string; // name of material icon like '3d_rotation' etc
  fontSize?: number; // set this size in pixels
  flipHorizontally?: boolean; // flip icon horizontally
}
