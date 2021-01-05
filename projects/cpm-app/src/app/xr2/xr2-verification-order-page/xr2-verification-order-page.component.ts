import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { IXr2VerificationOrder } from '../../api-xr2/data-contracts/i-xr2-verification-order-item';

@Component({
  selector: 'app-xr2-verification-order-page',
  templateUrl: './xr2-verification-order-page.component.html',
  styleUrls: ['./xr2-verification-order-page.component.scss']
})
export class Xr2VerificationOrderPageComponent implements OnInit {

  verificationOrderItems: Observable<IXr2VerificationOrder[]>;

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
}
