import { Component, Input, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { nameof } from '../../shared/functions/nameof';
import * as _ from 'lodash';
import { SingleselectRowItem, OcSingleselectDropdownComponent, GridComponent } from '@omnicell/webcorecomponents';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { PicklistQueueGrouped } from '../model/picklist-queue-grouped';
import { DestinationTypes } from '../../shared/constants/destination-types';
import { Observable } from 'rxjs';
import { IPicklistQueueGrouped } from '../../api-xr2/data-contracts/i-picklist-queue-grouped';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-xr2-grouping-queue',
  templateUrl: './xr2-grouping-queue.component.html',
  styleUrls: ['./xr2-grouping-queue.component.scss']
})
export class Xr2GroupingQueueComponent implements OnInit {

  @Output() failedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() releaseEvent: EventEmitter<PicklistQueueGrouped> = new EventEmitter<PicklistQueueGrouped>();
  @Output() detailsEvent: EventEmitter<IXr2QueueNavigationParameters> = new EventEmitter();
  @Output() sortEvent: EventEmitter<IColHeaderSortChanged> = new EventEmitter();

  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;
  @Input()
  set unfilteredPicklistQueueGrouped(value: PicklistQueueGrouped[]) {
    this._unfilteredPicklistQueueGrouped = value;
    this.applyGroupQueueFilters();
  }

  get unfilteredPicklistQueueGrouped(): PicklistQueueGrouped[] {
    return this._unfilteredPicklistQueueGrouped;
  }

  @Input()
  set filteredPicklistQueueGrouped(value: PicklistQueueGrouped[]) {
    this._filteredPicklistQueueGrouped = value;
    if (this.filteredPicklistQueueGrouped) {
      this.loadSavedConfigurations();
    }
    this.resizeGrid();
  }
  get filteredPicklistQueueGrouped(): PicklistQueueGrouped[] {
    return this._filteredPicklistQueueGrouped;
  }

