import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';

@Component({
  selector: 'app-verification-order-header',
  templateUrl: './verification-order-header.component.html',
  styleUrls: ['./verification-order-header.component.scss']
})
export class VerificationOrderHeaderComponent implements OnInit, AfterViewInit {

  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  @ViewChild('searchBox', {
    static: true
  }) searchElement: SearchBoxComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.configureSearchHandler();
    this.loadSavedPageConfigurations();
  }

  private configureSearchHandler() {
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

  private loadSavedPageConfigurations() {
    if (!this.savedPageConfiguration) {
      return;
    }

    const savedSearchFilter = this.savedPageConfiguration.searchTextFilterOrder;

    if (savedSearchFilter) {
        this.searchElement.sendSearchData(savedSearchFilter);
        this.searchTextFilterEvent.emit(savedSearchFilter);
    }
  }

}
