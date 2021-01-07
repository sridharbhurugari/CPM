import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import { navigatorFactory } from 'oal-core/lib/services/navigator/services/navigator-factory';
import { Observable, of } from 'rxjs';
import { IXr2VerificationDestinationItem } from '../../api-xr2/data-contracts/i-xr2-verification-destination-item';
import { Xr2VerificationRouting } from '../../shared/enums/xr2-verification-routing';
import { IXr2VerificationNavigationParameters } from '../../shared/interfaces/i-xr2-verification-navigation-parameters';
import { Xr2VerificationDestinationItem } from '../model/xr2-verification-destination-item';

@Component({
  selector: 'app-xr2-verification-destination-page',
  templateUrl: './xr2-verification-destination-page.component.html',
  styleUrls: ['./xr2-verification-destination-page.component.scss']
})
export class Xr2VerificationDestinationPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IXr2VerificationNavigationParameters> = new EventEmitter();

  @Input() navigationParameters: IXr2VerificationNavigationParameters;

  private backRoute = Xr2VerificationRouting.OrderPage;
  private continueRoute = Xr2VerificationRouting.DetailsPage;

  verificationDestinationItems: Observable<IXr2VerificationDestinationItem[]>;

  constructor() { }

  ngOnInit() {
    // MOCK LIST - DELETE WITH API ADDITION
    const mockList = [] as IXr2VerificationDestinationItem[];
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
    const navigationParams = {} as IXr2VerificationNavigationParameters;
    navigationParams.Route = this.backRoute;
    this.pageNavigationEvent.emit(navigationParams);
  }

  onGridRowClickEvent(xr2VerficationOrderItem: Xr2VerificationDestinationItem): void {
    const navigationParams = {
      OrderId: this.navigationParameters.OrderId,
      DestinationId: xr2VerficationOrderItem.DestinationId,
      PriorityCodeDescription: this.navigationParameters.PriorityCodeDescription,
      Date: this.navigationParameters.Date,
      Route: this.continueRoute
    } as IXr2VerificationNavigationParameters

    this.pageNavigationEvent.emit(navigationParams);
  }

  getHeaderSubtitle() {
    return `${this.navigationParameters.OrderId} - ${this.navigationParameters.Date}`
  }

}
