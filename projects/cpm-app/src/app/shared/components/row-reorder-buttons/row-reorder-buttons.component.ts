import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-row-reorder-buttons',
  templateUrl: './row-reorder-buttons.component.html',
  styleUrls: ['./row-reorder-buttons.component.scss']
})
export class RowReorderButtonsComponent implements OnInit {
  @Output()
  rowMovedUp: EventEmitter<any> = new EventEmitter();

  @Output()
  rowMovedDown: EventEmitter<any> = new EventEmitter();

  @Input()
  value: any;

  @Input()
  upDisabled: boolean;

  @Input()
  downDisabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  onUpClicked(){
    this.rowMovedUp.emit(this.value)
  }

  onDownClicked(){
    this.rowMovedDown.emit(this.value);
  }
}
