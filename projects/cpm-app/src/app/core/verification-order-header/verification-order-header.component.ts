import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isRequired: boolean = true;

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

  setIsRequiredVerification(event) {
    this.valueChange.emit(event);
    this.isRequired = event;
  }

   /* istanbul ignore next */
  fromWPFNgOnInit() {
    this.savedPageConfiguration = {
      searchTextFilterOrder: '',
      requiredOrders: true
    } as IVerificationPageConfiguration;

    this.ngOnInit();
    this.ngAfterViewInit();
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
      this.valueChange.emit(this.isRequired);
       return;
    }

    const savedSearchFilter = this.savedPageConfiguration.searchTextFilterOrder;
    const savedRequiredOrders = this.savedPageConfiguration.requiredOrders;

    if(savedRequiredOrders !== undefined){
      this.valueChange.emit(savedRequiredOrders);
      this.isRequired = savedRequiredOrders;
    }

    if (savedSearchFilter !== undefined) {
        this.searchElement.sendSearchData(savedSearchFilter);
        this.searchTextFilterEvent.emit(savedSearchFilter);
    }
  }
}
