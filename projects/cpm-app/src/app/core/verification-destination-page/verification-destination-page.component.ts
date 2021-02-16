import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IVerificationDashboardData } from '../../api-core/data-contracts/i-verification-dashboard-data';
import { IVerificationDestinationItem } from '../../api-core/data-contracts/i-verification-destination-item';
import { VerificationService } from '../../api-core/services/verification.service';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
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
  @Output() nonXr2PickingBarcodeScanUnexpected: EventEmitter<null> = new EventEmitter();


  @Input() navigationParameters: IVerificationNavigationParameters;
  @Input() savedPageConfiguration: IVerificationPageConfiguration;
  @Input() barcodeScannedEventSubject: Observable<IBarcodeData>;

  private xr2xr2PickingBarcodeScannedSubscription: Subscription;


  private backRoute = VerificationRouting.OrderPage;
  private continueRoute = VerificationRouting.DetailsPage;

  ngUnsubscribe = new Subject();
  verificationDestinationItems: Observable<IVerificationDestinationItem[]>;
  verificationDashboardData: Observable<IVerificationDashboardData>;
  headerTitle: Observable<string>;
  headerSubTitle: Observable<string>;

  searchTextFilter: string;
  colHeaderSort: IColHeaderSortChanged;
  translations$: Observable<any>;


  translatables = [
    'LOADING'
  ];

  constructor(
    private translateService: TranslateService,
    private verificationService: VerificationService,
    private ref: ChangeDetectorRef
  ) { this.setTranslations();
   }

  ngOnInit() {
    this.xr2xr2PickingBarcodeScannedSubscription = this.barcodeScannedEventSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: IBarcodeData) => this.onBarcodeScannedEvent(data));
    this.loadVerificationDestinationItems();
    this.loadVerificationDashboardData();
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
      Route: this.continueRoute
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
        this.headerTitle = of(verificationDestinationViewData.PriorityDescription);
        this.headerSubTitle = of(`${verificationDestinationViewData.DeviceDescription} - ${verificationDestinationViewData.OrderId} - ${this.transformDateTime(new Date(verificationDestinationViewData.FillDate))}`);
        this.verificationDestinationItems = of(verificationDestinationViewData.DetailItems);
      }), shareReplay(1);
  }

  private loadVerificationDashboardData(): void {
    if(!this.navigationParameters || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    this.verificationDashboardData = this.verificationService
    .getVerificationDashboardData(this.navigationParameters.DeviceId.toString(), this.navigationParameters.OrderId).pipe(
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
      colHeaderSortDestination: this.colHeaderSort
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
