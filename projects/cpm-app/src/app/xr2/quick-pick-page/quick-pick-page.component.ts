import { Component, OnInit, ViewChild } from '@angular/core';
import { QuickPickDrawerData } from './../model/quick-pick-drawer-data';
import { Observable, of } from 'rxjs';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { SearchBoxComponent, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { Xr2QuickPickQueueDeviceService } from '../../api-xr2/services/xr2-quick-pick-queue-device.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { result } from 'lodash';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quick-pick-page',
  templateUrl: './quick-pick-page.component.html',
  styleUrls: ['./quick-pick-page.component.scss']
})
export class QuickPickPageComponent implements OnInit {

  quickpickDrawers: Observable<QuickPickDrawerData[]>;
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
    private quickPickDrawerService: Xr2QuickPickDrawerService,
    private windowService: WindowService,
    private ocapHttpConfigurationService: OcapHttpConfigurationService) {

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
      this.loadDrawersData();
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

  private loadPicklistsQueueItems(): void {
    if (!this.selectedDeviceId) {
      return;
    }

    this.quickPickQueueItems = this.quickPickQueueService.get(this.selectedDeviceId).pipe(map(x => {
      const displayObjects = x.map(queueItem => new QuickPickQueueItem(queueItem));
      return displayObjects;
    }), shareReplay(1));
  }

  private loadDrawersData() {
    if (!this.selectedDeviceId) {
      return;
    }

    this.quickpickDrawers = this.quickPickDrawerService.getDrawers(this.selectedDeviceId).pipe(map(x => {
      const data = x.map(drawerData => new QuickPickDrawerData(drawerData));
      return data;
    }), shareReplay(1));
  }

}
