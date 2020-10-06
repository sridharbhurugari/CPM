import { Component, OnInit } from '@angular/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { Observable, of } from 'rxjs';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { map, shareReplay } from 'rxjs/operators';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import * as _ from 'lodash';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';

@Component({
  selector: 'app-xr2-queue-grouping-page',
  templateUrl: './xr2-queue-grouping-page.component.html',
  styleUrls: ['./xr2-queue-grouping-page.component.scss']
})
export class Xr2QueueGroupingPageComponent implements OnInit {

  picklistsQueueItems: Observable<IPicklistQueueItem[]>;
  searchTextFilter: string;

  constructor(private picklistsQueueService: PicklistsQueueService,
              private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
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
}
