import { Component, OnInit, Output } from '@angular/core';
import { IPopupWindowContainer } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { IQuantityEditorPopupData } from '../../model/i-quantity-editor-popup-data';

@Component({
  selector: 'app-quantity-editor-popup',
  templateUrl: './quantity-editor-popup.component.html',
  styleUrls: ['./quantity-editor-popup.component.scss']
})
export class QuantityEditorPopupComponent implements OnInit, IPopupWindowContainer {

  data: IQuantityEditorPopupData;
  packsToPick: number;
  quantityToPick: number;

  @Output()
  dismiss: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.packsToPick = 0
    this.pickQtyChanged();
  }

  cancel() {
    this.dismiss.next(false);
  }

  continue() {
    this.data.requestedQuantity = this.quantityToPick;
    this.dismiss.next(true);
  }

  pickQtyChanged() {
    this.quantityToPick = this.packsToPick * this.data.packSize;
  }
}
