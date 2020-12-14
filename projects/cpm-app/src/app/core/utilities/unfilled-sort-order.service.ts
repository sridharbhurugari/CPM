import { Injectable } from '@angular/core';
import { SortDirection } from '../../shared/constants/sort-direction';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { nameof } from '../../shared/functions/nameof';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UnfilledSortOrderService {

  private datePropertyName = nameof<UnderfilledPicklist>('CompletedDate');
  public CurrentSortPropertyName : string = this.datePropertyName;
  public SortOrder : SortDirection = SortDirection.descending;

  constructor() { }

  public Update(currentSortPropertyName: string, sortOrder: SortDirection) {
    this.CurrentSortPropertyName = currentSortPropertyName;
    this.SortOrder = sortOrder;
  }

  public Sort(picklists: UnderfilledPicklist[]) : UnderfilledPicklist[] {
    const sortOrder : any = this.SortOrder;
    return _.orderBy(picklists, x => x[this.CurrentSortPropertyName], sortOrder);
  }
}
