import { Component, Input, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { nameof } from '../../shared/functions/nameof';
import * as _ from 'lodash';
import { SingleselectRowItem, OcSingleselectDropdownComponent } from '@omnicell/webcorecomponents';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { TranslateService } from '@ngx-translate/core';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WindowService } from '../../shared/services/window-service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-xr2-grouping-queue',
  templateUrl: './xr2-grouping-queue.component.html',
  styleUrls: ['./xr2-grouping-queue.component.scss']
})
export class Xr2GroupingQueueComponent implements OnInit {

  @Output() failedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() rerouteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() releaseEvent: EventEmitter<any> = new EventEmitter<any>();


  private _picklistQueueItems: PicklistQueueItem[];

  translationMap = {
    RELEASE: 'RELEASE',
    PRINT: 'PRINT',
    REPRINT: 'REPRINT'
  };

  readonly typePropertyName = nameof<PicklistQueueItem>('PriorityCodeDescription');
  readonly sequenceOrderPropertyName = nameof<PicklistQueueItem>('SequenceOrder');
  readonly destinationPropertyName = nameof<PicklistQueueItem>('Destination');
  readonly itemPropertyName = nameof<PicklistQueueItem>('ItemCount');
  readonly deviceDescriptionPropertyName = nameof<PicklistQueueItem>('DeviceDescription');
  firstTime = true;

  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;
  _searchTextFilter;

  @Input()
  set picklistQueueItems(value: PicklistQueueItem[]) {
    this._picklistQueueItems = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }
  get picklistQueueItems(): PicklistQueueItem[] {
    return this._picklistQueueItems;
  }

  @Input()
  set searchTextFilter(value: string) {
    this._searchTextFilter = value;
  }
  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  searchElement: SearchBoxComponent;
  searchFields = [nameof<PicklistQueueItem>('Destination'), nameof<PicklistQueueItem>('PriorityCodeDescription'),
    , nameof<PicklistQueueItem>('DeviceDescription')];

  @ViewChild('outputDeviceSingleSelect', { static: true })
  outputDeviceSingleSelect: OcSingleselectDropdownComponent;


  constructor(
    private windowService: WindowService,
    private translateService: TranslateService,
    private router: Router) {
  }

  ngOnInit() {
  }

  onReleaseClick(): void {
    this.releaseEvent.emit();
  }

  onDetailsClick(): void {
    this.router.navigate(['/xr2/xr2Queue/details']);
  }

  getActiveOutputDeviceList(picklistQueueItem: PicklistQueueItem) {
    const outputDeviceDisplayList = [];
    _.forEach(picklistQueueItem.AvailableOutputDeviceList, (outputDevice) => {
      if (outputDevice.IsActive) {
        let translatedLabel = '';
        this.translateService.get(outputDevice.Label).subscribe((res: string) => {
        translatedLabel = res;
      });
        outputDeviceDisplayList.push(new SingleselectRowItem(translatedLabel, outputDevice.DeviceId));
      }
    });
    return outputDeviceDisplayList;
  }

  getReleaseButtonProperties(picklistQueueItem: PicklistQueueItem) {
    return {
      disabled : !picklistQueueItem.Releaseable ||  !this.getSelectedOutputDeviceRow(picklistQueueItem),
      text: this.translationMap.RELEASE
    };
  }

  getSelectedOutputDeviceRow(picklistQueueItem: PicklistQueueItem): SingleselectRowItem {
    let selectedDevice = null;
    if (picklistQueueItem.Status === 1) {
      selectedDevice = picklistQueueItem.AvailableOutputDeviceList.find(x => x.DeviceId === picklistQueueItem.OutputDeviceId
         && x.IsActive);
    } else {
      selectedDevice = picklistQueueItem.AvailableOutputDeviceList.find(x => x.DeviceId === picklistQueueItem.OutputDeviceId);
    }
    if (!selectedDevice) {
      return null;
    }
    let translatedLabel = '';
    this.translateService.get(selectedDevice.Label).subscribe((res: string) => {
      translatedLabel = res;
    });

    return new SingleselectRowItem(translatedLabel, selectedDevice.DeviceId);
  }

  /* istanbul ignore next */
  onOutputDeviceSelectionChanged($event, picklistQueueItem: PicklistQueueItem): void {
    picklistQueueItem.OutputDeviceId = $event.value;
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.picklistQueueItems = this.sort(this.picklistQueueItems, event.SortDirection);
  }

  sort(picklistItems: PicklistQueueItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): PicklistQueueItem[] {
    return _.orderBy(picklistItems, x => x[this.currentSortPropertyName], sortDirection);
  }
}
