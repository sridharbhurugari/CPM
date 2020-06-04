import { TestBed } from '@angular/core/testing';
import { HttpClient } from 'selenium-webdriver/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClientModule } from '@angular/common/http';
import { GuidedManualCycleCountServiceService } from './guided-manual-cycle-count-service.service';

describe('GuidedManualCycleCountServiceService', () => {
 beforeEach(() => TestBed.configureTestingModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: HttpClient, useValue: { get: () => {}} },
    { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
    { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
  ]
 }));

 it('should be created', () => {
   const service: GuidedManualCycleCountServiceService = TestBed.get(GuidedManualCycleCountServiceService);
   expect(service).toBeTruthy();
  });
});
