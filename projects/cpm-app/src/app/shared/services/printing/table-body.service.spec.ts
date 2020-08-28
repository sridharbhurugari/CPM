import { TestBed } from '@angular/core/testing';

import { TableBodyService } from './table-body.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ITableColumnDefintion } from './i-table-column-definition';

interface TableDataSourceType {
  someString: string;
  someSecondaryString: string;
  someInt: number;
}

describe('TableBodyService', () => {
  let service: TableBodyService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: { get: () => of('') } }
      ]
    });
    service = TestBed.get(TableBodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildTableBody', () => {
    it('should return ContentTable', (done) => {
      let columnDefinitions: ITableColumnDefintion<TableDataSourceType>[] = [
        { cellPropertyNames: [ 'someString', 'someSecondaryString' ], headerResourceKey: '', width: '*' },
        { cellPropertyNames: [ 'someInt' ], headerResourceKey: '', width: '*' },
      ];
      let values: TableDataSourceType[] = [
        { someInt: 5, someSecondaryString: 'brand name 1', someString: 'generic name 1' },
        { someInt: 10, someSecondaryString: 'brand name 2', someString: 'generic name 2' },
      ];
      let result$ = service.buildTableBody(columnDefinitions, of(values));
      result$.subscribe(r => {
        expect(r.table.body.length).toBe(values.length + r.table.headerRows)
        done();
      });
    });
  });
});
