import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { DeviceReplenishmentOnDemandService } from './device-replenishment-ondemand.service';

describe('DeviceReplenishmentOnDemandService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: { get: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
    ]
  }));

  it('should be created', () => {
    const service: DeviceReplenishmentOnDemandService = TestBed.get(DeviceReplenishmentOnDemandService);
    expect(service).toBeTruthy();
  });
});
