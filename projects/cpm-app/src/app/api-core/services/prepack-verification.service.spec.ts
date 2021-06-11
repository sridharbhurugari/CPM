import { TestBed } from '@angular/core/testing';

import { PrepackVerificationService } from './prepack-verification.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';

describe('PrepackVerificationService', () => {
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
    const service: PrepackVerificationService = TestBed.get(PrepackVerificationService);
    expect(service).toBeTruthy();
  });
});
