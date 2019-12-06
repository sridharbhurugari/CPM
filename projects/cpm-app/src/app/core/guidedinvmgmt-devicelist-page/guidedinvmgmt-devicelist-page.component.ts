import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GuidedDeviceList } from '../model/guided-device-list';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GuidedDeviceListService } from '../../api-core/services/guided-device-list-service';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';

@Component({
  selector: 'app-guidedinvmgmt-devicelist-page',
  templateUrl: './guidedinvmgmt-devicelist-page.component.html',
  styleUrls: ['./guidedinvmgmt-devicelist-page.component.scss']
})

export class GuidedInvMgmtDevicelistPageComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox', null) searchElement: SearchBoxComponent;
  guidedDeviceList: GuidedDeviceList[];
  private _guidedDeviceList: GuidedDeviceList[];

  private _mockList = [
    {
        DeviceId: 79, 
        DeviceDescription: 'Carousel2',
        EarliestExpirationDateInDevice: new Date(),
        NumberOfLocationsExpiringSoon: 1,
        NumberOfLocationsWithOutdatedCycleCount: 10,
        ContainsExpiredItem : true
    },
    {
      DeviceId: 79, 
      DeviceDescription: 'Shelf',
      EarliestExpirationDateInDevice: new Date('12/5/2020'),
      NumberOfLocationsExpiringSoon: 3,
      NumberOfLocationsWithOutdatedCycleCount: 4,
      ContainsExpiredItem : false
    },
    {
      DeviceId: 79, 
      DeviceDescription: 'Carousel1',
      EarliestExpirationDateInDevice: new Date('12/5/2019'),
      NumberOfLocationsExpiringSoon: 2,
      NumberOfLocationsWithOutdatedCycleCount: 0,
      ContainsExpiredItem : true
    },
  ];


  constructor(private guidedDeviceListService: GuidedDeviceListService) { }

  ngOnInit() {
    // this.guidedDeviceList = this.guidedDeviceListService.get().pipe(map(guidedDeviceListItems => {
    //   return guidedDeviceListItems.map(p => new GuidedDeviceList(p));
    // }));

    this._guidedDeviceList = this._mockList.sort((a,b) => a.DeviceDescription.localeCompare(b.DeviceDescription));
    this.guidedDeviceList = this._guidedDeviceList;
  }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        console.log(data);
        this.guidedDeviceList = this._guidedDeviceList.filter((x) => x.DeviceDescription.toLocaleLowerCase().includes(data.toLocaleLowerCase()));
      });
  }

}
