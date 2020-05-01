import { TestBed } from '@angular/core/testing';

import { DeviceOperationOutcomeMapperService } from './device-operation-outcome-mapper.service';
import { DeviceOperationOutcome } from '../../enums/device-operation-outcome';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';

describe('DeviceOperationResultMapperService', () => {
  let service: DeviceOperationOutcomeMapperService;
  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(DeviceOperationOutcomeMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mapOutcomeToAccessResult', () => {
    describe('given device operation outcome is offline', () => {
      it('should return device not online', () => {
        var result = service.mapOutcomeToAccessResult(DeviceOperationOutcome.DeviceOfflineOrNotFound);
        expect(result).toBe(DeviceLocationAccessResult.DeviceNotOnline);
      });
    });

    describe('given device operation outcome is inactive', () => {
      it('should return device inactive', () => {
        var result = service.mapOutcomeToAccessResult(DeviceOperationOutcome.DeviceInactive);
        expect(result).toBe(DeviceLocationAccessResult.DeviceInactive);
      });
    });

    describe('given device operation outcome is lease not avaiable', () => {
      it('should return device lease not available', () => {
        var result = service.mapOutcomeToAccessResult(DeviceOperationOutcome.DeviceNotLeasedToClient);
        expect(result).toBe(DeviceLocationAccessResult.LeaseNotAvailable);
      });
    });
  });
});
