import { Component, Input, ViewChild, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { nameof } from '../../shared/functions/nameof';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Observable, forkJoin, merge } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { SingleselectRowItem, OcSingleselectDropdownComponent, PopupDialogService, PopupDialogProperties, PopupDialogType } from '@omnicell/webcorecomponents';
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

  private _picklistQueueItems: PicklistQueueItem[];

  translationMap = {
    RELEASE: 'RELEASE',
    PRINT: 'PRINT',
    REPRINT: 'REPRINT'
  };
  translatables = [
    'YES',
    'NO',
    'REROUTE',
    'XR2_QUEUE_REROUTE_PRIORITY_DIALOG_MESSAGE',
    'FAILEDTOREROUTE_HEADER_TEXT',
    'FAILEDTOREROUTE_BODY_TEXT',
  ];
  translations$: Observable<any>;

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
    private dialogService: PopupDialogService,
    private location: Location,
    private wpfActionController: WpfActionControllerService,
    private router: Router) {
  }

  ngOnInit() {
    this.setTranslations();
  }

  back() {
    this.wpfActionController.ExecuteContinueAction();
  }

  onRerouteClick() {
    this.processReroute([]);
    // TODO: reroute all items
  }

  onReleaseClick() {
    // TODO: release all items
  }

  onDetailsClick() {
    this.router.navigate(['/xr2Queue/details']);
  }


  /* istanbul ignore next */
  trackByPickListQueueItemId(index: number, picklistQueueItem: PicklistQueueItem) {
    if (!picklistQueueItem) {
      return null;
    }
    return picklistQueueItem.TrackById;
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
      disabled : picklistQueueItem.Saving ||  !this.getSelectedOutputDeviceRow(picklistQueueItem) || picklistQueueItem.Status > 1,
      text: this.translationMap.RELEASE
    };
  }

  getSelectedOutputDeviceRow(picklistQueueItem: PicklistQueueItem) {
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

  onBackClick() {
    this.location.back();
  }

  /* istanbul ignore next */
  onOutputDeviceSelectionChanged($event, picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.OutputDeviceId = $event.value;
  }

  columnSelected(event: IColHeaderSortChanged) {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.picklistQueueItems = this.sort(this.picklistQueueItems, event.SortDirection);
  }

  sort(picklistItems: PicklistQueueItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): PicklistQueueItem[] {
    return _.orderBy(picklistItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  private processReroute(picklistQueueItem: PicklistQueueItem[]) {

    this.displayRerouteDialog().subscribe(result => {
      if (!result) {
        return;
      }
      // TODO: reroute all items in priority
    });
  }

  private resyncPickListQueueItem(picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.TrackById = Guid.create();
  }

  private setTranslations() {
    this.translations$ = this.translateService.get(this.translatables);
  }

  /* istanbul ignore next */
  private displayRerouteDialog(): Observable<boolean> {
    return forkJoin(this.translations$).pipe(flatMap(r => {
      const translations = r[0];
      const properties = new PopupDialogProperties('Standard-Popup-Dialog-Font');
      properties.titleElementText = translations.REROUTE;
      properties.messageElementText = translations.XR2_QUEUE_REROUTE_PRIORITY_DIALOG_MESSAGE;
      properties.showPrimaryButton = true;
      properties.primaryButtonText = translations.YES;
      properties.showSecondaryButton = true;
      properties.secondaryButtonText = translations.NO;
      properties.primaryOnRight = false;
      properties.showCloseIcon = false;
      properties.dialogDisplayType = PopupDialogType.Info;
      properties.timeoutLength = 0;
      let component = this.dialogService.showOnce(properties);
      let primaryClick$ = component.didClickPrimaryButton.pipe(map(x => true));
      let secondaryClick$ = component.didClickSecondaryButton.pipe(map(x => false));
      return merge(primaryClick$, secondaryClick$);
    }));
  }
}
