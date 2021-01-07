import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IXr2VerificationDestinationItem } from '../../api-xr2/data-contracts/i-xr2-verification-destination-item';
import { Xr2VerificationRouting } from '../../shared/enums/xr2-verification-routing';
import { IXr2VerificationNavigationParameters } from '../../shared/interfaces/i-xr2-verification-navigation-parameters';

@Component({
  selector: 'app-xr2-verification-details-page',
  templateUrl: './xr2-verification-details-page.component.html',
  styleUrls: ['./xr2-verification-details-page.component.scss']
})
export class Xr2VerificationDetailsPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IXr2VerificationNavigationParameters> = new EventEmitter();

  @Input() navigationParameters: IXr2VerificationNavigationParameters;

  private backRoute = Xr2VerificationRouting.DestinationPage;

  verificationDestinationItems: Observable<IXr2VerificationDestinationItem[]>;


  constructor() { }

  ngOnInit() {
  }

  onBackEvent(): void {
    const navigationParams = {
      OrderId: this.navigationParameters.OrderId,
      DestinationId: this.navigationParameters.DestinationId,
      PriorityCodeDescription: this.navigationParameters.PriorityCodeDescription,
      Date: this.navigationParameters.Date,
      Route: this.backRoute
    } as IXr2VerificationNavigationParameters
    this.pageNavigationEvent.emit(navigationParams);
  }

  getHeaderSubtitle() {
    return `${this.navigationParameters.OrderId} - ${this.navigationParameters.Date}`
  }

}
