import { TestBed } from '@angular/core/testing';

import { DeviceLocationAccessService } from './device-location-access.service';
import { CarouselLocationAccessService } from './carousel-location-access.service';
import { OpenStorageLocationAccessService } from './open-storage-location-access.service';

describe('DeviceLocationAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: CarouselLocationAccessService, useValue: {} },
      { provide: OpenStorageLocationAccessService, useValue: {} },
    ]
  }));

  it('should be created', () => {
    const service: DeviceLocationAccessService = TestBed.get(DeviceLocationAccessService);
    expect(service).toBeTruthy();
  });
});
