import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { IXr2VerificationOrder } from '../../api-xr2/data-contracts/i-xr2-verification-order-item';
import { IXr2VerificationNavigationParameters } from '../../shared/interfaces/i-xr2-verification-navigation-parameters';
import { Xr2VerificationOrder } from '../model/xr2-verification-order';

@Component({
  selector: 'app-xr2-verification-order-page',
  templateUrl: './xr2-verification-order-page.component.html',
  styleUrls: ['./xr2-verification-order-page.component.scss']
})
export class Xr2VerificationOrderPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IXr2VerificationNavigationParameters> = new EventEmitter();

  verificationOrderItems: Observable<IXr2VerificationOrder[]>;

  continueRoute = "PatientPage";

  constructor() { }

  ngOnInit() {
    this.verificationOrderItems = of([
      {
        Id: Guid.create(),
        OrderId: Guid.create(),
        PriorityCode: 'CODE',
        PriorityCodeColor: 'RED',
        PriorityCodeDescription: 'DESCRIPTION',
        SequenceOrder: 1,
        CompleteVerifications: 0,
        TotalVerifications: 5,
        RequiredVerificationPercentage: 10,
        CompleteExceptions: 0,
        RequiredExceptions: 1,
        Date: 'Date'
      }
    ])
  }

  onQueueRowClickEvent(xr2VerficationOrderItem: Xr2VerificationOrder) {
    const navigationParams = {
      OrderId: xr2VerficationOrderItem.OrderId,
      PriorityCodeDescription: xr2VerficationOrderItem.PriorityCodeDescription,
      Route: this.continueRoute
    } as IXr2VerificationNavigationParameters

    this.pageNavigationEvent.emit(navigationParams);
  }
}
