import { Component, OnInit } from '@angular/core';
import { IQuickPickDrawer } from '../../api-xr2/data-contracts/i-quick-pick-drawer';
import { IQuickPickDispenseBox } from '../../api-xr2/data-contracts/i-quick-pick-dispense-box';
import { Observable } from 'rxjs';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { map, shareReplay } from 'rxjs/operators';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';

@Component({
  selector: 'app-quick-pick-page',
  templateUrl: './quick-pick-page.component.html',
  styleUrls: ['./quick-pick-page.component.scss']
})
export class QuickPickPageComponent implements OnInit {

  quickpickDrawers: IQuickPickDrawer[];
  quickPickDispenseBoxes: IQuickPickDispenseBox[];
  quickPickQueueItems: Observable<QuickPickQueueItem[]>;

  constructor(private quickPickQueueService: Xr2QuickPickQueueService) {
    // Drawer mock list
    const drawerMockList = [
      {
        Id: '1',
        Status: 'Available', // 'Ready',
        QuickPickDispenseBoxes: null, // [boxMockList[1]],
        DetailedView: false,
        CurrentBoxIndex: 0
      },
      {
        Id: '2',
        Status: 'Available',
        QuickPickDispenseBoxes: null,
        DetailedView: false,
        CurrentBoxIndex: 0
      },
      {
        Id: '3',
        Status: 'Available', // 'Not Available',
        QuickPickDispenseBoxes: null, // [boxMockList[3]],
        DetailedView: false,
        CurrentBoxIndex: 0
      },
      {
        Id: '4',
        Status: 'Available',
        QuickPickDispenseBoxes: null,
        DetailedView: false,
        CurrentBoxIndex: 0
      },
      {
        Id: '5',
        Status: 'Available', // 'Pending',
        QuickPickDispenseBoxes: null, // [boxMockList[5]],
        DetailedView: false,
        CurrentBoxIndex: 0
      },
      {
        Id: '6',
        Status: 'Available', // 'Ready',
        QuickPickDispenseBoxes: null, // [boxMockList[4]],
        DetailedView: false,
        CurrentBoxIndex: 0
      }
    ];

    this.quickpickDrawers = drawerMockList;
  }

  ngOnInit() {
    this.loadPicklistsQueueItems();
  }

  private loadPicklistsQueueItems(): void {
    this.quickPickQueueItems = this.quickPickQueueService.get(6).pipe(map(x => {
      const displayObjects = x.map(queueItem => new QuickPickQueueItem(queueItem));
      return displayObjects;
    }), shareReplay(1));
  }

}
