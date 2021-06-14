import * as _ from "lodash";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable, Subject } from "rxjs";
import {
  finalize,
  catchError,
  shareReplay,
  takeUntil,
  filter,
} from "rxjs/operators";
import { UtilizationService } from "../../api-xr2/services/utilization.service";
import { nameof } from "../../shared/functions/nameof";
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import { UtilizationEventConnectionService } from "../services/utilization-event-connection.service";
import { UtilizationDataEvent } from "../model/utilization-data-event";
import { WindowService } from "../../shared/services/window-service";
import { WpfInteropService } from "../../shared/services/wpf-interop.service";
import { ExpiringMedicationInfo } from "../model/utilization-expiring-medication-info";
import { EventEventId } from "../../shared/constants/event-event-id";
import { ErroredMedicationInfo } from "../model/utilization-errored-medication-info";
import { UnassignedMedicationInfo } from "../model/utilization-unassigned-medication-info";
import { Xr2StorageCapacityDisplay } from "../model/xr2-storage-capacity-display";
import { GridComponent } from "@omnicell/webcorecomponents";
import { NavigationExtras, Router } from "@angular/router";
import { BaseRouteReuseStrategy } from "../../core/base-route-reuse-strategy/base-route-reuse-strategy";
import { UtilizationHeaderComponent } from "../utilization-header/utilization-header.component";

@Component({
  selector: "app-utilization-page",
  templateUrl: "./utilization-page.component.html",
  styleUrls: ["./utilization-page.component.scss"],
})
export class UtilizationPageComponent implements OnInit {
  selectedDeviceInformation: SelectableDeviceInfo;
  requestDeviceUtilizationPocketSummaryInfo$: Observable<number>;
  deviceUtilizationPocketSummaryInfo: any[];
  searchTextFilter: string;
  currentSortPropertyName: string;
  screenState: UtilizationPageComponent.ListState =
    UtilizationPageComponent.ListState.NoData;
  ngUnsubscribe = new Subject();
  lastErrorMessage: string;
  eventDateTime: Date;

  expiringData: ExpiringMedicationInfo[];
  expiredLoaded: boolean = false;
  expiredItems: number = 0;
  expiredDoses: number = 0;

  expiringThisMonthLoaded: boolean = false;
  expiringThisMonthItems: number = 0;
  expiringThisMonthDoses: number = 0;

  notAssignedData: UnassignedMedicationInfo[];
  notAssignedLoaded: boolean = false;
  notAssignedItems: number = 999;
  notAssignedDoses: number = 999;

  pocketsWithErrorsData: ErroredMedicationInfo[];
  pocketsWithErrorsLoaded: boolean = false;
  pocketsWithErrorsItems: number = 0;
  pocketsWithErrorsDoses: number = 0;

  xr2StorageCapacityDisplays: Xr2StorageCapacityDisplay[];

  readonly pocketTypeDefinitionName = nameof<Xr2StorageCapacityDisplay>(
    "PocketTypeDefinition"
  );
  readonly percentageUsedName =
    nameof<Xr2StorageCapacityDisplay>("PercentageUsed");
  readonly pocketsRemainingName =
    nameof<Xr2StorageCapacityDisplay>("PocketsRemaining");

  @ViewChild("header", { static: false }) header: UtilizationHeaderComponent;
  @ViewChild("ocgrid", { static: false }) ocGrid: GridComponent;

  constructor(
    private utilizationService: UtilizationService,
    private utilizationEventConnectionService: UtilizationEventConnectionService,
    private windowService: WindowService,
    private wpfInteropService: WpfInteropService,
    private router: Router
  ) {
    this.setupDataRefresh();
  }

