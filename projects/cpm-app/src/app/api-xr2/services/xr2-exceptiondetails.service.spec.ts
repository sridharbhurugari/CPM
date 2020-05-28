import { TestBed } from '@angular/core/testing';

import { Xr2ExceptionDetailsService } from './xr2-exceptiondetails.service';
import { HttpClient } from 'selenium-webdriver/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClientModule } from '@angular/common/http';

describe('Xr2ExceptionDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      { provide: HttpClient, useValue: { get: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
    ]
  }));

  it('should be created', () => {
    const service: Xr2ExceptionDetailsService = TestBed.get(Xr2ExceptionDetailsService);
    expect(service).toBeTruthy();
  });
});
