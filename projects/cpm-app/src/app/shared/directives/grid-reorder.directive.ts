import { Directive, QueryList, ContentChildren, Output, EventEmitter } from '@angular/core';
import { RowReorderButtonsComponent } from '../components/row-reorder-buttons/row-reorder-buttons.component';
import { IGridOrderChanged } from '../events/i-grid-order-changed';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appGridReorder]'
})
export class GridReorderDirective {
  private _orderedValues: any[];
  private _subscriptions: Subscription[] = [];

  @Output()
  orderChanged: EventEmitter<IGridOrderChanged<any>> = new EventEmitter;

  @ContentChildren(RowReorderButtonsComponent)
  set rows(values: QueryList<RowReorderButtonsComponent>) {
    this._orderedValues = values.map(x => x.value);
    if(this._subscriptions.length){
      this._subscriptions.forEach(x => x.unsubscribe());
    }

    values.forEach(x => {
      var subscription = x.rowMovedUp.subscribe(x => this.onRowMovedUp(x));
      this._subscriptions.push(subscription);
    });
    values.forEach(x => {
      var subscription = x.rowMovedDown.subscribe(x => this.onRowMovedDown(x))
      this._subscriptions.push(subscription);
    });
  }

  constructor() { }

  onRowMovedUp(rowValue: any) {
    var currentIndex = this._orderedValues.findIndex(v => v == rowValue);
    var swapValue = this._orderedValues[currentIndex - 1];

    this._orderedValues[currentIndex] = swapValue;
    this._orderedValues[currentIndex - 1] = rowValue;

    this.orderChanged.emit({ changedValue: rowValue, orderedValues: this._orderedValues });
  }

  onRowMovedDown(rowValue: any) {
    var currentIndex = this._orderedValues.findIndex(v => v == rowValue);
    var swapValue = this._orderedValues[currentIndex + 1];

    this._orderedValues[currentIndex] = swapValue;
    this._orderedValues[currentIndex + 1] = rowValue;

    this.orderChanged.emit({ changedValue: rowValue, orderedValues: this._orderedValues });
  }
}
