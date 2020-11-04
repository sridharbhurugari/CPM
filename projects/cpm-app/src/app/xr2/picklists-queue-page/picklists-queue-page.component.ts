import { Component, OnInit } from '@angular/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { Observable } from 'rxjs';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { map, shareReplay } from 'rxjs/operators';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import * as _ from 'lodash';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';

@Component({
  selector: 'app-picklists-queue-page',
  templateUrl: './picklists-queue-page.component.html',
  styleUrls: ['./picklists-queue-page.component.scss']
})
export class PicklistsQueuePageComponent implements OnInit {

  picklistsQueueItems: Observable<IPicklistQueueItem[]>;

  constructor(private picklistsQueueService: PicklistsQueueService,
    private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
    ) {
      this.configureEventHandlers();
   }

  ngOnInit() {
    this.loadPicklistsQueueItems();
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }

    this.picklistQueueEventConnectionService.reloadPicklistQueueItemsSubject
      .subscribe(() => this.onReloadPicklistQueueItems());
  }

  private onReloadPicklistQueueItems(): void {
    try {
      this.loadPicklistsQueueItems();
    } catch (e) {
      console.log('PicklistsQueuePageComponent.configurePicklistEventHandlers ERROR');
      console.log(e);
    }
  }

  private loadPicklistsQueueItems(): void {
    this.picklistsQueueItems = this.picklistsQueueService.get().pipe(map(x => {
      const displayObjects = x.map(picklistQueueItem => new PicklistQueueItem(picklistQueueItem));
      return displayObjects;
    }), shareReplay(1));
  }
}
