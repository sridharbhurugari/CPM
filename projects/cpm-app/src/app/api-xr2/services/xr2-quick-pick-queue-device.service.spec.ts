import { TestBed } from '@angular/core/testing';
import { HttpClient } from 'selenium-webdriver/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClientModule } from '@angular/common/http';
import { Xr2QuickPickQueueDeviceService } from './xr2-quick-pick-queue-device.service';

describe('Xr2QuickPickQueueDeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      { provide: HttpClient, useValue: { get: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
    ]
  }));

  it('should be created', () => {
    const service: Xr2QuickPickQueueDeviceService = TestBed.get(Xr2QuickPickQueueDeviceService);
    expect(service).toBeTruthy();
  });
});
