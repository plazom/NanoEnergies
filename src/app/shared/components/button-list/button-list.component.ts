import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDataListButton } from '../../interfaces/data-list-button.interface';

@Component({
  selector: 'ne-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonListComponent implements OnInit {

  @Input() buttons: Array<IDataListButton> = [];
  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<IDataListButton>();

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(dataButton: IDataListButton): void {
    this.buttonClick.emit(dataButton);
  }

  trackByNameFn(_: any, button: IDataListButton): string {
    const data = button.dataButton;
    if (data && data.dataText && data.dataText.value) {
      return data.dataText.value;
    } else if (data.icon) {
      return data.icon.name;
    }
    return '';
  }
}
