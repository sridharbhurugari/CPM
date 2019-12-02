import { Component, OnInit } from '@angular/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { Observable } from 'rxjs';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';

@Component({
  selector: 'app-picklists-queue-page',
  templateUrl: './picklists-queue-page.component.html',
  styleUrls: ['./picklists-queue-page.component.scss']
})
export class PicklistsQueuePageComponent implements OnInit {

  picklistsQueueItems: Observable<IPicklistQueueItem[]>;

  constructor(private picklistsQueueService: PicklistsQueueService) { }

  ngOnInit() {
    this.picklistsQueueItems = this.picklistsQueueService.get();
  }

}
