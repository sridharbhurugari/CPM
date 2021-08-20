import { Component, OnInit, Output } from '@angular/core';
import { IPopupWindowContainer } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { IGridPopupData } from '../../model/i-grid-popup-data';

@Component({
  selector: 'app-grid-popup',
  templateUrl: './grid-popup.component.html',
  styleUrls: ['./grid-popup.component.scss']
})
export class GridPopupComponent implements OnInit, IPopupWindowContainer {

  @Output() dismiss: Subject<boolean> = new Subject<boolean>();

  data: IGridPopupData;

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.dismiss.next(false);
  }

  continue() {
    this.dismiss.next(false);
  }
}
