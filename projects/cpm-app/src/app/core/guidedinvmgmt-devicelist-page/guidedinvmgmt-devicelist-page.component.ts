import { Component, OnInit } from '@angular/core';
import { GuidedDeviceList } from '../model/guided-device-list';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuidedDeviceListService } from '../../api-core/services/guided-device-list-service';

@Component({
  selector: 'app-guidedinvmgmt-devicelist-page',
  templateUrl: './guidedinvmgmt-devicelist-page.component.html',
  styleUrls: ['./guidedinvmgmt-devicelist-page.component.scss']
})

export class GuidedInvMgmtDevicelistPageComponent implements OnInit {
  guidedDeviceList: GuidedDeviceList[];

  private _mockList = [{
      DeviceId: 79, 
      DeviceDescription: 'Carousel2',
      EarliestExpirationDateInDevice: new Date(),
      NumberOfLocationsExpiringSoon: 1,
      NumberOfLocationsWithOutdatedCycleCount: 10
  },
  {
    DeviceId: 79, 
    DeviceDescription: 'Carousel1',
    EarliestExpirationDateInDevice: new Date(),
    NumberOfLocationsExpiringSoon: 2,
    NumberOfLocationsWithOutdatedCycleCount: 0
  },];


  constructor(private guidedDeviceListService: GuidedDeviceListService) { }

  ngOnInit() {
    // this.guidedDeviceList = this.guidedDeviceListService.get().pipe(map(guidedDeviceListItems => {
    //   return guidedDeviceListItems.map(p => new GuidedDeviceList(p));
    // }));

    this.guidedDeviceList = this._mockList;
  }

}
