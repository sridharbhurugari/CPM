import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';
import { VerificationService } from '../../api-core/services/verification.service';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { VerificationDashboardData } from '../../shared/model/verification-dashboard-data';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { ToastService } from '@omnicell/webcorecomponents';
@Component({
  selector: 'app-verification-details-page',
  templateUrl: './verification-details-page.component.html',
  styleUrls: ['./verification-details-page.component.scss']
})
export class VerificationDetailsPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();

  @Input() navigationParameters: IVerificationNavigationParameters;

  private backRoute = VerificationRouting.DestinationPage;

  verificationDestinationItems: Observable<VerificationDestinationItem[]>;
  verificationDashboardData: Observable<VerificationDashboardData>;
  verificationDestinationDetails: Observable<IVerificationDestinationDetail[]>;


  constructor(
    private translateService: TranslateService,
    private verificationService: VerificationService,
    private toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.loadVerificationDashboardData();
    this.loadVerificationDestinationDetails();
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

  private loadVerificationDestinationDetails(): void {
    console.log(this.navigationParameters.DestinationId);
    if(!this.navigationParameters || !this.navigationParameters.DestinationId || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    this.verificationDestinationDetails = this.verificationService
    .getVerificationDestinationDetails(this.navigationParameters.DestinationId, this.navigationParameters.OrderId, this.navigationParameters.DeviceId).pipe(
      map((verificationDetails) => {
        return verificationDetails.map((verificationDetail) => {
          return new VerificationDestinationDetail(verificationDetail);
        });
      }), shareReplay(1)
    );
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
