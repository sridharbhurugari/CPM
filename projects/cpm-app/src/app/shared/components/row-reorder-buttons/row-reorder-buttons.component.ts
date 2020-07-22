import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IRowIndexChanged } from '../../events/i-row-index-changed';

@Component({
  selector: 'app-row-reorder-buttons',
  templateUrl: './row-reorder-buttons.component.html',
  styleUrls: ['./row-reorder-buttons.component.scss']
})
export class RowReorderButtonsComponent implements OnInit {
  private _index: number;

  @Output()
  rowMovedUp: EventEmitter<any> = new EventEmitter();

  @Output()
  rowMovedDown: EventEmitter<any> = new EventEmitter();

  @Output()
  rowIndexChanged: EventEmitter<IRowIndexChanged<any>> = new EventEmitter();

  @Input()
  value: any;

  @Input()
  allowEditIndex: boolean;

  @Input()
  set index(value: number) {
    this.indexDisplayEdit = value + 1;
    this._index = value;
  }

  @Input()
  orderableLength: number;

  @Input()
  upDisabled: boolean;

  @Input()
  downDisabled: boolean;

  @Input()
  disabled: boolean;

  indexDisplayEdit: number;

  constructor() { }

  ngOnInit() {
  }

  onUpClicked(){
    this.rowMovedUp.emit(this.value)
  }

  onDownClicked(){
    this.rowMovedDown.emit(this.value);
  }

  onIndexChanged(){
    if(this.indexDisplayEdit == null){
      this.indexDisplayEdit = this._index + 1;
    }

    var newIndex = this.indexDisplayEdit - 1;
    if(newIndex < 0){
      newIndex = 0;
    }
    if(newIndex > this.orderableLength - 1){
      newIndex = this.orderableLength - 1;
    }

    newIndex = parseInt(newIndex.toString());

    if(newIndex == this._index){
      this.indexDisplayEdit = this._index + 1;
      return;
    }

    this.rowIndexChanged.emit({
      newIndex: newIndex,
      value: this.value,
    });
  }
}
