import { TestBed } from '@angular/core/testing';

import { QuickPickErrorService } from './quick-pick-error.service';
import { PopupDialogService } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';


describe('QuickPickErrorService', () => {

  let popupDialogService: Partial<PopupDialogService>;

  popupDialogService = {
    showOnce: jasmine.createSpy('showOnce')
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: PopupDialogService, useValue: popupDialogService },
      { provide: TranslateService, useValue: { get: () => of([]) } },
    ]
  }));

  it('should be created', () => {
    const service: QuickPickErrorService = TestBed.get(QuickPickErrorService);
    expect(service).toBeTruthy();
  });
});
