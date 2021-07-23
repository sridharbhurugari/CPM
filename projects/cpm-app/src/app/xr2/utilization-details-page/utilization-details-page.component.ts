import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Xr2StorageCapacityDetailsDisplay } from '../model/xr2-storage-capacity-details-display';
import { nameof } from '../../shared/functions/nameof';
import { Xr2StorageCapacityDetailsDisplayService } from '../../api-xr2/services/xr2-storage-capacity-details-display.service';
import { shareReplay, finalize, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SearchBoxComponent, GridComponent } from '@omnicell/webcorecomponents';

@Component({
  selector: 'app-utilization-details-page',
  templateUrl: './utilization-details-page.component.html',
  styleUrls: ['./utilization-details-page.component.scss']
})
export class UtilizationDetailsPageComponent implements OnInit {

  @ViewChild("searchBox", null) searchElement: SearchBoxComponent;

  deviceDescription: string;
  trayTypeDescription: string;
  header: string;
  xr2StorageCapacityDetailsDisplays: Xr2StorageCapacityDetailsDisplay[];
  loadingData: boolean;
  searchTextFilter: string;
  searchFields = [
    nameof<Xr2StorageCapacityDetailsDisplay>('ItemId'),
    nameof<Xr2StorageCapacityDetailsDisplay>('ItemDescription'),
  ];

  readonly itemDescriptionName = nameof<Xr2StorageCapacityDetailsDisplay>(
    "ItemDescription"
  );
  readonly trayTypeQohName = nameof<Xr2StorageCapacityDetailsDisplay>(
    "TrayTypeQoh"
  );
  readonly totalXr2QohName = nameof<Xr2StorageCapacityDetailsDisplay>(
    "TotalXr2Qoh"
  );
  readonly packsizeName = nameof<Xr2StorageCapacityDetailsDisplay>(
    "PacksizeSort"
  );
  readonly overstockName = nameof<Xr2StorageCapacityDetailsDisplay>(
    "OverstockSort"
  );

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  /* istanbul ignore next */
  constructor(private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private xr2StorageCapacityDetailsDisplayService: Xr2StorageCapacityDetailsDisplayService) { }

    /* istanbul ignore next */
  ngOnInit() {
    this.translateService.get('XR2_UTILIZATION_DETAILS_HEADER').subscribe((res: string) => {
      this.header = res;
    });
    this.loadingData = true;
    const deviceId = this.route.snapshot.queryParamMap.get('DeviceId');
    const pocketTypeId = this.route.snapshot.queryParamMap.get('PocketTypeId');
    this.deviceDescription = this.route.snapshot.queryParamMap.get('DeviceDescription');
    this.trayTypeDescription = this.route.snapshot.queryParamMap.get('TrayTypeDescription');
    this.xr2StorageCapacityDetailsDisplayService.get(deviceId, pocketTypeId).subscribe(x => {
      this.loadingData = false;
      this.xr2StorageCapacityDetailsDisplays = x;
      this.resizeGrid();
    });
  }

  /* istanbul ignore next */
  ngAfterViewInit() {
    this.searchElement.searchOutput$.subscribe((data) => {
      this.searchTextFilter = data;
    });
  }

  /* istanbul ignore next */
  public onNavigateBack() {
    this.router.navigate(['xr2/utilization']);
  }

  /* istanbul ignore next */
  orderChanged(orderedItems: Xr2StorageCapacityDetailsDisplay[]) {
    this.xr2StorageCapacityDetailsDisplays = orderedItems;
  }

  /* istanbul ignore next */
  private resizeGrid() {
    setTimeout(() => {
      if (this.ocGrid) {
        this.ocGrid.checkTableBodyOverflown();
      }
    }, 250);
  }

}
