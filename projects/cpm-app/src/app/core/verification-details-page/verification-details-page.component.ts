import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { shareReplay } from 'rxjs/operators';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { VerificationService } from '../../api-core/services/verification.service';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { VerificationDashboardData } from '../../shared/model/verification-dashboard-data';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';

@Component({
  selector: 'app-verification-details-page',
  templateUrl: './verification-details-page.component.html',
  styleUrls: ['./verification-details-page.component.scss']
})
export class VerificationDetailsPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();

  @Input() navigationParameters: IVerificationNavigationParameters;

  @Input() xr2PickingBarcodeScanned: IBarcodeData;

  private backRoute = VerificationRouting.DestinationPage;

  verificationDestinationItems: Observable<VerificationDestinationItem[]>;
  verificationDashboardData: Observable<VerificationDashboardData>;

  constructor(
    private translateService: TranslateService,
    private verificationService: VerificationService
  ) { }

  ngOnInit() {
    this.loadVerificationDashboardData();
  }

  onBackEvent(): void {
    const navigationParams = {
      OrderId: this.navigationParameters.OrderId,
      DeviceId: this.navigationParameters.DeviceId,
      DestinationId: null,
      DeviceDescription: this.navigationParameters.DeviceDescription,
      PriorityCodeDescription: this.navigationParameters.PriorityCodeDescription,
      Date: this.navigationParameters.Date,
      Route: this.backRoute
    } as IVerificationNavigationParameters
    this.pageNavigationEvent.emit(navigationParams);
  }

  getHeaderSubtitle() {
    return `${this.navigationParameters.DeviceDescription} -
    ${this.navigationParameters.OrderId} - ${this.transformDateTime(this.navigationParameters.Date)}`
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

}
