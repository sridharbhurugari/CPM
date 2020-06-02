import { TestBed } from '@angular/core/testing';

import { OcapHttpConfigurationService } from './ocap-http-configuration.service';
import { ConfigurationService } from 'oal-core';

describe('OcapHttpConfigurationService', () => {
  var configService;
  var service: OcapHttpConfigurationService;
  beforeEach(() => {
  });

  describe('given ocap config is set', () => {
    const ocapConfig =  { apiKey: 'itemVal', machineName: 'itemVal', clientId: 'itemVal', ocapServerIP: 'itemVal',
      port: 'itemVal', useSecured: 'itemVal', userLocale: 'itemVal',
      clientName: 'itemVal' };
    beforeEach(() => {

      configService = { getItem: (s: string) => 'itemVal' };
      spyOn(configService, 'getItem').and.callThrough();
      TestBed.configureTestingModule({
        providers: [
          { provide: ConfigurationService, useValue: configService }
        ]
      })
      service = TestBed.get(OcapHttpConfigurationService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('calling get', () => {
      var result;
      beforeEach(() => {
        result = service.get();
      })

      it('should return the existing config', () => {
        expect(result).toEqual(jasmine.objectContaining(ocapConfig))
      });

      it('should have called localStorageService.get', () => {
          expect(configService.getItem).toHaveBeenCalledTimes(8);
      });

      describe('then calling get again', () => {
        it('should not call local storage twice', () => {
          service.get();
          expect(configService.getItem).toHaveBeenCalledTimes(8);
        })
      });
    })
  });

  describe('given no ocap config is set', () => {
    beforeEach(() => {
      configService = { getItem: (s: string) => undefined };
      TestBed.configureTestingModule({
        providers: [
          { provide: ConfigurationService, useValue: configService }
        ]
      })
      service = TestBed.get(OcapHttpConfigurationService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('get', () => {
      it('should return empty config', () => {
          var result = service.get();
          expect('apiKey' in result).toBeTruthy();
      });
    })
  });
});
