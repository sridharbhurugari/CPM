import { Injectable } from '@angular/core';
import { SortDirection } from '../../shared/constants/sort-direction';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { nameof } from '../../shared/functions/nameof';

@Injectable({
  providedIn: 'root'
})
export class UnfilledSortOrderService {

  private datePropertyName = nameof<UnderfilledPicklist>('CompletedDate');
  private CurrentSortPropertyName : string = this.datePropertyName;
  private SortOrder : SortDirection = SortDirection.descending;

  constructor() { }

  public Update(currentSortPropertyName: string, sortOrder: SortDirection) {
    this.CurrentSortPropertyName = currentSortPropertyName;
    this.SortOrder = sortOrder;
  }

  public GetCurrentSortPropertyName() : string {
    return this.CurrentSortPropertyName;
  }

  public GetSortOrder() : SortDirection {
    return this.SortOrder;
  }
}
