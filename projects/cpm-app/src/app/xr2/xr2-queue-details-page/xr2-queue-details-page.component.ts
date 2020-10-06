import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { map, shareReplay } from 'rxjs/operators';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import * as _ from 'lodash';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
@Component({
  selector: 'app-xr2-queue-details-queue-page',
  templateUrl: './xr2-queue-details-page.component.html',
  styleUrls: ['./xr2-queue-details-page.component.scss']
})
export class Xr2QueueDetailsPageComponent implements OnInit {
  picklistsQueueItems: Observable<IPicklistQueueItem[]>;
  searchTextFilter: string;

  constructor(
    private picklistsQueueService: PicklistsQueueService,
    private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
    private location: Location
    ) {
      this.configureEventHandlers();
  }

  ngOnInit() {
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
}
