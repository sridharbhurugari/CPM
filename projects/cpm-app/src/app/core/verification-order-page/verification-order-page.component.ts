import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { orderBy } from 'lodash';
import { LogVerbosity } from 'oal-core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IVerificationOrderItem } from '../../api-core/data-contracts/i-verification-order-item';
import { LogService } from '../../api-core/services/log-service';
import { VerificationService } from '../../api-core/services/verification.service';
import { LoggingCategory } from '../../shared/constants/logging-category';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { IDialogContents } from '../../shared/interfaces/i-dialog-contents';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { VerificationOrderItem } from '../../shared/model/verification-order-item';
import { VerificationOrderHeaderComponent } from '../verification-order-header/verification-order-header.component';


@Component({
  selector: 'app-verification-order-page',
  templateUrl: './verification-order-page.component.html',
  styleUrls: ['./verification-order-page.component.scss']
})
export class VerificationOrderPageComponent implements OnInit, AfterContentChecked {

  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();
  @Output() pageConfigurationUpdateEvent: EventEmitter<IVerificationPageConfiguration> = new EventEmitter();
  @Output() displayWarningDialogEvent: EventEmitter<IDialogContents> = new EventEmitter();

  @Input() barcodeScannedEventSubject: Observable<IBarcodeData>;

  private xr2xr2PickingBarcodeScannedSubscription: Subscription;
  private _loggingCategory: string = LoggingCategory.Verification;
  private _componentName: string = "VerificationOrderPageComponent";

  ngUnsubscribe = new Subject();
  verificationOrderItems: Observable<IVerificationOrderItem[]>;
  allVerificationOrderItems: Observable<IVerificationOrderItem[]>;
  searchTextFilter: string;
  colHeaderSort: IColHeaderSortChanged;
  requiredOrders: boolean = true;


  continueRoute = VerificationRouting.DestinationPage;

  @ViewChild(VerificationOrderHeaderComponent, { static: false }) childVerificationOrderHeaderComponent: VerificationOrderHeaderComponent;

  constructor(
    private verificationService: VerificationService,
    private ref: ChangeDetectorRef,
    private logService: LogService,
    ) { }

  ngOnInit() {
    this.xr2xr2PickingBarcodeScannedSubscription = this.barcodeScannedEventSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: IBarcodeData) => this.onBarcodeScannedEvent(data));
    this.loadVerificationOrderItems();
    this.allVerificationOrderItems = this.verificationOrderItems;
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
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this._componentName + ' Barcode Scanned: ' + data.BarCodeScanned);

    if(data.IsXr2PickingBarcode) {
      this.verificationService.getPickPriority(data.OrderId)
      .subscribe((pickPriority) => {
        const navigationParams = {
          OrderId: data.OrderId,
          DeviceId: data.DeviceId,
          DeviceDescription: '',
          DestinationId: data.DestinationId,
          Date: new Date(),
          Route:  VerificationRouting.DetailsPage,
          RoutedByScan: true,
          PriorityCode: pickPriority.PriorityCode,
          PriorityVerificationGrouping: pickPriority.PriorityVerificationGrouping
        } as IVerificationNavigationParameters

        const savedPageConfiguration = this.createSavedPageConfiguration();
        this.pageNavigationEvent.emit(navigationParams);
        this.pageConfigurationUpdateEvent.emit(savedPageConfiguration);
      });
    } else {
      this.displayWarningDialogEvent.emit({
        titleResourceKey: 'BARCODESCAN_DIALOGWARNING_TITLE',
        msgResourceKey: 'PICK_VERIFICATION_EXPECTED_PICKING_BARCODE_SCAN',
        msgParams: null
      });
    }
  }

  onGridRowClickEvent(verificationOrderItem: VerificationOrderItem): void {
    const navigationParams = {
      PriorityCode: verificationOrderItem.PriorityCode,
      OrderId: verificationOrderItem.OrderId,
      DeviceId: verificationOrderItem.DeviceId,
      DestinationId: null,
      Route: this.continueRoute,
      RoutedByScan: false,
      PriorityVerificationGrouping: verificationOrderItem.PriorityVerificationGrouping
    } as IVerificationNavigationParameters

    const savedPageConfiguration = this.createSavedPageConfiguration();
    this.xr2xr2PickingBarcodeScannedSubscription.unsubscribe();
    this.pageNavigationEvent.emit(navigationParams);
    this.pageConfigurationUpdateEvent.emit(savedPageConfiguration);
  }

  onSearchTextFilterEvent(filterText: string): void {
    this.searchTextFilter = filterText;
  }

  setIsRequiredVerification(event: boolean): void {
    this.requiredOrders = event;
    if(this.requiredOrders){
      this.LoadRequiredVerificationOrderItems();
    } else {
      this.LoadAllVerificationOrderItems();
    }
  }

  onSortEvent(event: IColHeaderSortChanged): void {
    this.colHeaderSort = event;
  }

   /* istanbul ignore next */
  fromWPFNgOnInit() {
    this.ngOnInit();
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

  private LoadRequiredVerificationOrderItems(): void {
    this.verificationOrderItems =  this.allVerificationOrderItems.pipe(
      map(verificationOrderItems =>
        verificationOrderItems.filter(x => x.CompleteVerificationPercentage < x.RequiredVerificationPercentage || x.HasExceptions || x.HasOutputDeviceVerification)));
  }

  private LoadAllVerificationOrderItems(): void {
    this.verificationOrderItems = this.allVerificationOrderItems;
  }

  private createSavedPageConfiguration() {
    return {
      searchTextFilterOrder: this.searchTextFilter,
      colHeaderSortOrder: this.colHeaderSort,
      requiredOrders: this.requiredOrders
    } as IVerificationPageConfiguration;
  }
}
