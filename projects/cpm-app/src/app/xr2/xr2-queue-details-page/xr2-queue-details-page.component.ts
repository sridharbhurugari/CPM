import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, forkJoin, merge } from 'rxjs';
import { map, flatMap, shareReplay } from 'rxjs/operators';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import * as _ from 'lodash';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';

import { TranslateService } from '@ngx-translate/core';
import { PopupDialogType, PopupDialogProperties, PopupDialogService } from '@omnicell/webcorecomponents';
import { release } from 'os';

@Component({
  selector: 'app-xr2-queue-details-queue-page',
  templateUrl: './xr2-queue-details-page.component.html',
  styleUrls: ['./xr2-queue-details-page.component.scss']
})
export class Xr2QueueDetailsPageComponent implements OnInit {
  picklistsQueueItems: Observable<IPicklistQueueItem[]>;
  releaseAllDisabled: boolean;
  printAllDisabled: boolean;
  rerouteAllDisabled: boolean;

  searchTextFilter: string;
  translatables = [
    'OK',
    'FAILEDTOSAVE_HEADER_TEXT',
    'FAILEDTOSAVE_BODY_TEXT',
  ];
  translations$: Observable<any>;

  constructor(
    private picklistsQueueService: PicklistsQueueService,
    private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
    private location: Location,
    private translateService: TranslateService,
    private dialogService: PopupDialogService
    ) {
      this.configureEventHandlers();
  }

  ngOnInit() {
    this.setTranslations();
    this.loadPicklistsQueueItems();
  }

  onSearchTextFilter(filterText: string) {
    this.searchTextFilter = filterText;
  }

  onBackClick() {
    this.location.back();
  }

  displayXr2QueueError() {
    this.displayFailedToSaveDialog();
  }

  updateButtonPannel(selectedItems: PicklistQueueItem[]) {
    let releaseEnabledScanner = selectedItems.length > 0 ? true : false;
    let printEnabledScanner = selectedItems.length > 0 ? true : false;
    let rerouteEnabledScanner = selectedItems.length > 0 ? true : false;

    _.forEach(selectedItems, (item) => {
      releaseEnabledScanner = releaseEnabledScanner && this.releasedIsEnabled(item);
      printEnabledScanner = printEnabledScanner && this.printIsEnabled(item);
      rerouteEnabledScanner = rerouteEnabledScanner && this.rerouteIsEnabled(item);
    });

    this.releaseAllDisabled = !releaseEnabledScanner;
    this.printAllDisabled = !printEnabledScanner;
    this.rerouteAllDisabled = !rerouteEnabledScanner;
  }

  private releasedIsEnabled(picklistQueueItem: PicklistQueueItem) {
    return picklistQueueItem.Status === 1;
  }

  private printIsEnabled(picklistQueueItem: PicklistQueueItem) {
    return picklistQueueItem.Status > 1 && picklistQueueItem.IsPrintable;
  }

  private rerouteIsEnabled(picklistQueueItem: PicklistQueueItem) {
    return true;
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }
    this.picklistQueueEventConnectionService.reloadPicklistQueueItemsSubject
      .subscribe(() => this.onReloadPicklistQueueItems());
  }

  private onReloadPicklistQueueItems(): void {
    this.loadPicklistsQueueItems();
  }

  private loadPicklistsQueueItems(): void {
    this.picklistsQueueItems = this.picklistsQueueService.get().pipe(map(x => {
      const displayObjects = x.map(picklistQueueItem => new PicklistQueueItem(picklistQueueItem));
      return displayObjects;
    }), shareReplay(1));
  }

   /* istanbul ignore next */
   private displayFailedToSaveDialog(): void {
    const properties = new PopupDialogProperties('Role-Status-Warning');
    this.translateService.get('FAILEDTOSAVE_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get('FAILEDTOSAVE_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
    this.translateService.get('OK').subscribe((result) => { properties.primaryButtonText = result; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 60;
    this.dialogService.showOnce(properties);
  }

  private setTranslations() {
    this.translations$ = this.translateService.get(this.translatables);
  }
}
