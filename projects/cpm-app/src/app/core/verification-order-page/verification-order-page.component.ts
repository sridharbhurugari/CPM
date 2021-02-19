import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
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
  @Output() nonXr2PickingBarcodeScanUnexpected: EventEmitter<null> = new EventEmitter();

  @Input() barcodeScannedEventSubject: Observable<IBarcodeData>;

  private xr2xr2PickingBarcodeScannedSubscription: Subscription;

  ngUnsubscribe = new Subject();
  verificationOrderItems: Observable<IVerificationOrderItem[]>;
  searchTextFilter: string;
  colHeaderSort: IColHeaderSortChanged;

  continueRoute = VerificationRouting.DestinationPage;

  constructor(
    private verificationService: VerificationService,
    private ref: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.xr2xr2PickingBarcodeScannedSubscription = this.barcodeScannedEventSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: IBarcodeData) => this.onBarcodeScannedEvent(data));
    this.loadVerificationOrderItems();
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.xr2xr2PickingBarcodeScannedSubscription.unsubscribe();
  }

  onBarcodeScannedEvent(data: IBarcodeData) {

    if(data.IsXr2PickingBarcode) {
      console.log('Details Page Xr2 Barcode!')

      const navigationParams = {
        OrderId: data.OrderId,
        DeviceId: data.DeviceId,
        DeviceDescription: '',
        DestinationId: data.DestinationId,
        PriorityCodeDescription: '',
        Date: new Date(),
        Route:  VerificationRouting.DetailsPage
      } as IVerificationNavigationParameters

      const savedPageConfiguration = this.createSavedPageConfiguration();
      this.pageNavigationEvent.emit(navigationParams);
      this.pageConfigurationUpdateEvent.emit(savedPageConfiguration);
    } else {
        this.nonXr2PickingBarcodeScanUnexpected.emit();
    }
  }

  onGridRowClickEvent(verificationOrderItem: VerificationOrderItem): void {
    const navigationParams = {
      OrderId: verificationOrderItem.OrderId,
      DeviceId: verificationOrderItem.DeviceId,
      DestinationId: null,
      Route: this.continueRoute
    } as IVerificationNavigationParameters

    const savedPageConfiguration = this.createSavedPageConfiguration();
    this.xr2xr2PickingBarcodeScannedSubscription.unsubscribe();
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
