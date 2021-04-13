import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LogVerbosity } from 'oal-core';
import { forkJoin, Observable, of, Subject, Subscription } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IVerificationDashboardData } from '../../api-core/data-contracts/i-verification-dashboard-data';
import { IVerificationDestinationItem } from '../../api-core/data-contracts/i-verification-destination-item';
import { IVerificationDestinationViewData } from '../../api-core/data-contracts/i-verification-destination-view-data';
import { LogService } from '../../api-core/services/log-service';
import { VerificationService } from '../../api-core/services/verification.service';
import { LoggingCategory } from '../../shared/constants/logging-category';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { IDialogContents } from '../../shared/interfaces/i-dialog-contents';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { VerificationDashboardData } from '../../shared/model/verification-dashboard-data';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';

@Component({
  selector: 'app-verification-destination-page',
  templateUrl: './verification-destination-page.component.html',
  styleUrls: ['./verification-destination-page.component.scss']
})
export class VerificationDestinationPageComponent implements OnInit, AfterContentChecked {

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();
  @Output() pageConfigurationUpdateEvent: EventEmitter<IVerificationPageConfiguration> = new EventEmitter();
  @Output() displayWarningDialogEvent: EventEmitter<IDialogContents> = new EventEmitter();


  @Input() navigationParameters: IVerificationNavigationParameters;
  @Input() savedPageConfiguration: IVerificationPageConfiguration;
  @Input() barcodeScannedEventSubject: Observable<IBarcodeData>;

  private xr2PickingBarcodeScannedSubscription: Subscription;
  private backRoute = VerificationRouting.OrderPage;
  private continueRoute = VerificationRouting.DetailsPage;
  private _loggingCategory: string = LoggingCategory.Verification;
  private _componentName: string = "VerificationDestinationPageComponent";

  ngUnsubscribe = new Subject();
  verificationDestinationItems: Observable<IVerificationDestinationItem[]>;
  verificationDashboardData: Observable<IVerificationDashboardData>;
  headerTitle: Observable<string>;
  headerSubTitle: Observable<string>;

  searchTextFilter: string;
  colHeaderSort: IColHeaderSortChanged;
  translations$: Observable<any>;

  translatables = [
    'LOADING',
    'PICK_VERIFICATION_DETAILS_NO_DATA_FOUND_TITLE'
  ];

  constructor(
    private translateService: TranslateService,
    private verificationService: VerificationService,
    private ref: ChangeDetectorRef,
    private logService: LogService
  ) { this.setTranslations();
   }

