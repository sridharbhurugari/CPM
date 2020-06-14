import { Component, OnInit, ViewChild } from '@angular/core';
import { IQuickPickDrawer } from '../../api-xr2/data-contracts/i-quick-pick-drawer';
import { IQuickPickDispenseBox } from '../../api-xr2/data-contracts/i-quick-pick-dispense-box';
import { Observable, of } from 'rxjs';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { SearchBoxComponent, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { Xr2QuickPickQueueDeviceService } from '../../api-xr2/services/xr2-quick-pick-queue-device.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';

@Component({
  selector: 'app-quick-pick-page',
  templateUrl: './quick-pick-page.component.html',
  styleUrls: ['./quick-pick-page.component.scss']
})
export class QuickPickPageComponent implements OnInit {

  quickpickDrawers: IQuickPickDrawer[];
  quickPickDispenseBoxes: IQuickPickDispenseBox[];
  quickPickQueueItems: Observable<QuickPickQueueItem[]>;
  searchTextFilter: Observable<string>;
  outputDeviceDisplayList: SingleselectRowItem[] = [];
  defaultDeviceDisplyItem: SingleselectRowItem;
  selectedDeviceId: string;

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;


  constructor(private quickPickQueueService: Xr2QuickPickQueueService,
    private quickPickDeviceService: Xr2QuickPickQueueDeviceService,
    private windowService: WindowService,
    private ocapHttpConfigurationService: OcapHttpConfigurationService) {

    // Box Mock List
    const boxMockList = [
      {
        OrderId: '4322343',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '43243242',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '312343',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '321345437',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '21324456',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '23453367',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      }
    ];

    // Drawer mock list
    const drawerMockList = [
      {
        Id: '1',
        Status: 'Available', // 'Ready',
        QuickPickDispenseBox: boxMockList[1],
        DetailedView: false,
        CurrentBoxIndex: 0,
        TotalBoxCount: 2,
        State: 1
      },
      {
        Id: '2',
        Status: 'Available',
        QuickPickDispenseBox: null,
        DetailedView: false,
        CurrentBoxIndex: null,
        TotalBoxCount: null,
        State: 1
      },
      {
        Id: '3',
        Status: 'Available', // 'Not Available',
        QuickPickDispenseBox: boxMockList[3],
        DetailedView: false,
        CurrentBoxIndex: 0,
        TotalBoxCount: 3,
        State: 3
      },
      {
        Id: '4',
        Status: 'Available',
        QuickPickDispenseBox: null,
        DetailedView: false,
        CurrentBoxIndex: null,
        TotalBoxCount: null,
        State: 1
      },
      {
        Id: '5',
        Status: 'Available', // 'Pending',
        QuickPickDispenseBox: boxMockList[5],
        DetailedView: false,
        CurrentBoxIndex: 0,
        TotalBoxCount: 4,
        State: 2
      },
      {
        Id: '6',
        Status: 'Available', // 'Ready',
        QuickPickDispenseBox: boxMockList[4],
        DetailedView: false,
        CurrentBoxIndex: 0,
        TotalBoxCount: 3,
        State: 1
      }
    ];

    this.quickpickDrawers = drawerMockList;
  }

  ngOnInit() {
    this.getActiveXr2Devices();
  }

  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = of(data);
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }

  async getActiveXr2Devices() {
    const results = await this.quickPickDeviceService.get().toPromise();
    const newList: SingleselectRowItem[] = [];

    const currentClientId = this.ocapHttpConfigurationService.get().clientId;
    let defaultFound: SingleselectRowItem;
    results.forEach(selectableDeviceInfo => {
      const selectRow = new SingleselectRowItem(selectableDeviceInfo.Description, selectableDeviceInfo.DeviceId.toString());
      newList.push(selectRow);

      if (!defaultFound && selectableDeviceInfo.CurrentLeaseHolder.toString() === currentClientId) {
        defaultFound = selectRow;
      }
    });

    this.outputDeviceDisplayList = newList;

    if (defaultFound) {
      this.selectedDeviceId = defaultFound.value;
      this.defaultDeviceDisplyItem = this.outputDeviceDisplayList.find(x => x.value === this.selectedDeviceId);
      this.loadPicklistsQueueItems();
    }
  }

  /* istanbul ignore next */
  onDeviceSelectionChanged($event) {
    if (this.selectedDeviceId !== $event.value) {
      this.selectedDeviceId = $event.value;
      this.loadPicklistsQueueItems();
    }
  }

  private loadPicklistsQueueItems(): void {
    if (!this.selectedDeviceId) {
      return;
    }

    this.quickPickQueueItems = this.quickPickQueueService.get(this.selectedDeviceId).pipe(map(x => {
      const displayObjects = x.map(queueItem => new QuickPickQueueItem(queueItem));
      return displayObjects;
    }), shareReplay(1));
  }

}