  @Input()
  set searchTextFilter(value: string) {
    if (!this.filteredPicklistQueueGrouped) {
      return;
    }
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

  private _unfilteredPicklistQueueGrouped: PicklistQueueGrouped[];
  private _filteredPicklistQueueGrouped: PicklistQueueGrouped[];

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

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;
  @ViewChild('outputDeviceSingleSelect', { static: true })
  outputDeviceSingleSelect: OcSingleselectDropdownComponent;

  constructor(
    private translateService: TranslateService) {
  }

  ngOnInit() {
    this.setTranslations();
    this.loadSavedConfigurations();
  }

  onReleaseClick(picklistQueueGrouped: PicklistQueueGrouped) {
    this.releaseEvent.emit(picklistQueueGrouped);
  }

  onDetailsClick(picklistQueueGrouped: PicklistQueueGrouped): void {
    const params: IXr2QueueNavigationParameters = {
      pickPriorityIdentity: picklistQueueGrouped.PickPriorityIdentity.toString(),
      deviceId: picklistQueueGrouped.DeviceId.toString(),
      priorityCodeDescription: picklistQueueGrouped.PriorityCodeDescription
    };

    this.detailsEvent.emit(params);
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
    this.filteredPicklistQueueGrouped = this.sort(this.filteredPicklistQueueGrouped, event.SortDirection);
    this.sortEvent.emit(event);
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

  updatePickListQueueGroupedGrouping(picklistGrouped: IPicklistQueueGrouped) {
    console.log('updatePickListQueueGroupedGrouping');
    console.log(picklistGrouped);
    const matchingGrouped = _.findIndex(this.unfilteredPicklistQueueGrouped, (x) => {
      return x.PriorityCode === picklistGrouped.PriorityCode && x.DeviceId === picklistGrouped.DeviceId;
     });
    console.log(matchingGrouped);
    if (matchingGrouped < 0) {
      console.log('PickListGrouped Not Found. Adding Entry');
      this.unfilteredPicklistQueueGrouped.push(new PicklistQueueGrouped(picklistGrouped));
     } else {
       console.log('match found updating record');
       const newPickListQueueGrouped = new PicklistQueueGrouped(picklistGrouped);
       if (!_.isEqual(
         this.unfilteredPicklistQueueGrouped[matchingGrouped].AvailableOutputDeviceList,
         newPickListQueueGrouped.AvailableOutputDeviceList )) {
          console.log('available output device list changed updating.');
          this.unfilteredPicklistQueueGrouped[matchingGrouped].AvailableOutputDeviceList =
            newPickListQueueGrouped.AvailableOutputDeviceList;
       }
       this.unfilteredPicklistQueueGrouped[matchingGrouped].NewCount = picklistGrouped.NewCount;
       this.unfilteredPicklistQueueGrouped[matchingGrouped].ReleasedCount = picklistGrouped.ReleasedCount;
       this.unfilteredPicklistQueueGrouped[matchingGrouped].AreaCount = picklistGrouped.AreaCount;
     }
    this.applyGroupQueueFilters();
  }

  removePicklistQueueGroup(priorityCode: string, deviceId: number ) {
    console.log('looking to remove group ' + priorityCode + ' and deviceId : ' + deviceId);
    const matchingGroupedIndex = _.findIndex(this.unfilteredPicklistQueueGrouped, (x) => {
      return x.PriorityCode === priorityCode && x.DeviceId === deviceId;
     });
    if (matchingGroupedIndex > -1) {
      console.log('group exists removing it');
      this.unfilteredPicklistQueueGrouped.splice(matchingGroupedIndex, 1);
      console.log(this.unfilteredPicklistQueueGrouped);
    }
    this.applyGroupQueueFilters();
  }

  refreshDataOnScreen(picklistGroupedList: IPicklistQueueGrouped[]) {
      console.log('refreshDataOnScreen');
      console.log('Current List filtered');
      console.log(this.filteredPicklistQueueGrouped);
      console.log('Current List unfiltered');
      console.log(this.unfilteredPicklistQueueGrouped);
      console.log('New List for screen');
      console.log(picklistGroupedList);
      if (!picklistGroupedList) {
          console.log('No item in list clearing');
          this.unfilteredPicklistQueueGrouped = [];
          console.log(this.unfilteredPicklistQueueGrouped);
      } else {
          // Remove Items not in source list.
          for (let i = this.unfilteredPicklistQueueGrouped.length - 1; i >= 0; i--) {
            const resIndex = _.findIndex(picklistGroupedList,
               (y) => this.unfilteredPicklistQueueGrouped[i].PriorityCode === y.PriorityCode
                &&  this.unfilteredPicklistQueueGrouped[i].DeviceId === y.DeviceId);
            if (resIndex === -1) {
                console.log('item below was not found adding to list to remove.');
                this.unfilteredPicklistQueueGrouped.splice(i, 1);
            }
          }

          console.log('Removed Non matching Items.');
          console.log(this.unfilteredPicklistQueueGrouped);

          // Add or Update
          picklistGroupedList.forEach((x) => {
              this.updatePickListQueueGroupedGrouping(x);
          });
      }
      this.applyGroupQueueFilters();
  }

  loadAllPicklistQueueGrouped(selectedDevice: SelectableDeviceInfo) {
    this.selectedDeviceInformation = selectedDevice;
    this.applyGroupQueueFilters();
  }

  /* istanbul ignore next */
  trackByPicklistQueueItemId(index: number, picklistQueueItem: PicklistQueueGrouped): Guid {
    if (!picklistQueueItem) {
      return null;
    }
    return picklistQueueItem.TrackById;
  }

  private applyGroupQueueFilters() {
    console.log('applyGroupQueueFilters');
    if (!this.selectedDeviceInformation || !this.selectedDeviceInformation.DeviceId ||
      this.selectedDeviceInformation.DeviceId === 0 || !this.unfilteredPicklistQueueGrouped) {
        this.filteredPicklistQueueGrouped = this.unfilteredPicklistQueueGrouped;
        console.log('filterPicklistQueueGroupedByDeviceId - No filter/No Data');
        return;
    }

    this.filteredPicklistQueueGrouped = this.filterByDevice(this.selectedDeviceInformation.DeviceId, this.unfilteredPicklistQueueGrouped);
  }

  private filterByDevice(deviceId: number, unfilteredArray: PicklistQueueGrouped[]) {
    console.log('filter by device id : ');
    console.log(this.selectedDeviceInformation.DeviceId);
    return unfilteredArray.filter((groupedItem) => groupedItem.DeviceId === deviceId);
  }

  private loadSavedConfigurations() {
    if (!this.savedPageConfiguration) {
      return;
    }

    if (this.savedPageConfiguration.colHeaderSort && this.filteredPicklistQueueGrouped) {
      this.columnSelected(this.savedPageConfiguration.colHeaderSort);
    }
  }

  private setTranslations() {
    this.translations$ = this.translateService.get(this.translatables);
  }

  private resizeGrid() {
    setTimeout(() => {
      if (this.ocGrid) {
        this.ocGrid.checkTableBodyOverflown();
      }
    }, 250);
  }
}
