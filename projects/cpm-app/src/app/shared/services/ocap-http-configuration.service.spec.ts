import { TestBed } from '@angular/core/testing';

import { OcapHttpConfigurationService } from './ocap-http-configuration.service';
import { LocalStorageService } from './local-storage.service';
import { IOcapHttpConfiguration } from '../interfaces/i-ocap-http-configuration';

describe('OcapHttpConfigurationService', () => {
  var localStorageService;
  var service: OcapHttpConfigurationService;
  beforeEach(() => {
  });
  
  describe('given ocap config is set', () => {
    const ocapConfig = { configKey: 'configValue' };
    beforeEach(() => {
      localStorageService = { getItem: (s: string) => JSON.stringify(ocapConfig) };
      spyOn(localStorageService, 'getItem').and.callThrough();
      TestBed.configureTestingModule({
        providers: [
          { provide: LocalStorageService, useValue: localStorageService }
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
          expect(localStorageService.getItem).toHaveBeenCalledTimes(1);
      });

      describe('then calling get again', () =>{
        it('should not call local storage twice', () => {
          service.get();
          expect(localStorageService.getItem).toHaveBeenCalledTimes(1);
        })
      });
    })
  });
  
  describe('given no ocap config is set', () => {
    beforeEach(() => {
      localStorageService = { getItem: (s: string) => undefined };
      TestBed.configureTestingModule({
        providers: [
          { provide: LocalStorageService, useValue: localStorageService }
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
