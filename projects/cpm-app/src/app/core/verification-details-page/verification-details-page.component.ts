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
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
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
  @Input() xr2BarcodeScannedEvents: Observable<IBarcodeData>;

  private xr2xr2PickingBarcodeScannedSubscription: Subscription;

  private backRoute = VerificationRouting.DestinationPage;

  verificationDestinationItems: Observable<VerificationDestinationItem[]>;
  verificationDashboardData: Observable<VerificationDashboardData>;
  verificationDestinationDetails: Observable<IVerificationDestinationDetail[]>;
  @Output() headerSubTitle: Observable<string>;
  @Output() PriorityDescription: Observable<string>;
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
    this.xr2xr2PickingBarcodeScannedSubscription = this.xr2BarcodeScannedEvents.subscribe((data: IBarcodeData) => this.onBarcodeScannedEvent(data));
    this.loadVerificationDashboardData();
    this.loadVerificationDestinationDetails();
  }

  onBarcodeScannedEvent(data: IBarcodeData) {
    if(data.IsXr2PickingBarcode) {
      console.log('Details Page Xr2 Barcode!')
    } else {
      // TODO: Handle Item Scanned
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
    console.log(this.navigationParameters.DestinationId);
    if(!this.navigationParameters || !this.navigationParameters.DestinationId || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    this.verificationDestinationDetails = this.verificationService
    .getVerificationDestinationDetails(this.navigationParameters.DestinationId, this.navigationParameters.OrderId, this.navigationParameters.DeviceId).pipe(
      map((verificationDetailViewData) => {
        this.PriorityDescription = of(verificationDetailViewData.PriorityDescription);
        this.headerSubTitle = of(`${verificationDetailViewData.DeviceDescription} - ${verificationDetailViewData.OrderId} - ${this.transformDateTime(new Date(verificationDetailViewData.FillDate))}`);
        return verificationDetailViewData.DetailItems.map((verificationDetail) => {
          return new VerificationDestinationDetail(verificationDetail);
        });
      }), shareReplay(1)
    );
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
