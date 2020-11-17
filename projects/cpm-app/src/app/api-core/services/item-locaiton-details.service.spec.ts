import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

import { ItemLocaitonDetailsService } from './item-locaiton-details.service';

describe('ItemLocaitonDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: { get: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
    ]
  }));

  it('should be created', () => {
    const service: ItemLocaitonDetailsService = TestBed.get(ItemLocaitonDetailsService);
    expect(service).toBeTruthy();
  });
});
