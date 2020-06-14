import { Component, OnInit, Input } from '@angular/core';
import { QuickPickDispenseBox } from './../model/quick-pick-dispense-box';
import { QuickPickPicklistItem } from '../model/quick-pick-picklist-item';

@Component({
  selector: 'app-quick-pick-scroll-view',
  templateUrl: './quick-pick-scroll-view.component.html',
  styleUrls: ['./quick-pick-scroll-view.component.scss']
})
export class QuickPickScrollViewComponent implements OnInit {

  _dispenseBox: QuickPickDispenseBox;

  @Input()
  set dispenseBox(value: QuickPickDispenseBox) {
    this._dispenseBox = value;
  }

  get dispenseBox(): QuickPickDispenseBox {
    return this._dispenseBox;
  }

  picklistItems: QuickPickPicklistItem[]; // Mock list

  constructor() {
    // Mock list
    this.picklistItems = [
      {
        Label: 'Docusate Sodium 100 MG Tablet',
        FilledQty: 3,
        ReqQty: 5
      },
      {
        Label: 'Docusate Sodium 100 MG Tablet',
        FilledQty: 3,
        ReqQty: 5
      },
      {
        Label: 'Docusate Sodium 100 MG Tablet',
        FilledQty: 5,
        ReqQty: 5
      },
      {
        Label: 'Docusate Sodium 100 MG Tablet',
        FilledQty: 5,
        ReqQty: 5
      },
      {
        Label: 'Docusate Sodium 100 MG Tablet',
        FilledQty: 5,
        ReqQty: 5
      },
      {
        Label: 'Docusate Sodium 100 MG Tablet',
        FilledQty: 5,
        ReqQty: 5
      },
      {
        Label: 'Docusate Sodium 100 MG Tablet',
        FilledQty: 5,
        ReqQty: 5
      }
    ];
  }

  ngOnInit() {
  }

}
