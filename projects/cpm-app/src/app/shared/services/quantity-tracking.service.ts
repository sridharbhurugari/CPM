import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable()
export class QuantityTrackingService {
  private _quantity: number;

  quantitySubject: ReplaySubject<number> = new ReplaySubject<number>();

  get quantity(): number {
    return this._quantity;
  }

  /* istanbul ignore next */
  set quantity(value: number) {
    this._quantity = value;
    this.quantitySubject.next(this._quantity);
  }

  constructor() { }

  /* istanbul ignore next */
  complete() {
    this.quantitySubject.complete();
    this.quantitySubject = new ReplaySubject<number>();
  }
}
