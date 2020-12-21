import { TestBed } from '@angular/core/testing';

import { UnfilledSortOrderService } from './unfilled-sort-order.service';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { SortDirection } from '../../shared/constants/sort-direction';

describe('UnfilledSortOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnfilledSortOrderService = TestBed.get(UnfilledSortOrderService);
    expect(service).toBeTruthy();
  });

  it('should sort correctly', () => {
    const service: UnfilledSortOrderService = TestBed.get(UnfilledSortOrderService);
    let underfilled1: any = {
      OrderId : "1",
      CompletedDate: new Date('01/01/20')
    };
    let underfilled2 : any = {
      OrderId : "2",
      CompletedDate: new Date('01/02/20')
    };


    const list = new Array<UnderfilledPicklist>();
    list.push(underfilled1);
    list.push(underfilled2);

    var result = service.Sort(list);

    expect(result[0].OrderId === "2").toBeTruthy();

    service.SortOrder = SortDirection.ascending;

    var result = service.Sort(list);

    expect(result[0].OrderId === "1").toBeTruthy();
  });

});


