import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { IVerificationOrderItem } from '../../api-core/data-contracts/i-verification-order-item';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { VerificationOrderItem } from '../../shared/model/verification-order-item';


@Component({
  selector: 'app-verification-order-page',
  templateUrl: './verification-order-page.component.html',
  styleUrls: ['./verification-order-page.component.scss']
})
export class VerificationOrderPageComponent implements OnInit {

  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();
  @Output() pageConfigurationUpdateEvent: EventEmitter<IVerificationPageConfiguration> = new EventEmitter();

  verificationOrderItems: Observable<IVerificationOrderItem[]>;
  searchTextFilter: string;
  colHeaderSort: IColHeaderSortChanged;

  continueRoute = VerificationRouting.DestinationPage;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    // MOCK LIST - DELETE WITH API ADDITION
    const mockList = [];
    for(let i =0; i < 5; i++) {
      mockList.push(
        {
          Id: Guid.create(),
          OrderId: Guid.create(),
          PriorityCode: 'CODE',
          PriorityCodeColor: 'RED',
          PriorityCodeDescription: 'Description',
          SequenceOrder: 1,
          CompleteVerifications: 0,
          TotalVerifications: 5,
          RequiredVerificationPercentage: 10,
          CompleteExceptions: 0,
          RequiredExceptions: 1,
          Date: 'Date'
        }
      )
    }
    this.verificationOrderItems = of(mockList)
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onGridRowClickEvent(verficationOrderItem: VerificationOrderItem): void {
    const navigationParams = {
      OrderId: verficationOrderItem.OrderId,
      DestinationId: null,
      PriorityCodeDescription: verficationOrderItem.PriorityCodeDescription,
      Date: verficationOrderItem.Date,
      Route: this.continueRoute
    } as IVerificationNavigationParameters

    const savedPageConfiguration = this.createSavedPageConfiguration();

    this.pageNavigationEvent.emit(navigationParams);
    this.pageConfigurationUpdateEvent.emit(savedPageConfiguration);
  }

  onSearchTextFilterEvent(filterText: string): void {
    this.searchTextFilter = filterText;
  }

  onSortEvent(event: IColHeaderSortChanged): void {
    this.colHeaderSort = event;
  }

  private createSavedPageConfiguration() {
    return {
      searchTextFilter: this.searchTextFilter,
      colHeaderSort: this.colHeaderSort
    } as IVerificationPageConfiguration;
  }
}
