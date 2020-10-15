import { Component, OnInit } from '@angular/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { Observable, forkJoin, merge } from 'rxjs';
import { map, flatMap, shareReplay } from 'rxjs/operators';
import { PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';
import { PicklistQueueGrouped } from '../model/picklist-queue-grouped';
import * as _ from 'lodash';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { TranslateService } from '@ngx-translate/core';
import { IPicklistQueueGrouped } from '../../api-xr2/data-contracts/i-picklist-queue-grouped';

@Component({
  selector: 'app-xr2-queue-grouping-page',
  templateUrl: './xr2-queue-grouping-page.component.html',
  styleUrls: ['./xr2-queue-grouping-page.component.scss']
})
export class Xr2QueueGroupingPageComponent implements OnInit {

  picklistsQueueGrouped: Observable<IPicklistQueueGrouped[]>;
  searchTextFilter: string;

  translatables = [
    'YES',
    'NO',
    'REROUTE',
    'XR2_QUEUE_REROUTE_PRIORITY_DIALOG_MESSAGE',
    'FAILEDTOREROUTE_HEADER_TEXT',
    'FAILEDTOREROUTE_BODY_TEXT',
  ];
  translations$: Observable<any>;

  constructor(private picklistsQueueService: PicklistsQueueService,
              private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
              private translateService: TranslateService,
              private dialogService: PopupDialogService
    ) {
      this.configureEventHandlers();
   }

  ngOnInit() {
    this.setTranslations();
    this.loadPicklistsQueueGrouped();
  }

  onSearchTextFilter(filterText: string) {
    this.searchTextFilter = filterText;
  }

  processRelease(picklistQueueGrouped: PicklistQueueGrouped) {
    picklistQueueGrouped.Saving = true;
    this.picklistsQueueService.sendToRobotGrouped(picklistQueueGrouped).subscribe(
      result => {
        picklistQueueGrouped.Saving = false;
      }, result => {
        picklistQueueGrouped.Saving = false;
        this.displayFailedToSaveDialog();
      });
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }

    this.picklistQueueEventConnectionService.reloadPicklistQueueItemsSubject
      .subscribe(() => this.loadPicklistsQueueGrouped());
  }

  private loadPicklistsQueueGrouped(): void {
    this.picklistsQueueGrouped = this.picklistsQueueService.getGrouped().pipe(map(x => {
      const displayObjects = x.map(picklistQueueGrouped => new PicklistQueueGrouped(picklistQueueGrouped));
      console.log(displayObjects);
      return displayObjects;
    }), shareReplay(1));
  }

  private setTranslations() {
    this.translations$ = this.translateService.get(this.translatables);
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
}
