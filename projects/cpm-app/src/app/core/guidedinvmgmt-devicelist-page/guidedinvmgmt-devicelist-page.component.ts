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
  displayGuidedDeviceList: Observable<GuidedDeviceList[]>;
  private _guidedDeviceList: Observable<GuidedDeviceList[]>;
  sortColumn: string;
  sortAsc: boolean;
  
  readonly deviceColumn = "DeviceDescription";
  readonly cycleCountColumn = "NumberOfLocationsWithOutdatedCycleCount";
  readonly expiringSoonColumn = "NumberOfLocationsExpiringSoon";

  constructor(private guidedDeviceListService: GuidedDeviceListService) { }

  ngOnInit() {
    this.sortColumn = this.deviceColumn;
    this.sortAsc = true;
    this.displayGuidedDeviceList = this._guidedDeviceList = this.guidedDeviceListService.get().pipe(map(guidedDeviceListItems => {
       return guidedDeviceListItems.map(p => new GuidedDeviceList(p)).sort((a,b) => a.DeviceDescription.localeCompare(b.DeviceDescription));
    }));
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
        this.displayGuidedDeviceList = this._guidedDeviceList.pipe(map(p => p.filter((x) => x.DeviceDescription.toLocaleLowerCase().includes(data.toLocaleLowerCase()))));
      });
  }

  sort(column: string){
    if(column != this.sortColumn){
      this.sortAsc = true;
    }

    if(column==this.deviceColumn){
      this.displayGuidedDeviceList = this._guidedDeviceList.pipe(map(o => o.sort((a,b) => {
        if(this.sortAsc){
          return b.DeviceDescription.localeCompare(a.DeviceDescription);
        }else{
          return a.DeviceDescription.localeCompare(b.DeviceDescription);
        }
      })));
    }
    if(column==this.cycleCountColumn){
      this.displayGuidedDeviceList = this._guidedDeviceList.pipe(map(o => o.sort((a,b) => {
        if(this.sortAsc){
          return b.NumberOfLocationsWithOutdatedCycleCount - a.NumberOfLocationsWithOutdatedCycleCount;
        }else{
          return a.NumberOfLocationsWithOutdatedCycleCount - b.NumberOfLocationsWithOutdatedCycleCount;
        }
      })));
    }
    if(column==this.expiringSoonColumn){
      this.displayGuidedDeviceList = this._guidedDeviceList.pipe(map(o => o.sort((a,b) => {
        if(this.sortAsc){
          return b.NumberOfLocationsExpiringSoon - a.NumberOfLocationsExpiringSoon;
        }else{
          return a.NumberOfLocationsExpiringSoon - b.NumberOfLocationsExpiringSoon;
        }
      })));
    }

    this.sortColumn = column;
    this.sortAsc = !this.sortAsc;
  }

}
