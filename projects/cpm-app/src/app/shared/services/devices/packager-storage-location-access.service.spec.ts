import { TestBed } from '@angular/core/testing';

import { PackagerStorageLocationAccessService } from './packager-storage-location-access.service';
import { HardwareLeaseService } from '../../../api-core/services/hardware-lease-service';
import { LeaseVerificationResult } from '../../../api-core/data-contracts/lease-verification-result';
import { of } from 'rxjs';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';

describe('PackagerStorageLocationAccessService', () => {
  let service: PackagerStorageLocationAccessService;
  let hardwareLeaseService: Partial<HardwareLeaseService>;
  let leaseVerificationResult: LeaseVerificationResult;

  beforeEach(() => {
    hardwareLeaseService = {
      HasDeviceLease: () => { return of(leaseVerificationResult); }
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: HardwareLeaseService, useValue: hardwareLeaseService },
      ]
    })
    service = TestBed.get(PackagerStorageLocationAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('accessLocation', () => {
    describe('given LeaseVerificationResult.Success', () => {
      beforeEach(() => {
        leaseVerificationResult = LeaseVerificationResult.Success;
      });

      it('should return succeeded access result', (done) => {
        let deviceLocation: any = {};
        let itemDisplay: any = {};
        service.accessLocation(deviceLocation, itemDisplay).subscribe(x => {
          expect(x).toBe(DeviceLocationAccessResult.Succeeded);
          done();
        });
      });
    });

    describe('given LeaseVerificationResult.Failure', () => {
      beforeEach(() => {
        leaseVerificationResult = LeaseVerificationResult.Failure;
      });

      it('should return succeeded access result', (done) => {
        let deviceLocation: any = {};
        let itemDisplay: any = {};
        service.accessLocation(deviceLocation, itemDisplay).subscribe(x => {
          expect(x).toBe(DeviceLocationAccessResult.LeaseNotAvailable);
          done();
        });
      });
    });
  })
});
