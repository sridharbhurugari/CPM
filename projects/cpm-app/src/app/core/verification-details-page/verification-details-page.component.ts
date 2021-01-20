import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';

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
    } as IVerificationNavigationParameters
    this.pageNavigationEvent.emit(navigationParams);
  }

  getHeaderSubtitle() {
    return `${this.navigationParameters.OrderId} - ${this.navigationParameters.Date}`
  }

}
