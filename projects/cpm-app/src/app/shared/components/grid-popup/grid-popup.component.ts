import { Component, OnInit, Output } from '@angular/core';
import { IPopupWindowContainer } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { IGridPopupData } from '../../model/i-grid-popup-data';

@Component({
  selector: 'app-grid-popup',
  templateUrl: './grid-popup.component.html',
  styleUrls: ['./grid-popup.component.scss']
})
export class GridPopupComponent<T> implements OnInit, IPopupWindowContainer {

  @Output() dismiss: Subject<boolean> = new Subject<boolean>();

  data: IGridPopupData<T>; // T is the type that will be used for the grid

  private _whiteHex = "#FFFFFF";
  private _lightGreyHex = "#E9E9E9";

  constructor() { }

  ngOnInit() {
  }

  cancel(): void {
    this.dismiss.next(false);
  }

  primaryButtonClick(): void {
    this.dismiss.next(true);
  }

  secondaryButtonClick(): void {
    this.dismiss.next(false);
  }

  getGridColumnWidths(): string {
    let styleString = [];
    this.data.columnDefinition.forEach((column) => {
      styleString.push(column.width);
    });

    return styleString.join(' ');
  }

  getRowColor(index): string {
    return index % 2 === 0 ? this._whiteHex: this._lightGreyHex;
  }
}
