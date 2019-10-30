import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPriorityCodePickRoute } from '../data-contracts/i-priority-code-pick-route';

@Injectable({
  providedIn: 'root'
})
export class PriorityCodePickRoutesService {

  constructor() { }

  get(): Observable<IPriorityCodePickRoute[]> {
    var priorityCodePickRoute: IPriorityCodePickRoute = {
      PickRouteDescription: "Fast Fill",
      PickRouteId: 5,
      PriorityCode: "FIRSTDOSE",
      PriorityCodeDescription: "First Dose",
      PriorityCodePickRouteId: 3
    };
    var cartFill: IPriorityCodePickRoute = {
      PickRouteDescription: "Standard Fill",
      PickRouteId: 2,
      PriorityCode: "CARTFILL",
      PriorityCodeDescription: "Cart Fill",
      PriorityCodePickRouteId: 8
    };
    return of([
      priorityCodePickRoute,
      cartFill
    ]);
  }
}
