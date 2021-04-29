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
import { IVerificationDataParameters } from '../../api-core/data-contracts/i-verification-data-parameters';
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
  private readonly _hourDisplayString = '24HR';

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
          PriorityCode: pickPriority ? pickPriority.PriorityCode: null,
          PriorityVerificationGrouping: pickPriority ? pickPriority.PriorityVerificationGrouping: null,
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
      PriorityCode: verificationDestinationItem.PriorityCode,
      DeviceId: verificationDestinationItem.DeviceId,
      OrderId: verificationDestinationItem.OrderId,
      DestinationId: verificationDestinationItem.DestinationId,
      Route: this.continueRoute,
      RoutedByScan: false,
      PriorityVerificationGrouping: verificationDestinationItem.PriorityVerificationGrouping
    } as IVerificationNavigationParameters;

    const savedPageConfiguration = this.createSavedPageConfiguration();

    this.pageNavigationEvent.emit(navigationParams);
    this.pageConfigurationUpdateEvent.emit(savedPageConfiguration);
  }

  private loadVerificationDestinationItems(): void {
    if(!this.navigationParameters || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    const destinationParams = {
      PriorityCode: this.navigationParameters.PriorityCode,
      OrderId: this.navigationParameters.OrderId,
      DeviceId: this.navigationParameters.DeviceId,
      RoutedByScan: this.navigationParameters.RoutedByScan,
      PriorityVerificationGrouping: this.navigationParameters.PriorityVerificationGrouping
    } as IVerificationDataParameters

    this.verificationService.getVerificationDestinations(destinationParams).subscribe(
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

  private generateHeaderSubTitle(verificationDestinationViewData: IVerificationDestinationViewData) {
    var stringResult = ''
    const stringsToDisplay = [];
    if(verificationDestinationViewData.DeviceDescription) stringsToDisplay.push(verificationDestinationViewData.DeviceDescription);
    if(verificationDestinationViewData.OrderId) {
      this.navigationParameters.PriorityVerificationGrouping ?
      stringsToDisplay.push(this._hourDisplayString) :stringsToDisplay.push(verificationDestinationViewData.OrderId);
    }
    if(verificationDestinationViewData.FillDate) stringsToDisplay.push(this.transformDateTime(verificationDestinationViewData.FillDate));

    for(let i = 0; i < stringsToDisplay.length; i++) {
      stringResult += stringsToDisplay[i];
      if(i !== stringsToDisplay.length - 1) {
        stringResult += ' - '
      }
    }

    this.headerSubTitle = of(stringResult);
  }

  private loadVerificationDashboardData(): void {
    if(!this.navigationParameters || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    const dashboardParams = {
      OrderId: this.navigationParameters.OrderId,
      DeviceId: this.navigationParameters.DeviceId,
      PriorityCode: this.navigationParameters.PriorityCode,
      RoutedByScan: this.navigationParameters.RoutedByScan,
      PriorityVerificationGrouping: this.navigationParameters.PriorityVerificationGrouping
    } as IVerificationDataParameters

    this.verificationDashboardData = this.verificationService
    .getVerificationDashboardData(dashboardParams).pipe(
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
