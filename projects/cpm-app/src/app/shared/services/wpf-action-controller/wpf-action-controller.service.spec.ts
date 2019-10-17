import { TestBed } from '@angular/core/testing';

import { WpfActionControllerService } from './wpf-action-controller.service';

describe('WpfActionControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WpfActionControllerService = TestBed.get(WpfActionControllerService);
    expect(service).toBeTruthy();
  });
});
