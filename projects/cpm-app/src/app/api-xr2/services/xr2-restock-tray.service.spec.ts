import { TestBed } from '@angular/core/testing';

import { HttpClient } from 'selenium-webdriver/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClientModule } from '@angular/common/http';
import { Xr2RestockTrayService } from './xr2-restock-tray.service';

describe('Xr2RestockTrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      { provide: HttpClient, useValue: { get: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
    ]
  }));

  it('should be created', () => {
    const service: Xr2RestockTrayService = TestBed.get(Xr2RestockTrayService);
    expect(service).toBeTruthy();
  });
});
