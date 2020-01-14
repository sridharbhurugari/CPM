import { Injectable } from '@angular/core';
import { IPickRouteDetail } from '../data-contracts/i-pickroute-detail';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickRoutesService {

  constructor() { }

  get(pickRouteId: string): Observable<IPickRouteDetail> {
    return of({
      Id: 50,
      Description: 'Rapid fill',
      DeviceSequence: [
        {
          SequenceOrder: 2,
          DeviceId: 6,
          DeviceDescription: 'Carousel 2',
        },
        {
          SequenceOrder: 1,
          DeviceId: 7,
          DeviceDescription: 'Wall Shelf',
        }
      ],
      AssignedPriorities: [
        'First Dose'
      ]
    });
  }
}
