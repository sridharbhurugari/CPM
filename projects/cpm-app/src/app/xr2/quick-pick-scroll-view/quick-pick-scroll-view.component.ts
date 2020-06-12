import { Component, OnInit, Input } from '@angular/core';
import { QuickPickDispenseBox } from './../model/quick-pick-dispense-box';

@Component({
  selector: 'app-quick-pick-scroll-view',
  templateUrl: './quick-pick-scroll-view.component.html',
  styleUrls: ['./quick-pick-scroll-view.component.scss']
})
export class QuickPickScrollViewComponent implements OnInit {

  @Input() dispenseBox: QuickPickDispenseBox;
  picklistItems: any[]; // Mock list

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
