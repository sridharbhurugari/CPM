import { TestBed } from '@angular/core/testing';
import { Location, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { WpfActionControllerService } from './wpf-action-controller.service';

describe('WpfActionControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CommonModule
    ],
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
