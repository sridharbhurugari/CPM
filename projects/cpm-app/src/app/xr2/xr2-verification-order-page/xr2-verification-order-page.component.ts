import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { IXr2VerificationOrderItem } from '../../api-xr2/data-contracts/i-xr2-verification-order-item';
import { Xr2VerificationRouting } from '../../shared/enums/xr2-verification-routing';
import { IXr2VerificationNavigationParameters } from '../../shared/interfaces/i-xr2-verification-navigation-parameters';
import { Xr2VerificationOrderItem } from '../model/xr2-verification-order-item';

@Component({
  selector: 'app-xr2-verification-order-page',
  templateUrl: './xr2-verification-order-page.component.html',
  styleUrls: ['./xr2-verification-order-page.component.scss']
})
export class Xr2VerificationOrderPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IXr2VerificationNavigationParameters> = new EventEmitter();

  verificationOrderItems: Observable<IXr2VerificationOrderItem[]>;

  continueRoute = Xr2VerificationRouting.DestinationPage;

  constructor() { }

  ngOnInit() {
    // MOCK LIST - DELETE WITH API ADDITION
    const mockList = [];
    for(let i =0; i < 5; i++) {
      mockList.push(
        {
          Id: Guid.create(),
          OrderId: Guid.create(),
          PriorityCode: 'CODE',
          PriorityCodeColor: 'RED',
          PriorityCodeDescription: 'Description',
          SequenceOrder: 1,
          CompleteVerifications: 0,
          TotalVerifications: 5,
          RequiredVerificationPercentage: 10,
          CompleteExceptions: 0,
          RequiredExceptions: 1,
          Date: 'Date'
        }
      )
    }
    this.verificationOrderItems = of(mockList)
  }

  onGridRowClickEvent(xr2VerficationOrderItem: Xr2VerificationOrderItem): void {
    const navigationParams = {
      OrderId: xr2VerficationOrderItem.OrderId,
      DestinationId: null,
      PriorityCodeDescription: xr2VerficationOrderItem.PriorityCodeDescription,
      Date: xr2VerficationOrderItem.Date,
      Route: this.continueRoute
    } as IXr2VerificationNavigationParameters

    this.pageNavigationEvent.emit(navigationParams);
  }
}
