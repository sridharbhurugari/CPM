import { TestBed } from '@angular/core/testing';

import { SystemConfigurationService } from './system-configuration.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OcapUrlBuilderService } from './ocap-url-builder.service';
import { OcapHttpHeadersService } from './ocap-http-headers.service';
import { of, observable, Observable } from 'rxjs';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';

describe('SystemConfigurationService', () => {
  let httpClient: Partial<HttpClient>;
  let ocapUrlBuilderService: Partial<OcapUrlBuilderService>;
  let ocapHttpHeadersService: Partial<OcapHttpHeadersService>;
  let systemConfigurationService;
  const configurationValue = { Category: 'cat', SubCategory: 'subcat', Value: '1'};

  beforeEach(() => {
  });

  describe('given ocap config is set', () => {
    const ocapConfig = { configKey: 'configValue' };
    beforeEach(() => {

      ocapHttpHeadersService = { getHeaders: () => new HttpHeaders() };
      spyOn(ocapHttpHeadersService, 'getHeaders').and.callThrough();

      ocapUrlBuilderService = { buildUrl: () => typeof('') };
      spyOn(ocapUrlBuilderService, 'buildUrl').and.callThrough();

      systemConfigurationService = { GetConfigurationValues: () => of(configurationValue) };

      TestBed.configureTestingModule({
        providers: [
          { provide: HttpClient, useValue: httpClient },
          { provide: OcapUrlBuilderService, useValue: ocapUrlBuilderService },
          { provide: OcapHttpHeadersService, useValue: ocapHttpHeadersService }
        ]
      });
      systemConfigurationService = TestBed.get(SystemConfigurationService);
    });

    it('should be created', () => {
      expect(systemConfigurationService).toBeTruthy();
    });
  });
});
