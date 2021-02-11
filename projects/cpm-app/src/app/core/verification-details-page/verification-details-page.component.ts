import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';
import { VerificationService } from '../../api-core/services/verification.service';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { VerificationDashboardData } from '../../shared/model/verification-dashboard-data';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { ToastService } from '@omnicell/webcorecomponents';

@Component({
  selector: 'app-verification-details-page',
  templateUrl: './verification-details-page.component.html',
  styleUrls: ['./verification-details-page.component.scss']
})
export class VerificationDetailsPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();

  @Input() navigationParameters: IVerificationNavigationParameters;
  @Input() barcodeScannedEventSubject: Observable<IBarcodeData>;

  private xr2xr2PickingBarcodeScannedSubscription: Subscription;

  private backRoute = VerificationRouting.DestinationPage;

  verificationDestinationItems: Observable<VerificationDestinationItem[]>;
  verificationDashboardData: Observable<VerificationDashboardData>;
  verificationDestinationDetails: Observable<IVerificationDestinationDetail[]>;

  headerSubTitle: Observable<string>;
  headerTitle: Observable<string>;
  translations$: Observable<any>;


  translatables = [
    'LOADING'
  ];

  FillDate: string;
  DeviceDescription: string;

  constructor(
    private translateService: TranslateService,
    private verificationService: VerificationService,
    private toastService: ToastService,
  ) {
    this.setTranslations();
  }

  ngOnInit() {
    this.xr2xr2PickingBarcodeScannedSubscription = this.barcodeScannedEventSubject.subscribe((data: IBarcodeData) => this.onBarcodeScannedEvent(data));
    this.loadVerificationDashboardData();
    this.loadVerificationDestinationDetails();
  }

  onBarcodeScannedEvent(data: IBarcodeData) {
    if(data.IsXr2PickingBarcode) {
      // TODO: Save anything in progress - move to new barcode.  If barcode is the same - ignore it.
    } else {
      // TODO: Handle Item Scanned - Safety Stock
      // TODO: If item not found here, figure out how to report null transaction.
    }
  }

  onBackEvent(): void {
    const navigationParams = {
      OrderId: this.navigationParameters.OrderId,
      DeviceId: this.navigationParameters.DeviceId,
      DestinationId: null,
      Route: this.backRoute
    } as IVerificationNavigationParameters
    this.xr2xr2PickingBarcodeScannedSubscription.unsubscribe();
    this.pageNavigationEvent.emit(navigationParams);
  }

  private loadVerificationDestinationDetails(): void {
    // TODO - Determine what to do here if data cannot be loaded for some reason - perhaps they scanned something already verified.
    if(!this.navigationParameters || !this.navigationParameters.DestinationId || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    this.verificationService.getVerificationDestinationDetails(this.navigationParameters.DestinationId, this.navigationParameters.OrderId, this.navigationParameters.DeviceId).subscribe(
      (verificationDetailViewData) => {
        this.headerTitle = of(verificationDetailViewData.PriorityDescription);
        this.headerSubTitle = of(`${verificationDetailViewData.DeviceDescription} - ${verificationDetailViewData.OrderId} - ${this.transformDateTime(new Date(verificationDetailViewData.FillDate))}`);
        this.verificationDestinationDetails = of(verificationDetailViewData.DetailItems);
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

  private transformDateTime(date: Date): string {
    const orderDate = new Date(date).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
   }

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
  }
}
