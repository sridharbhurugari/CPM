import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { WpfActionControllerService } from './wpf-action-controller.service';
import { Router } from '@angular/router';

describe('WpfActionControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: Location, useValue: { } },
      { provide: Router, useValue: { } },
    ]
  }));

  it('should be created', () => {
    const service: WpfActionControllerService = TestBed.get(WpfActionControllerService);
    expect(service).toBeTruthy();
  });
});
