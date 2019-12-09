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
  displayGuidedDeviceList: GuidedDeviceList[];
  private _guidedDeviceList: GuidedDeviceList[];
  sortColumn: string;
  sortAsc: boolean;
  
  readonly deviceColumn = "DeviceDescription";
  readonly cycleCountColumn = "NumberOfLocationsWithOutdatedCycleCount";
  readonly expiringSoonColumn = "NumberOfLocationsExpiringSoon";

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
    this.sortColumn = this.deviceColumn;
    this.sortAsc = true;
    // this.displayGuidedDeviceList = this._guidedDeviceList = this.guidedDeviceListService.get().pipe(map(guidedDeviceListItems => {
    //   return guidedDeviceListItems.map(p => new GuidedDeviceList(p));
    // }));

    this.displayGuidedDeviceList = this._guidedDeviceList = this._mockList.sort((a,b) => a.DeviceDescription.localeCompare(b.DeviceDescription));
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
        this.displayGuidedDeviceList = this._guidedDeviceList.filter((x) => x.DeviceDescription.toLocaleLowerCase().includes(data.toLocaleLowerCase()));
      });
  }

  sort(column: string){
    if(column != this.sortColumn){
      this.sortAsc = true;
    }

    if(column==this.deviceColumn){
      this.displayGuidedDeviceList = this._guidedDeviceList.sort((a,b) => {
        if(this.sortAsc){
          return b.DeviceDescription.localeCompare(a.DeviceDescription);
        }else{
          return a.DeviceDescription.localeCompare(b.DeviceDescription);
        }
      });
    }
    if(column==this.cycleCountColumn){
      this.displayGuidedDeviceList = this._guidedDeviceList.sort((a,b) => {
        if(this.sortAsc){
          return b.NumberOfLocationsWithOutdatedCycleCount - a.NumberOfLocationsWithOutdatedCycleCount;
        }else{
          return a.NumberOfLocationsWithOutdatedCycleCount - b.NumberOfLocationsWithOutdatedCycleCount;
        }
      });
    }
    if(column==this.expiringSoonColumn){
      this.displayGuidedDeviceList = this._guidedDeviceList.sort((a,b) => {
        if(this.sortAsc){
          return b.NumberOfLocationsExpiringSoon - a.NumberOfLocationsExpiringSoon;
        }else{
          return a.NumberOfLocationsExpiringSoon - b.NumberOfLocationsExpiringSoon;
        }
      });
    }

    this.sortColumn = column;
    this.sortAsc = !this.sortAsc;
  }

}
