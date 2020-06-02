import { TestBed } from '@angular/core/testing';

import { ItemManagementService } from './item-management.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';

describe('ItemManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      { provide: HttpClient, useValue: { get: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} }
    ]
  }));

  it('should be created', () => {
    const service: ItemManagementService = TestBed.get(ItemManagementService);
    expect(service).toBeTruthy();
  });
});
