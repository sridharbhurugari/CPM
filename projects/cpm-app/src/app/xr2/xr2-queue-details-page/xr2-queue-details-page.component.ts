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

@Component({
  selector: 'app-xr2-queue-details-queue-page',
  templateUrl: './xr2-queue-details-page.component.html',
  styleUrls: ['./xr2-queue-details-page.component.scss']
})
export class Xr2QueueDetailsPageComponent implements OnInit {
  picklistsQueueItems: Observable<IPicklistQueueItem[]>;
  searchTextFilter: string;
  translatables = [
    'YES',
    'NO',
    'OK',
    'REROUTE',
    'PRINTFAILED_HEADER_TEXT',
    'PRINTFAILED_BODY_TEXT',
    'FAILEDTOREROUTE_HEADER_TEXT',
    'FAILEDTOREROUTE_BODY_TEXT',
    'FAILEDTOSAVE_HEADER_TEXT',
    'FAILEDTOSAVE_BODY_TEXT',
    'XR2_QUEUE_REROUTE_DIALOG_MESSAGE'
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

  onBackClick() {
    this.location.back();
  }

  reroutePicklistItems($event: any) {
    const itemsToReroute = $event;
    if (itemsToReroute.length > 1) {
      this.rerouteMultipleItems(itemsToReroute);
    } else {
      this.rerouteItem(itemsToReroute[0]);
    }
  }

  private rerouteMultipleItems(picklistQueueItem: PicklistQueueItem[]) {

    this.displayRerouteDialog().subscribe(result => {
      if (!result) {
        return;
      }

      // TODO: reroute selected items
      // this.quickPickQueueService.reroute($event).subscribe(
      //   () => {
      //     this.loadPicklistsQueueItems();
      //     this.loadDrawersData();
      //   }, error => {
      //     this.displayQuickPickError(QuickPickError.RerouteFailure);
      //     this.loadPicklistsQueueItems();
      //     this.loadDrawersData();
      //   });
    });
  }

  private rerouteItem(picklistQueueItem: PicklistQueueItem) {
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

    /* istanbul ignore next */
    private displayRerouteDialog(): Observable<boolean> {
      return forkJoin(this.translations$).pipe(flatMap(r => {
        const translations = r[0];
        const properties = new PopupDialogProperties('Standard-Popup-Dialog-Font');
        properties.titleElementText = translations.REROUTE;
        properties.messageElementText = translations.XR2_QUEUE_REROUTE_DIALOG_MESSAGE;
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

    private setTranslations() {
      this.translations$ = this.translateService.get(this.translatables);
    }
}
