import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IDevice } from '../data-contracts/i-device';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor() { }

  get(): Observable<IDevice[]> {
    return of([
      {
        Id: 5,
        Description: 'Carousel 1'
      },
      {
        Id: 6,
        Description: 'Carousel 2'
      },
      {
        Id: 7,
        Description: 'Wall Shelf'
      },
    ]);
  }
}
