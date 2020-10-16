import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-xr2-queue-grouping-header',
  templateUrl: './xr2-queue-grouping-header.component.html',
  styleUrls: ['./xr2-queue-grouping-header.component.scss']
})

export class Xr2QueueGroupingHeaderComponent implements OnInit, AfterViewInit {

  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchBox', {
    static: true
  })

  searchElement: SearchBoxComponent;

  constructor(private windowService: WindowService) { }

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
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }
}
