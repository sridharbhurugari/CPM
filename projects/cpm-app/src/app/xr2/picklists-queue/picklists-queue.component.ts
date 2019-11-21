import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { WindowService } from '../../shared/services/window-service';
import { nameof } from '../../shared/functions/nameof';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';

@Component({
  selector: 'app-picklists-queue',
  templateUrl: './picklists-queue.component.html',
  styleUrls: ['./picklists-queue.component.scss']
})
export class PicklistsQueueComponent implements AfterViewInit {

  private _picklistQueueItems: IPicklistQueueItem[];

  @Input()
  set picklistQueueItems(value: IPicklistQueueItem[]) {
    this._picklistQueueItems = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  get picklistQueueItems(): IPicklistQueueItem[] {
    return this._picklistQueueItems;
  }

  constructor(private windowService: WindowService) { }

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  searchTextFilter: string;

  searchFields = [nameof<IPicklistQueueItem>('Destination'), nameof<IPicklistQueueItem>('PriorityCodeDescription'),
  , nameof<IPicklistQueueItem>('DeviceDescription'), , nameof<IPicklistQueueItem>('OutputDevice')]

  ngAfterViewInit(): void {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = data;
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }

  changeStatus(picklistQueueItem: IPicklistQueueItem, newStatus: string) {
    picklistQueueItem.Status = newStatus;

    if (newStatus === 'SENT') {
      picklistQueueItem.StatusDisplay = '0 of ' + picklistQueueItem.ItemCount;
    }

  }

}
