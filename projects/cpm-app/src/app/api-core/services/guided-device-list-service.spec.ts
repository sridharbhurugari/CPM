import { GuidedDeviceListService } from './guided-device-list-service';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

describe('GuidedDeviceListService', () => {
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
  
  it('should create an instance', () => {
    const service: GuidedDeviceListService = TestBed.get(GuidedDeviceListService);
    expect(service).toBeTruthy();
  });
});
