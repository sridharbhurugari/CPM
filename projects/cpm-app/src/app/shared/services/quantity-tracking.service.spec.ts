import { TestBed } from '@angular/core/testing';

import { QuantityTrackingService } from './quantity-tracking.service';

describe('QuantityTrackingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      QuantityTrackingService,
    ]
  }));

  it('should be created', () => {
    const service: QuantityTrackingService = TestBed.get(QuantityTrackingService);
    expect(service).toBeTruthy();
  });
});
