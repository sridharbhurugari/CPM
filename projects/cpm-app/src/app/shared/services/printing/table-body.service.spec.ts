import { TestBed } from '@angular/core/testing';

import { TableBodyService } from './table-body.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('TableBodyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        { provide: TranslateService, useValue: { get: () => of('') } }
    ]
  }));

  it('should be created', () => {
    const service: TableBodyService = TestBed.get(TableBodyService);
    expect(service).toBeTruthy();
  });
});
