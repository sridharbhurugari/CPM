import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GuidedDeviceList } from '../model/guided-device-list';
import { Observable, of } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { GuidedDeviceListService } from '../../api-core/services/guided-device-list-service';
import { SearchBoxComponent, PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WpfActionPaths } from '../constants/wpf-action-paths';
import { TranslateService } from '@ngx-translate/core';
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { LeaseVerificationResult } from '../../api-core/data-contracts/lease-verification-result';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { nameof } from '../../shared/functions/nameof';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';

@Component({
  selector: 'app-guidedinvmgmt-devicelist-page',
  templateUrl: './guidedinvmgmt-devicelist-page.component.html',
  styleUrls: ['./guidedinvmgmt-devicelist-page.component.scss']
})

export class GuidedInvMgmtDevicelistPageComponent implements OnInit, AfterViewInit {
  readonly devicePropertyName = nameof<GuidedDeviceList>("DeviceDescription");
  readonly lastCycleCountPropertyName = nameof<GuidedDeviceList>("NumberOfLocationsWithOutdatedCycleCount");
  readonly earliestExpirationDatePropertyName = nameof<GuidedDeviceList>("NumberOfLocationsExpiringSoon");

  @ViewChild('searchBox', null) searchElement: SearchBoxComponent;

  displayGuidedDeviceList$: Observable<GuidedDeviceList[]>;
  currentSortPropertyName: string = this.devicePropertyName;

  searchTextFilter: string;
  searchFields = [ this.devicePropertyName ];

  constructor(
    private guidedDeviceListService: GuidedDeviceListService,
    private wpfActionControllerService: WpfActionControllerService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private hardwareLeaseService: HardwareLeaseService

    ) { }

  ngOnInit() {
    this.displayGuidedDeviceList$ = this.guidedDeviceListService.get().pipe(map(guidedDeviceListItems => {
       return this.sort(guidedDeviceListItems.map(p => new GuidedDeviceList(p)), SortDirection.ascending);
    }), shareReplay(1));
  }

  navigateManualCycleCount() {
    this.wpfActionControllerService.ExecuteWpfContinueNavigationAction(WpfActionPaths.ManualCycleCountPath);
  }

  navigate(deviceId: number) {

    this.hardwareLeaseService.HasDeviceLease(deviceId).subscribe(
      currentDeviceLeaseOwner => {
        console.log('Current Device Lease Owner : ' + currentDeviceLeaseOwner);
        if (currentDeviceLeaseOwner === LeaseVerificationResult.Success) {
           this.wpfActionControllerService.ExecuteContinueNavigationAction(`guidedinvmgmt/cyclecount`, {deviceId: deviceId.toString()});
        } else {
           this.wpfActionControllerService.ExecuteContinueNavigationAction(
             `hardwareLease/requestLease`,
             {deviceId, routeToPath: `guidedinvmgmt/cyclecount` });
        }
      });
  }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = data;
      });
  }

  columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.displayGuidedDeviceList$ = this.displayGuidedDeviceList$.pipe(map(devices => {
      return this.sort(devices, event.SortDirection);
    }));
  }

  sort(devices: GuidedDeviceList[], sortDirection: Many<boolean|"asc"|"desc">): GuidedDeviceList[]{
      return _.orderBy(devices, x => x[this.currentSortPropertyName], sortDirection);
  }
}
