import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { IVerificationDestinationItem } from '../../api-core/data-contracts/i-verification-destination-item';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';

@Component({
  selector: 'app-verification-destination-page',
  templateUrl: './verification-destination-page.component.html',
  styleUrls: ['./verification-destination-page.component.scss']
})
export class VerificationDestinationPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();

  @Input() navigationParameters: IVerificationNavigationParameters;

  private backRoute = VerificationRouting.OrderPage;
  private continueRoute = VerificationRouting.DetailsPage;

  verificationDestinationItems: Observable<IVerificationDestinationItem[]>;

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    // MOCK LIST - DELETE WITH API ADDITION
    const mockList = [] as IVerificationDestinationItem[];
    for(let i =0; i < 15; i++) {
      mockList.push({
        Id: Guid.create(),
        DestinationId: Guid.create(),
        SequenceOrder: 1,
        Destination: 'Destination',
        CompleteVerifications: 1,
        TotalVerifications: 2,
        RequiredVerifications: 2,
        CompleteExceptions: 1,
        RequiredExceptions: 2
      })
    }
    this.verificationDestinationItems = of(mockList)
  }

  onBackEvent(): void {
    const navigationParams = {} as IVerificationNavigationParameters;
    navigationParams.Route = this.backRoute;
    this.pageNavigationEvent.emit(navigationParams);
  }

  onGridRowClickEvent(verificationOrderItem: VerificationDestinationItem): void {
    const navigationParams = {
      OrderId: this.navigationParameters.OrderId,
      DestinationId: verificationOrderItem.DestinationId,
      PriorityCodeDescription: this.navigationParameters.PriorityCodeDescription,
      Date: this.navigationParameters.Date,
      Route: this.continueRoute
    } as IVerificationNavigationParameters

    this.pageNavigationEvent.emit(navigationParams);
  }

  getHeaderSubtitle() {
    return `${this.navigationParameters.OrderId} - ${this.transformDateTime(this.navigationParameters.Date)}`
  }

  private transformDateTime(date: Date): string {
    const orderDate = new Date(date).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
   }

}
