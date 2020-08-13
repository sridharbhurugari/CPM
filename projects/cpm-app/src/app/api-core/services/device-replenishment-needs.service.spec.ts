import { TestBed } from '@angular/core/testing';

import { DeviceReplenishmentNeedsService } from './device-replenishment-needs.service';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';

describe('DeviceReplenishmentNeedsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: { get: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
    ]
  }));

  it('should be created', () => {
    const service: DeviceReplenishmentNeedsService = TestBed.get(DeviceReplenishmentNeedsService);
    expect(service).toBeTruthy();
  });
});
