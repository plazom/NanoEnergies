import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FlagStateEnum } from '../../enums/flag-state.enum';
import { Flag } from '../../types/flag.type';

@Component({
  selector: 'ne-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComponent {
  @Input() isCheckBox = false;
  @Input() flag: Flag = {
    id: 'en',
    imgUp: '',
    imgDown: '',
    selected: false
  };
  @Output() flagClick = new EventEmitter<string | FlagStateEnum>();

  flagStateEnum = FlagStateEnum;

  onImgClick(state: FlagStateEnum): void{
    if (this.isCheckBox || state === FlagStateEnum.UNSELECTED) {
      this.flagClick.emit(this.isCheckBox ? state : this.flag.id);
    }
  }
}
