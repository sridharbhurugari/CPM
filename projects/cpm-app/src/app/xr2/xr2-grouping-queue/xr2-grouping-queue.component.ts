import { Component, Input, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { nameof } from '../../shared/functions/nameof';
import * as _ from 'lodash';
import { SingleselectRowItem, OcSingleselectDropdownComponent } from '@omnicell/webcorecomponents';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { WindowService } from '../../shared/services/window-service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
import { NavigationExtras, Router } from '@angular/router';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { PicklistQueueGrouped } from '../model/picklist-queue-grouped';
import { DestinationTypes } from '../../shared/constants/destination-types';
import { Observable } from 'rxjs';
import { IPicklistQueueGrouped } from '../../api-xr2/data-contracts/i-picklist-queue-grouped';

@Component({
  selector: 'app-xr2-grouping-queue',
  templateUrl: './xr2-grouping-queue.component.html',
  styleUrls: ['./xr2-grouping-queue.component.scss']
})
export class Xr2GroupingQueueComponent implements OnInit {

  @Output() failedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() releaseEvent: EventEmitter<PicklistQueueGrouped> = new EventEmitter<PicklistQueueGrouped>();

  @Input()
  set loadedPicklistQueueGrouped(value: PicklistQueueGrouped[]) {
    this._loadedPicklistQueueGrouped = value;
    this.picklistQueueGrouped = value;
    if (value && this.selectedDeviceInformation) {
      this.filterPicklistQueueGroupedByDeviceId(this.selectedDeviceInformation.DeviceId);
    }
  }

  get loadedPicklistQueueGrouped(): PicklistQueueGrouped[] {
    return this._loadedPicklistQueueGrouped;
  }

  @Input()
  set picklistQueueGrouped(value: PicklistQueueGrouped[]) {
    this._picklistQueueGrouped = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }
  get picklistQueueGrouped(): PicklistQueueGrouped[] {
    return this._picklistQueueGrouped;
  }

  @Input()
  set searchTextFilter(value: string) {
    this._searchTextFilter = value;
  }
  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  @Input()
  set selectedDeviceInformation(value: SelectableDeviceInfo) {
    this._selectedDeviceInformation = value;
  }
  get selectedDeviceInformation(): SelectableDeviceInfo {
    return this._selectedDeviceInformation;
  }

  private _loadedPicklistQueueGrouped: PicklistQueueGrouped[];
  private _picklistQueueGrouped: PicklistQueueGrouped[];

  translationMap = {
    RELEASE: 'RELEASE',
    PRINT: 'PRINT',
    REPRINT: 'REPRINT',
    PATIENT: 'PATIENT',
    PATIENTS: 'PATIENTS',
    ITEM: 'ITEM',
    ITEMS: 'ITEMS',
    CABINET: 'CABINET',
    CABINETS: 'CABINETS',
    AREA: 'AREA',
    AREAS: 'AREAS',
  };

  readonly typePropertyName = nameof<PicklistQueueGrouped>('PriorityCodeDescription');
  readonly sequenceOrderPropertyName = nameof<PicklistQueueGrouped>('SequenceOrder');
  readonly destinationPropertyName = nameof<PicklistQueueGrouped>('Destination');
  readonly deviceDescriptionPropertyName = nameof<PicklistQueueGrouped>('DeviceDescription');
  readonly newPropertyName = nameof<PicklistQueueGrouped>('NewCount');
  readonly releasedPropertyName = nameof<PicklistQueueGrouped>('ReleasedCount');
  firstTime = true;

  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;
  _searchTextFilter;
 _selectedDeviceInformation;

  translatables = [
    'OF'
  ];
  translations$: Observable<any>;

  searchElement: SearchBoxComponent;
  searchFields = [nameof<PicklistQueueGrouped>('Destination'), nameof<PicklistQueueGrouped>('PriorityCodeDescription'),
    , nameof<PicklistQueueGrouped>('DeviceDescription')];

  @ViewChild('outputDeviceSingleSelect', { static: true })
  outputDeviceSingleSelect: OcSingleselectDropdownComponent;

  constructor(
    private windowService: WindowService,
    private translateService: TranslateService,
    private router: Router) {
  }

  ngOnInit() {
    this.setTranslations();
    this.picklistQueueGrouped = this.loadedPicklistQueueGrouped;
  }

  onReleaseClick(picklistQueueGrouped: PicklistQueueGrouped) {
    this.releaseEvent.emit(picklistQueueGrouped);
  }

  onDetailsClick(picklistQueueGrouped: PicklistQueueGrouped): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        pickPriorityIdentity: picklistQueueGrouped.PickPriorityIdentity,
        deviceId: picklistQueueGrouped.DeviceId
       },
      fragment: 'anchor'
    };

    this.router.navigate(['/xr2/xr2Queue/details'], navigationExtras);
  }

  getActiveOutputDeviceList(picklistQueueGrouped: PicklistQueueGrouped) {
    const outputDeviceDisplayList = [];
    _.forEach(picklistQueueGrouped.AvailableOutputDeviceList, (outputDevice) => {
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

  getReleaseButtonProperties(picklistQueueGrouped: PicklistQueueGrouped) {
    return {
      disabled : picklistQueueGrouped.Saving
      ||  !this.getSelectedOutputDeviceRow(picklistQueueGrouped)
      || picklistQueueGrouped.NewCount < 1,
      text: this.translationMap.RELEASE
    };
  }

  getSelectedOutputDeviceRow(picklistQueueGrouped: PicklistQueueGrouped) {
    let selectedDevice = null;
    selectedDevice = picklistQueueGrouped.AvailableOutputDeviceList.find(x => x.DeviceId === picklistQueueGrouped.OutputDeviceId
        && x.IsActive);

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
  onOutputDeviceSelectionChanged($event, picklistQueueGrouped: PicklistQueueGrouped) {
    picklistQueueGrouped.OutputDeviceId = $event.value;
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.picklistQueueGrouped = this.sort(this.picklistQueueGrouped, event.SortDirection);
  }

  sort(picklistGrouped: PicklistQueueGrouped[], sortDirection: Many<boolean | 'asc' | 'desc'>): PicklistQueueGrouped[] {
    return _.orderBy(picklistGrouped, x => x[this.currentSortPropertyName], sortDirection);
  }

  getCountLabel(itemCount: number, destinationType: string) {
    let label = '';
    switch (destinationType) {
      case DestinationTypes.Patient: {
          label = itemCount === 1 ? this.translationMap.PATIENT : this.translationMap.PATIENTS;
          break;
      }
      case DestinationTypes.Omni: {
        label = itemCount === 1 ? this.translationMap.CABINET : this.translationMap.CABINETS;
        break;
      }
      case DestinationTypes.Area: {
        label = itemCount === 1 ? this.translationMap.AREA : this.translationMap.AREAS;
        break;
      }
    }
    return label;
  }

  getAreaCountLabel(areaCount: number) {
    let label = '';

    label = areaCount === 1 ? this.translationMap.AREA : this.translationMap.AREAS;
    return label;
  }

  filterPicklistQueueGroupedByDeviceId(deviceId: number) {
    this.picklistQueueGrouped = this.loadedPicklistQueueGrouped.filter((groupedItem) => groupedItem.DeviceId === deviceId);
  }

  updatePickListQueueGroupedGrouping(picklistGrouped: IPicklistQueueGrouped) {
    console.log('updatePickListQueueGroupedGrouping');
    console.log(picklistGrouped);
    const matchingGrouped = _.findIndex(this.picklistQueueGrouped, (x) => {
      return x.PriorityCode === picklistGrouped.PriorityCode && x.DeviceId === picklistGrouped.DeviceId;
     });
    console.log(matchingGrouped);
    if (matchingGrouped < 0) {
      console.log('PickListGrouped Not Found. Adding Entry');
      this.picklistQueueGrouped.push(new PicklistQueueGrouped(picklistGrouped));
     } else {
       console.log('match found updating record');
       this.picklistQueueGrouped[matchingGrouped] = new PicklistQueueGrouped(picklistGrouped);
     }
  }

  removePicklistQueueGroup(priorityCode: string, deviceId: number ) {
    console.log('looking to remove group ' + priorityCode + ' and deviceId : ' + deviceId);
    const matchingGroupedIndex = _.findIndex(this.picklistQueueGrouped, (x) => {
      return x.PriorityCode === priorityCode && x.DeviceId === deviceId;
     });
    if (matchingGroupedIndex > -1) {
      console.log('group exists removing it');
      this.picklistQueueGrouped.splice(matchingGroupedIndex, 1);
      console.log(this.picklistQueueGrouped);
    }
  }

  refreshDataOnScreen(picklistGroupedList: IPicklistQueueGrouped[]) {
      console.log('refreshDataOnScreen');
      console.log('Current List');
      console.log(this.picklistQueueGrouped);
      console.log('New List for screen');
      console.log(picklistGroupedList);
      if (!picklistGroupedList) {
          console.log('No item in list clearing');
          this.picklistQueueGrouped = [];
          console.log(this.picklistQueueGrouped);
      } else {
          // Remove Items not in source list.
          for (let i = this.picklistQueueGrouped.length - 1; i >= 0; i--) {
            const resIndex = _.findIndex(picklistGroupedList,
               (y) => this.picklistQueueGrouped[i].PriorityCode === y.PriorityCode
                &&  this.picklistQueueGrouped[i].DeviceId === y.DeviceId);
            if (resIndex === -1) {
                console.log('item below was not found adding to list to remove.');
                this.picklistQueueGrouped.splice(i, 1);
            }
          }

          console.log('Removed Non matching Items.');
          console.log(this.picklistQueueGrouped);

          // Add or Update
          picklistGroupedList.forEach((x) => {
              this.updatePickListQueueGroupedGrouping(x);
          });
      }
  }

  loadAllPicklistQueueGrouped() {
    this.picklistQueueGrouped = this.loadedPicklistQueueGrouped;
  }

  private setTranslations() {
    this.translations$ = this.translateService.get(this.translatables);
  }
}
