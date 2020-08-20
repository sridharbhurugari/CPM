import { TestBed } from '@angular/core/testing';

import { SimpleDialogService } from './simple-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { PopupDialogModule, PopupDialogService } from '@omnicell/webcorecomponents';

describe('SimpleDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: TranslateService, useValue: { get: () => of('') }},
      { provide: PopupDialogService, useValue: { showOnce: () => {} }},
    ]
  }));

  it('should be created', () => {
    const service: SimpleDialogService = TestBed.get(SimpleDialogService);
    expect(service).toBeTruthy();
  });
});
