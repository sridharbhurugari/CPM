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
    this.setDefaultRequiredOrder();
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
    const savedRequiredOrders = this.savedPageConfiguration.requiredOrders;

    if (savedSearchFilter) {
        this.searchElement.sendSearchData(savedSearchFilter);
        this.searchTextFilterEvent.emit(savedSearchFilter);
    }

      this.valueChange.emit(savedRequiredOrders);
      this.isRequired = savedRequiredOrders;
  }

  setIsRequiredVerification(event) {
    this.valueChange.emit(event);
    this.isRequired = event;
    console.log("setIsRequiredVerification",event);
  }

  setDefaultRequiredOrder(){
    this.isRequired = true;
    this.valueChange.emit(this.isRequired);
  }

}
