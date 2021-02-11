import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IVerificationOrderItem } from '../../api-core/data-contracts/i-verification-order-item';
import { VerificationService } from '../../api-core/services/verification.service';
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
export class VerificationOrderPageComponent implements OnInit, AfterContentChecked {

  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();
  @Output() pageConfigurationUpdateEvent: EventEmitter<IVerificationPageConfiguration> = new EventEmitter();

  verificationOrderItems: Observable<IVerificationOrderItem[]>;
  searchTextFilter: string;
  colHeaderSort: IColHeaderSortChanged;

  continueRoute = VerificationRouting.DestinationPage;

  constructor(
    private verificationService: VerificationService,
    private ref: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.loadVerificationOrderItems();
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onGridRowClickEvent(verificationOrderItem: VerificationOrderItem): void {
    const navigationParams = {
      OrderId: verificationOrderItem.OrderId,
      DeviceId: verificationOrderItem.DeviceId,
      DeviceDescription: verificationOrderItem.DeviceDescription,
      PriorityCodeDescription: verificationOrderItem.PriorityCodeDescription,
      Date: verificationOrderItem.FillDate,
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

  private loadVerificationOrderItems(): void {
    this.verificationOrderItems = this.verificationService.getVerificationOrders().pipe(
      map((verificationOrderItems) => {
        return verificationOrderItems.map((verificationItem) => {
          console.log(verificationItem);
          return new VerificationOrderItem(verificationItem);
        });
      }), shareReplay(1)
    );
  }

  private createSavedPageConfiguration() {
    return {
      searchTextFilterOrder: this.searchTextFilter,
      colHeaderSortOrder: this.colHeaderSort
    } as IVerificationPageConfiguration;
  }
}
