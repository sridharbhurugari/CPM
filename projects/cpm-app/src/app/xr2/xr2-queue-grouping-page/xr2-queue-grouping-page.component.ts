import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { forkJoin, merge, Observable, Subject } from 'rxjs';
import { flatMap, map, shareReplay, takeUntil } from 'rxjs/operators';
import { PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';
import * as _ from 'lodash';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { TranslateService } from '@ngx-translate/core';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { IPicklistQueueGrouped } from '../../api-xr2/data-contracts/i-picklist-queue-grouped';
import { Xr2GroupingQueueComponent } from '../xr2-grouping-queue/xr2-grouping-queue.component';
import { PicklistQueueGrouped } from '../model/picklist-queue-grouped';
import { LogVerbosity } from 'oal-core';
import { LoggingCategory } from '../../shared/constants/logging-category';
import { LogService } from '../../api-core/services/log-service';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { IPicklistQueueGroupedListUpdateMessage } from '../../api-xr2/events/i-picklist-queue-grouped-list-update-message';
import { IPicklistQueueGroupedUpdateMessage } from '../../api-xr2/events/i-picklist-queue-grouped-update-message';

@Component({
  selector: 'app-xr2-queue-grouping-page',
  templateUrl: './xr2-queue-grouping-page.component.html',
  styleUrls: ['./xr2-queue-grouping-page.component.scss']
})
export class Xr2QueueGroupingPageComponent implements OnInit, OnDestroy {

  @Output() detailsPageContinueEvent: EventEmitter<IXr2QueueNavigationParameters> = new EventEmitter();
  @Output() xr2PageConfigurationUpdateEvent: EventEmitter<any> = new EventEmitter();

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;

  loggingComponentName = 'Xr2QueueGroupingPageComponent';
  picklistsQueueGrouped: Observable<IPicklistQueueGrouped[]>;
  searchTextFilter: string;
  selectedDeviceInformation: SelectableDeviceInfo;
  colHeaderSort: IColHeaderSortChanged;

  ngUnsubscribe = new Subject();

  @ViewChild(Xr2GroupingQueueComponent, null) childGroupingQueueComponent: Xr2GroupingQueueComponent;

  translatables = [
    'YES',
    'NO',
    'OK',
    'RELEASE',
    'XR2_QUEUE_RELEASE_PRIORITY_DIALOG_MESSAGE',
    'FAILEDTOSAVE_HEADER_TEXT',
    'FAILEDTOSAVE_BODY_TEXT',
    'FAILEDTREFRESH'
  ];
  translations$: Observable<any>;
  private _loggingCategory: string;

  constructor(private picklistsQueueService: PicklistsQueueService,
              private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
              private translateService: TranslateService,
              private dialogService: PopupDialogService,
              private logService: LogService,
    ) {
      this.configureEventHandlers();
   }

  ngOnInit() {
    try {
    this.setTranslations();
    this.loadPicklistsQueueGrouped();
    this._loggingCategory = LoggingCategory.Xr2Queue;
    } catch (e) {
      console.log('Xr2QueueGroupingPageComponent Failed in ngOnInit');
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSearchTextFilterEvent(filterText: string) {
    this.searchTextFilter = filterText;
  }

  onSortEvent(event: IColHeaderSortChanged) {
    this.colHeaderSort = event;
  }

  onDeviceSelectionChanged($event) {
    this.selectedDeviceInformation = $event;
    console.log('onDeviceSelectionChanged DeviceId: ');
    console.log(this.selectedDeviceInformation.DeviceId);
    this.childGroupingQueueComponent.loadAllPicklistQueueGrouped(this.selectedDeviceInformation);
  }

  processDetailsNavigate(params: IXr2QueueNavigationParameters) {
    const savedConfiguration = this.createSavedConfiguration();
    this.detailsPageContinueEvent.emit(params);
    this.xr2PageConfigurationUpdateEvent.emit(savedConfiguration);
  }

  processRelease(picklistQueueGrouped: PicklistQueueGrouped) {

    this.displayReleaseDialog().subscribe(result => {
      if (!result) {
        return;
      }

      const dataDetailsForLog = 'PriorityCode: ' +
        picklistQueueGrouped.PriorityCode + ', DeviceId: ' + picklistQueueGrouped.DeviceId.toString();
      console.log(dataDetailsForLog);
      this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
        this.constructor.name + ' processRelease() - sendToRobotGrouped for: ' + dataDetailsForLog);

      picklistQueueGrouped.Saving = true;
      console.log('Sending PickList Group');
      console.log(picklistQueueGrouped);
      this.picklistsQueueService.sendToRobotGrouped(picklistQueueGrouped).subscribe(
        result => {
          try {
          this.handleSendToRobotGroupedSuccess(dataDetailsForLog, picklistQueueGrouped);
          } catch (e) {
            this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
              this.constructor.name + ' processRelease() - handleSendToRobotGroupedSuccess failed: ' + e);
          }
        }, error => {
          try {
          this.handleSendToRobotGroupedError(picklistQueueGrouped);
          } catch (e) {
            this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
              this.constructor.name + ' processRelease() - handleSendToRobotGroupedError failed: ' + e);
          }
        });
    });
  }

  private handleSendToRobotGroupedError(picklistQueueGrouped: PicklistQueueGrouped) {
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Error, this._loggingCategory,
      this.constructor.name + 'handleSendToRobotGroupedError() - Failed To Save');
    console.log('Failed to save');
    picklistQueueGrouped.Saving = false;
    this.displayFailedToSaveDialog();
  }

  private handleSendToRobotGroupedSuccess(dataDetailsForLog: string, picklistQueueGrouped: PicklistQueueGrouped) {
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this.constructor.name + ' handleSendToRobotGroupedSuccess() - sendToRobotGrouped returned for: ' + dataDetailsForLog);
    console.log('PickListGroup Sent. Refreshing Group Data');
    this.picklistsQueueService.getGroupedFiltered(
      picklistQueueGrouped.DeviceId,
      picklistQueueGrouped.PickPriorityIdentity).subscribe(getGroupedResult => {
        try {
          this.handleGetGroupedFilteredSuccess(getGroupedResult, picklistQueueGrouped);
        } catch (exception) {
          this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
            this.constructor.name + ' handleSendToRobotGroupedSuccess() - handleGetGroupedFilteredSuccess failed: ' + exception);
        }
      }, (error) => {
        try {
          this.handleGetGroupedFilteredError(picklistQueueGrouped);
        } catch (exception) {
          this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
            this.constructor.name + ' handleSendToRobotGroupedSuccess() - handleGetGroupedFilteredError failed: ' + exception);
        }
      });
  }

  private handleGetGroupedFilteredError(picklistQueueGrouped: PicklistQueueGrouped) {
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Error, this._loggingCategory,
      this.constructor.name + 'handleGetGroupedFilteredError() - Failed To Refresh Data');
    console.log('Failed to refresh data');
    picklistQueueGrouped.Saving = false;
    this.displayFailedToRefresh();
  }

  private handleGetGroupedFilteredSuccess(getGroupedResult: IPicklistQueueGrouped, picklistQueueGrouped: PicklistQueueGrouped) {
    console.log('Data Refreshed. Updating UI');
    if (!getGroupedResult) {
      picklistQueueGrouped.Saving = false;
      this.childGroupingQueueComponent.removePicklistQueueGroup(picklistQueueGrouped.PriorityCode, picklistQueueGrouped.DeviceId);
      console.log('Send Complete Item removed');
    } else {
      picklistQueueGrouped.Saving = false;
      this.UpdatePickListQueueGroupedList(new PicklistQueueGrouped(getGroupedResult));
      console.log('Send and Refresh complete.');
    }
  }

  private UpdatePickListQueueGroupedList(picklistQueueGrouped: IPicklistQueueGrouped) {
    this.childGroupingQueueComponent.updatePickListQueueGroupedGrouping(picklistQueueGrouped);
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }

    this.picklistQueueEventConnectionService.picklistQueueGroupedUpdateSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => {
        try {
          this.handlePicklistQueueGroupedUpdateSubject(x);
        } catch (e) {
          this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
            this.constructor.name + ' picklistQueueGroupedUpdateSubject - handlePicklistQueueGroupedUpdateSubject failed: ' + e);
        }
      });

    this.picklistQueueEventConnectionService.picklistQueueGroupedListUpdateSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => {
        try {
          this.handlePicklistQueueGroupedListUpdateSubject(x);
        } catch (exception) {
          this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
            `${this.constructor.name} picklistQueueGroupedListUpdateSubject - handlepicklistQueueGroupedListUpdateSubject failed: ${exception}`);
        }

      });
  }

  private handlePicklistQueueGroupedUpdateSubject(x: IPicklistQueueGroupedUpdateMessage) {
    if (!x.PicklistQueueGrouped) {
      console.log('!picklistqueuegrouped removing using priority and device');
      this.childGroupingQueueComponent.removePicklistQueueGroup(x.PriorityCode, x.DeviceId);
    } else {
      const pickListQueueGrouped = PicklistQueueGrouped.fromNonstandardJson(x.PicklistQueueGrouped);
      this.UpdatePickListQueueGroupedList(pickListQueueGrouped);
    }
  }

  private handlePicklistQueueGroupedListUpdateSubject(x: IPicklistQueueGroupedListUpdateMessage) {
    console.log('picklistQueueGroupedListUpdateSubject called');
    if (!x.PicklistQueueGroupedList.$values || x.PicklistQueueGroupedList.$values.length === 0) {
      console.log('Empty List just clear screen');
      this.childGroupingQueueComponent.refreshDataOnScreen(null);
    } else {
      const picklistQueueGroupedList = x.PicklistQueueGroupedList.$values.map((picklistQueueGrouped) => {
        return PicklistQueueGrouped.fromNonstandardJson(picklistQueueGrouped);
      });

      this.childGroupingQueueComponent.refreshDataOnScreen(picklistQueueGroupedList);
    }
  }

  private loadPicklistsQueueGrouped(): void {
    this.picklistsQueueGrouped = this.picklistsQueueService.getGrouped().pipe(map(x => {
      const displayObjects = x.map(picklistQueueGrouped => new PicklistQueueGrouped(picklistQueueGrouped));
      console.log('loadPicklistsQueueGrouped : ');
      console.log(displayObjects);
      return displayObjects;
    }), shareReplay(1));
  }

  private createSavedConfiguration() {
    return {
      selectedDevice: this.selectedDeviceInformation,
      searchTextFilter: this.searchTextFilter,
      colHeaderSort: this.colHeaderSort
    } as IXr2QueuePageConfiguration;
  }

  private setTranslations() {
    this.translations$ = this.translateService.get(this.translatables);
  }

  /* istanbul ignore next */
  private displayFailedToSaveDialog(): void {
    this.translations$.subscribe(translations => {
      const properties = new PopupDialogProperties('Role-Status-Warning');
      properties.titleElementText = translations.FAILEDTOSAVE_HEADER_TEXT;
      properties.messageElementText = translations.FAILEDTOSAVE_BODY_TEXT;
      properties.primaryButtonText = translations.OK;
      properties.showPrimaryButton = true;
      properties.showSecondaryButton = false;
      properties.dialogDisplayType = PopupDialogType.Error;
      properties.timeoutLength = 60;
      this.dialogService.showOnce(properties);
    });
  }

  /* istanbul ignore next */
  private displayFailedToRefresh(): void {
    this.translations$.subscribe(translations => {
      const properties = new PopupDialogProperties('Role-Status-Warning');
      properties.titleElementText = translations.FAILEDTREFRESH;
      properties.messageElementText = translations.FAILEDTREFRESH;
      properties.primaryButtonText = translations.OK;
      properties.showPrimaryButton = true;
      properties.showSecondaryButton = false;
      properties.dialogDisplayType = PopupDialogType.Error;
      properties.timeoutLength = 60;
      this.dialogService.showOnce(properties);
    });
  }

  /* istanbul ignore next */
  private displayReleaseDialog(): Observable<boolean> {
    return forkJoin(this.translations$).pipe(flatMap(r => {
      const translations = r[0];
      const properties = new PopupDialogProperties('Standard-Popup-Dialog-Font');
      properties.titleElementText = translations.RELEASE;
      properties.messageElementText = translations.XR2_QUEUE_RELEASE_PRIORITY_DIALOG_MESSAGE;
      properties.showPrimaryButton = true;
      properties.primaryButtonText = translations.YES;
      properties.showSecondaryButton = true;
      properties.secondaryButtonText = translations.NO;
      properties.primaryOnRight = false;
      properties.showCloseIcon = false;
      properties.dialogDisplayType = PopupDialogType.Info;
      properties.timeoutLength = 60;
      const component = this.dialogService.showOnce(properties);
      const primaryClick$ = component.didClickPrimaryButton.pipe(map(x => true));
      const secondaryClick$ = component.didClickSecondaryButton.pipe(map(x => false));
      return merge(primaryClick$, secondaryClick$);
    }));
  }
}
