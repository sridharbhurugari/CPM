import { Component, OnInit, ViewChild } from '@angular/core';
import { IQuickPickDrawer } from '../../api-xr2/data-contracts/i-quick-pick-drawer';
import { IQuickPickDispenseBox } from '../../api-xr2/data-contracts/i-quick-pick-dispense-box';
import { Observable, of } from 'rxjs';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { SearchBoxComponent, SingleselectRowItem, PopupDialogService, PopupDialogType, PopupDialogProperties } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { Xr2QuickPickQueueDeviceService } from '../../api-xr2/services/xr2-quick-pick-queue-device.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { result } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { IQuickPickQueueItem } from '../../api-xr2/data-contracts/i-quick-pick-queue-item';

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

  robotSelectionDisabled = false;
  outputDeviceDisplayList: SingleselectRowItem[] = [];
  defaultDeviceDisplyItem: SingleselectRowItem;
  selectedDeviceId: string;


  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;


  constructor(
    private quickPickQueueService: Xr2QuickPickQueueService,
    private quickPickDeviceService: Xr2QuickPickQueueDeviceService,
    private windowService: WindowService,
    private ocapHttpConfigurationService: OcapHttpConfigurationService,
    private translateService: TranslateService,
    private dialogService: PopupDialogService) {

    // Mock lists for testing UI
    /*---------------------------------------------------*/
    // Item Mock List
    const itemMockList = [
      {
        Label: 'Docusate Sodium 100 MG Tablet',
        FilledQty: 3,
        ReqQty: 5
      },
      {
        Label: 'Acarbose 25mg Tablet',
        FilledQty: 3,
        ReqQty: 5
      },
      {
        Label: 'Bacitracin 0.9gm packet',
        FilledQty: 5,
        ReqQty: 5
      },
      {
        Label: 'Melatonin 3mg tablet',
        FilledQty: 5,
        ReqQty: 5
      },
      {
        Label: 'Sertraline 50mg TAB',
        FilledQty: 5,
        ReqQty: 5
      },
      {
        Label: 'Ritodrine 50mg inj',
        FilledQty: 5,
        ReqQty: 5
      },
      {
        Label: 'Dacriose 15ml sol',
        FilledQty: 5,
        ReqQty: 5
      }
    ];
    // Box Mock List
    const boxMockList = [
      {
        OrderId: '4322343',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        DestinationLine1: "Nursing Area 33",
        DestinationLine2: null,
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        PicklistItems: itemMockList,
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '43243242',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        DestinationLine1: "Room 4657 South",
        DestinationLine2: "White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        PicklistItems: itemMockList,
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '312343',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        DestinationLine1: "Nursing Area 33",
        DestinationLine2: null,
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        PicklistItems: itemMockList,
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '321345437',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        DestinationLine1: "Room 4657 South",
        DestinationLine2: "White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        PicklistItems: itemMockList,
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '21324456',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        DestinationLine1: "Nursing Area 33",
        DestinationLine2: null,
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        PicklistItems: itemMockList,
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '23453367',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        DestinationLine1: "Room 4657 South ",
        DestinationLine2: "White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        PicklistItems: itemMockList,
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
        Status: 'Available',
        QuickPickDispenseBox: boxMockList[1],
        DetailedView: false,
        BoxNumber: 1,
        BoxCount: 2,
        State: 3,
        StateText: 'Ready',
        StateColor: 'green'
      },
      {
        Id: '2',
        Status: 'Available',
        QuickPickDispenseBox: null,
        DetailedView: false,
        BoxNumber: null,
        BoxCount: null,
        State: null,
        StateText: null,
        StateColor: null
      },
      {
        Id: '3',
        Status: 'Available',
        QuickPickDispenseBox: boxMockList[3],
        DetailedView: false,
        BoxNumber: 1,
        BoxCount: 3,
        State: 3,
        StateText: 'Ready',
        StateColor: 'green'
      },
      {
        Id: '4',
        Status: 'Available',
        QuickPickDispenseBox: null,
        DetailedView: false,
        BoxNumber: null,
        BoxCount: null,
        State: null,
        StateText: null,
        StateColor: null
      },
      {
        Id: '5',
        Status: 'Available',
        QuickPickDispenseBox: boxMockList[5],
        DetailedView: false,
        BoxNumber: 1,
        BoxCount: 4,
        State: 1,
        StateText: 'Return Bin To Drawer',
        StateColor: 'red'
      },
      {
        Id: '6',
        Status: 'Available',
        QuickPickDispenseBox: boxMockList[4],
        DetailedView: false,
        BoxNumber: 1,
        BoxCount: 3,
        State: 1,
        StateText: 'Return Bin To Drawer',
        StateColor: 'red'
      }
    ];

    this.quickpickDrawers = drawerMockList;
  }
  // End of Mock lists
  /*---------------------------------------------------*/

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

  onQuickPickActive(isActive: boolean) {
    this.robotSelectionDisabled = isActive;
  }

  /* istanbul ignore next */
  onDeviceSelectionChanged($event) {
    if (this.selectedDeviceId !== $event.value) {
      this.searchElement.clearSearch(null);
      this.selectedDeviceId = $event.value;
      this.loadPicklistsQueueItems();
    }
  }

  onRerouteQuickPick($event: IQuickPickQueueItem) {
    this.quickPickQueueService.reroute($event).subscribe(
      () => {
        this.loadPicklistsQueueItems();
      }, error => {
        this.displayFailedToSaveDialog();
        this.loadPicklistsQueueItems();
      });
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

  /* istanbul ignore next */
  private displayFailedToSaveDialog(): void {
    const properties = new PopupDialogProperties('Role-Status-Warning');
    this.translateService.get('FAILEDTOSAVE_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get('FAILEDTOSAVE_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'Ok';
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 60;
    this.dialogService.showOnce(properties);
  }

}