  ngOnInit() {
    this.xr2PickingBarcodeScannedSubscription = this.barcodeScannedEventSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: IBarcodeData) => this.onBarcodeScannedEvent(data));
    this.loadVerificationDestinationItems();
    this.loadVerificationDashboardData();
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.xr2PickingBarcodeScannedSubscription.unsubscribe();
  }

  onBarcodeScannedEvent(data: IBarcodeData) {
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this._componentName + ' Barcode Scanned: ' + data.BarCodeScanned);

    if(data.IsXr2PickingBarcode) {
      const navigationParams = {
        OrderId: data.OrderId,
        DeviceId: data.DeviceId,
        DeviceDescription: '',
        DestinationId: data.DestinationId,
        PriorityCodeDescription: '',
        Date: new Date(),
        Route:  VerificationRouting.DetailsPage,
        RoutedByScan: true
      } as IVerificationNavigationParameters

      const savedPageConfiguration = this.createSavedPageConfiguration();
      this.pageNavigationEvent.emit(navigationParams);
      this.pageConfigurationUpdateEvent.emit(savedPageConfiguration);
    } else {
        this.displayWarningDialogEvent.emit({
          titleResourceKey: 'BARCODESCAN_DIALOGWARNING_TITLE',
          msgResourceKey: 'PICK_VERIFICATION_EXPECTED_PICKING_BARCODE_SCAN',
          msgParams: null
        });
    }
  }

  onBackEvent(): void {
    const navigationParams = {} as IVerificationNavigationParameters;
    navigationParams.Route = this.backRoute;
    this.pageNavigationEvent.emit(navigationParams);
  }

  onSearchTextFilterEvent(filterText: string): void {
    this.searchTextFilter = filterText;
  }

  onSortEvent(event: IColHeaderSortChanged): void {
    this.colHeaderSort = event;
  }

  onGridRowClickEvent(verificationDestinationItem: VerificationDestinationItem): void {
    const navigationParams = {
      DeviceId: this.navigationParameters.DeviceId,
      OrderId: this.navigationParameters.OrderId,
      DestinationId: verificationDestinationItem.DestinationId,
      Route: this.continueRoute,
      RoutedByScan: false
    } as IVerificationNavigationParameters;

    const savedPageConfiguration = this.createSavedPageConfiguration();

    this.pageNavigationEvent.emit(navigationParams);
    this.pageConfigurationUpdateEvent.emit(savedPageConfiguration);
  }

  private loadVerificationDestinationItems(): void {
    if(!this.navigationParameters || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    this.verificationService.getVerificationDestinations(this.navigationParameters.DeviceId.toString(), this.navigationParameters.OrderId).subscribe(
      (verificationDestinationViewData) => {
        this.generateHeaderTitle(verificationDestinationViewData)
        this.generateHeaderSubTitle(verificationDestinationViewData);
        this.verificationDestinationItems = of(verificationDestinationViewData.DetailItems.map((x) => { return new VerificationDestinationItem(x); }));
      }), shareReplay(1);
  }

  private generateHeaderTitle(verificationDetailViewData: IVerificationDestinationViewData){
    if(verificationDetailViewData.PriorityDescription) {
      this.headerTitle = of(verificationDetailViewData.PriorityDescription);
    } else {
      forkJoin(this.translations$).subscribe(r => {
        const translations = r[0];
        this.headerTitle = of(translations.PICK_VERIFICATION_DETAILS_NO_DATA_FOUND_TITLE);
      });
    }
  }

  private generateHeaderSubTitle(verificationDetailViewData: IVerificationDestinationViewData) {
    var stringResult = ''
    if(verificationDetailViewData.DeviceDescription) {
      stringResult += verificationDetailViewData.DeviceDescription;
    }

    if(verificationDetailViewData.OrderId) {
      if(stringResult !== '') {
        stringResult += ' - ';
      }

      stringResult += verificationDetailViewData.OrderId;
    }

    if(verificationDetailViewData.FillDate) {
      if(stringResult !== '') {
        stringResult += ' - ';
      }
      stringResult += this.transformDateTime(verificationDetailViewData.FillDate);;
    }
    this.headerSubTitle = of(stringResult);
  }

  private loadVerificationDashboardData(): void {
    if(!this.navigationParameters || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    this.verificationDashboardData = this.verificationService
    .getVerificationDashboardData(
     this.navigationParameters.PriorityCodeDescription,
     this.navigationParameters.DeviceId.toString(),
     this.navigationParameters.OrderId,
    ).pipe(
      map((verificationDashboardData) => {
        return new VerificationDashboardData(verificationDashboardData)
      }), shareReplay(1)
    );
  }

  private createSavedPageConfiguration() {
    return {
      searchTextFilterOrder: this.savedPageConfiguration.searchTextFilterOrder,
      colHeaderSortOrder: this.savedPageConfiguration.colHeaderSortOrder,
      searchTextFilterDestination: this.searchTextFilter,
      colHeaderSortDestination: this.colHeaderSort,
      requiredOrders: this.savedPageConfiguration.requiredOrders
    } as IVerificationPageConfiguration;
  }

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
  }

  private transformDateTime(date: Date): string {
    const orderDate = new Date(date).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
   }

}
