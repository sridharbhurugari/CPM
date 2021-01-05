import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

import { InventoryManagementService } from './inventory-management.service';

describe('InventoryManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: { get: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
    ]
  }));

  it('should be created', () => {
    const service: InventoryManagementService = TestBed.get(InventoryManagementService);
    expect(service).toBeTruthy();
  });
});
