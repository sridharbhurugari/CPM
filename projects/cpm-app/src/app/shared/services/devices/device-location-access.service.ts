import { Injectable } from '@angular/core';
import { CarouselLocationAccessService } from './carousel-location-access.service';
import { OpenStorageLocationAccessService } from './open-storage-location-access.service';
import { IDeviceLocationAccessService } from './i-device-location-access-service';
import { IDeviceLocationAccessData } from '../../model/i-device-location-access-data';
import { IDeviceLocationAccessDisplayData } from '../../model/i-device-location-access-display-data';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeviceLocationAccessService {
  private readonly _services: IDeviceLocationAccessService[] = [];

  constructor(
    carouselLocationAccessService: CarouselLocationAccessService,
    openStorageLocationAccessService: OpenStorageLocationAccessService,
  ) {
    this._services.push(carouselLocationAccessService);
    this._services.push(openStorageLocationAccessService);
  }

  accessLocation(deviceLocation: IDeviceLocationAccessData, displayData: IDeviceLocationAccessDisplayData): Observable<DeviceLocationAccessResult> {
    let service = this._services.find(x => x.deviceLocationTypeId == deviceLocation.deviceLocationTypeId);
    return service.accessLocation(deviceLocation, displayData);
  }
}
