import { TestBed } from '@angular/core/testing';

import { UnderfilledPicklistsService } from './underfilled-picklists.service';
import { HttpClient } from 'selenium-webdriver/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClientModule } from '@angular/common/http';

describe('UnderfilledPicklistsService', () => {
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
    const service: UnderfilledPicklistsService = TestBed.get(UnderfilledPicklistsService);
    expect(service).toBeTruthy();
  });
});
