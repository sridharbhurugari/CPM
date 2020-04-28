import { TestBed } from '@angular/core/testing';

import { OpenStorageLocationAccessService } from './open-storage-location-access.service';
import { HardwareLeaseService } from '../../../api-core/services/hardware-lease-service';

describe('OpenStorageLocationAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HardwareLeaseService, useValue: { } },
    ]
  }));

  it('should be created', () => {
    const service: OpenStorageLocationAccessService = TestBed.get(OpenStorageLocationAccessService);
    expect(service).toBeTruthy();
  });
});