  ngOnInit() {
    if (!this.selectedDeviceInformation) {
      this.selectedDeviceInformation = new SelectableDeviceInfo(null);
      this.selectedDeviceInformation.DeviceId = 0;
    }
    this.setUtilizationService();
    this.refreshData();
  }
  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.utilizationEventConnectionService.UtilizationIncomingDataSubject.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((event) => this.onDataReceived(event));
    this.utilizationEventConnectionService.UtilizationIncomingDataErrorSubject.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((event) => this.onDataError(event));
    this.utilizationEventConnectionService.Xr2StorageCapacityDisplayEventSubject.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((event) =>
      this.onXr2StorageCapacityDisplayEventReceived(event)
    );
  }

  // On WPF Page Return in CPM, the page is already in the browser, so we reset the data
  /* istanbul ignore next */
  private setupDataRefresh() {
    let hash = this.windowService.getHash();
    this.wpfInteropService.wpfViewModelActivated
      .pipe(
        filter((x) => x == hash),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.eventDateTime = null;
        this.header.setToDefault();
        this.selectedDeviceInformation = this.header.selectedDeviceInformation;

        this.refreshData();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.next();
  }

  setUtilizationService() {
    // Utilization Service
    this.requestDeviceUtilizationPocketSummaryInfo$ = this.utilizationService
      .get(this.selectedDeviceInformation.DeviceId)
      .pipe(
        shareReplay(1),
        finalize(() => {
          if (this.selectedDeviceInformation.DeviceId === 0) {
            this.screenState = UtilizationPageComponent.ListState.NoData;
          } else {
            this.screenState =
              UtilizationPageComponent.ListState.WaitingForData;
          }
          console.log("on complete");
        }),
        catchError((error) => {
          this.lastErrorMessage = String(error.message);
          this.screenState = UtilizationPageComponent.ListState.Error;
          console.log("on error", error.message);
          throw error;
        })
      );
  }

  onDeviceSelectionChangedEvent($event) {
    if (this.selectedDeviceInformation !== $event) {
      this.selectedDeviceInformation = $event;
      this.refreshData();
    }
  }

  onRefreshClick() {
    this.refreshData();
  }

  private refreshData() {
    (<BaseRouteReuseStrategy>this.router.routeReuseStrategy).removeCacheItem(
      "utilization",
      true
    );
    this.screenState = UtilizationPageComponent.ListState.MakingDataRequest;
    this.expiredLoaded = false;
    this.expiringThisMonthLoaded = false;
    this.notAssignedLoaded = false;
    this.pocketsWithErrorsLoaded = false;

    this.setUtilizationService();
    this.requestDeviceUtilizationPocketSummaryInfo$.subscribe();
    console.log("onDeviceSelectionChanged DeviceId: ");
    console.log(this.selectedDeviceInformation.DeviceId);
  }

  onDataReceived(event: UtilizationDataEvent) {
    try {
      // only process events for our device
      if (event && event.DeviceId !== this.selectedDeviceInformation.DeviceId) {
        return;
      }

      // Event types: ExpiringMedsReceived  UnassignedMedsReceived  ErroredMedsReceived
      switch (event.EventId) {
        case EventEventId.ExpiringMedsReceived: {
          this.expiringData = event.UtilizationData as ExpiringMedicationInfo[];
          this.SetExpired();
          this.SetExpiringThisMonth();
          break;
        }
        case EventEventId.UnassignedMedsReceived: {
          this.notAssignedData =
            event.UtilizationData as UnassignedMedicationInfo[];
          this.SetNotAssigned();
          break;
        }
        case EventEventId.ErroredMedsReceived: {
          this.pocketsWithErrorsData =
            event.UtilizationData as ErroredMedicationInfo[];
          this.SetPocketsWithErrors();
          break;
        }
      }
      this.deviceUtilizationPocketSummaryInfo = event.UtilizationData;
      this.screenState = UtilizationPageComponent.ListState.Display;
      this.eventDateTime = event.EventDateTime;
    } catch (e) {
      this.screenState = UtilizationPageComponent.ListState.Error;
      this.lastErrorMessage = e.message;
      console.log("UtilizationPageComponent.onDataReceived ERROR");
      console.log(e);
    }
  }

  private onXr2StorageCapacityDisplayEventReceived(
    event: Xr2StorageCapacityDisplay[]
  ) {
    if (
      event &&
      event[0].DeviceId !== this.selectedDeviceInformation.DeviceId
    ) {
      return;
    }
    this.xr2StorageCapacityDisplays = event as Xr2StorageCapacityDisplay[];
    this.resizeGrid();
    this.screenState = UtilizationPageComponent.ListState.Display;
  }

  public SetExpired() {
    const exp = _.filter(this.expiringData, (e) => {
      return e.ExpiredCount > 0;
    });
    this.expiredItems = _(exp).countBy("ItemCode").size();
    this.expiredDoses = _.sumBy(this.expiringData, "ExpiredCount");
    this.expiredLoaded = true;
  }

  public SetExpiringThisMonth() {
    const exp = _.filter(this.expiringData, (e) => {
      return e.ExpiringCount > 0;
    });
    this.expiringThisMonthItems = _(exp).countBy("ItemCode").size();
    this.expiringThisMonthDoses = _.sumBy(this.expiringData, "ExpiringCount");
    this.expiringThisMonthLoaded = true;
  }

  public SetNotAssigned() {
    this.notAssignedItems = _(this.notAssignedData).countBy("ItemCode").size();
    // Check if null or unassigned
    if (this.notAssignedItems == null) {
      this.notAssignedItems = 0;
    }
    this.notAssignedDoses = _.sumBy(this.notAssignedData, "Inventory");
    this.notAssignedLoaded = true;
  }

  public SetPocketsWithErrors() {
    this.pocketsWithErrorsItems = _(this.pocketsWithErrorsData)
      .countBy("ItemCode")
      .size();
    this.pocketsWithErrorsDoses = _.sumBy(
      this.pocketsWithErrorsData,
      "ErrorsCount"
    );
    this.pocketsWithErrorsLoaded = true;
  }

  public NavigateToPocketDetailsPage(rowClicked: Xr2StorageCapacityDisplay) {
    if (rowClicked.PocketInventoryCount == 0) {
      return;
    }

    const navigationExtras: NavigationExtras = {
      queryParams: {
        DeviceId: rowClicked.DeviceId,
        PocketTypeId: rowClicked.PocketTypeId,
        DeviceDescription: this.selectedDeviceInformation.Description,
        TrayTypeDescription: rowClicked.PocketTypeDefinition,
      },
      fragment: "anchor",
    };
    this.router.navigate(["xr2/utilization/details"], navigationExtras);
  }
  /* istanbul ignore next */
  private resizeGrid() {
    setTimeout(() => {
      if (this.ocGrid) {
        this.ocGrid.checkTableBodyOverflown();
      }
    }, 250);
  }

  orderChanged(orderedItems: Xr2StorageCapacityDisplay[]) {
    this.xr2StorageCapacityDisplays = orderedItems;
  }

  onDataError(event) {
    try {
      if (
        event.DeviceId !== undefined &&
        event.DeviceId !== this.selectedDeviceInformation.DeviceId
      ) {
        return;
      }
      this.screenState = UtilizationPageComponent.ListState.Error;
    } catch (e) {
      this.screenState = UtilizationPageComponent.ListState.Error;
      this.lastErrorMessage = e.message;
      console.log("UtilizationPageComponent.onDataError ERROR");
      console.log(e);
    }
  }

  showExpiredDetails() {
    this.router.navigate([
      "xr2/utilization/detailsExpired/",
      this.selectedDeviceInformation.DeviceId,
    ]);
  }
  showExpiringThisMonthDetails() {
    this.router.navigate([
      "xr2/utilization/detailsExpiringThisMonth/",
      this.selectedDeviceInformation.DeviceId,
    ]);
  }
  showNotAssignedDetails() {
    this.router.navigate([
      "xr2/utilization/detailsNotAssigned/",
      this.selectedDeviceInformation.DeviceId,
    ]);
  }
  showPocketsWithErrorsDetails() {
    this.router.navigate([
      "xr2/utilization/detailsPocketsWithErrors/",
      this.selectedDeviceInformation.DeviceId,
    ]);
  }
  showDestock() {
    this.router.navigate([
      "xr2/utilization/destock",
      this.selectedDeviceInformation.DeviceId,
    ]);
  }
}
export namespace UtilizationPageComponent {
  export enum ListState {
    MakingDataRequest = "MakingDataRequest", // Request data from XR2. Data will arive as an event
    WaitingForData = "WaitingForData", // Data request completed and we are waiting for XR2's event to come back
    Error = "Error", // There was an error
    NoData = "NoData", // No data to display (no device was selected)
    Display = "Display", // Display data
  }
}
export enum OcAnimationSize {
  small,
  normal,
  large,
}
