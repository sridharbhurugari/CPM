import { Component, OnInit } from '@angular/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { Observable } from 'rxjs';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { map, shareReplay } from 'rxjs/operators';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import * as _ from 'lodash';

@Component({
  selector: 'app-picklists-queue-page',
  templateUrl: './picklists-queue-page.component.html',
  styleUrls: ['./picklists-queue-page.component.scss']
})
export class PicklistsQueuePageComponent implements OnInit {

  picklistsQueueItems: Observable<IPicklistQueueItem[]>;

  constructor(private picklistsQueueService: PicklistsQueueService) { }

  ngOnInit() {
    this.picklistsQueueItems = this.picklistsQueueService.get().pipe(map(x => {
      const displayObjects = x.map(picklistQueueItem => new PicklistQueueItem(picklistQueueItem));
      return displayObjects;
    }), shareReplay(1));
  }

}
