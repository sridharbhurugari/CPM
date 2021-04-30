import { TestBed } from '@angular/core/testing';


import { HttpClient } from 'selenium-webdriver/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClientModule } from '@angular/common/http';
import { UtilizationDeailsService } from './utilization-details.service';

describe('PocketsWithErrorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      { provide: HttpClient, useValue: { pocketsWithErrors: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} }
    ]
  }));

  it('should be created', () => {
    const service: UtilizationDeailsService = TestBed.get(UtilizationDeailsService);
    expect(service).toBeTruthy();
  });
});
