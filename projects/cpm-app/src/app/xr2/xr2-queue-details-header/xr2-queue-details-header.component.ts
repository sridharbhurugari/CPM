import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WindowService } from '../../shared/services/window-service';
import { PicklistQueueItem } from '../model/picklist-queue-item';

@Component({
  selector: 'app-xr2-queue-details-header',
  templateUrl: './xr2-queue-details-header.component.html',
  styleUrls: ['./xr2-queue-details-header.component.scss']
})
export class Xr2QueueDetailsHeaderComponent implements OnInit, AfterViewInit {

  @Output() backEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() priorityDescriptionHeader: string;
  @Input() pageName: string = 'DETAILS';

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;


  constructor(private windowService: WindowService) {
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilterEvent.emit(data);
      });
  }

  onBackClick(): void {
    this.backEvent.emit();
  }
}
