import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderfilledPicklistsPageComponent } from './underfilled-picklists-page/underfilled-picklists-page.component';
import { UnderfilledPicklistsComponent } from './underfilled-picklists/underfilled-picklists.component';

import { GridModule, ButtonActionModule, LayoutModule, FooterModule, SearchModule, InputsModule, SvgIconModule, ToastModule, ButtonToggleModule, ProgressAnimationModule, PopupWindowModule } from '@omnicell/webcorecomponents';
import { TranslateModule } from '@ngx-translate/core';
import { UnderfilledPicklistLinesPageComponent } from './underfilled-picklist-lines-page/underfilled-picklist-lines-page.component';
import { UnderfilledPicklistLinesComponent } from './underfilled-picklist-lines/underfilled-picklist-lines.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PriorityCodePickRoutesPageComponent } from './priority-code-pick-routes-page/priority-code-pick-routes-page.component';
import { PriorityCodePickRoutesComponent } from './priority-code-pick-routes/priority-code-pick-routes.component';
import { PriorityCodeRouteAssignmentsPageComponent } from './priority-code-route-assignments-page/priority-code-route-assignments-page.component';
import { PickRouteSelectComponent } from './pick-route-select/pick-route-select.component';
import { DeviceSequenceOrderComponent } from './device-sequence-order/device-sequence-order.component';
import { FormsModule } from '@angular/forms';
import { GuidedInvMgmtDevicelistPageComponent } from './guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component';
import { GuidedInvMgmtCycleCountPageComponent } from './guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component';

import { EditPickRoutePageComponent } from './edit-pick-route-page/edit-pick-route-page.component';
import { EditDeviceSequenceComponent } from './edit-device-sequence/edit-device-sequence.component';
import { HardwareLeasePageComponent } from './hardware-lease-page/hardware-lease-page.component';
import { ItemManagementComponent } from './item-management/item-management.component';
import { GuidedinvmgmtManualcyclecountPageComponent } from './guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component';
import { InternalTransferDeviceSummariesPageComponent } from './internal-transfer-device-summaries-page/internal-transfer-device-summaries-page.component';
import { InternalTransferDeviceListComponent } from './internal-transfer-device-list/internal-transfer-device-list.component';
import { InternalTransferDeviceNeedsPageComponent } from './internal-transfer-device-needs-page/internal-transfer-device-needs-page.component';
import { InternalTransferItemsListComponent } from './internal-transfer-items-list/internal-transfer-items-list.component';
import { ItemManagementListComponent } from './item-management-list/item-management-list.component';
import { CoreRoutingModule } from "./core-routing.module";
import { InternalTransferPickPageComponent } from './internal-transfer-pick-page/internal-transfer-pick-page.component';
import { InternalTransferPickNeedsListComponent } from './internal-transfer-pick-needs-list/internal-transfer-pick-needs-list.component';
import { GuidedPickComponent } from './guided-pick/guided-pick.component';
import { VerificationBasePageComponent } from './verification-base-page/verification-base-page.component';
import { VerificationOrderPageComponent } from './verification-order-page/verification-order-page.component';
import { VerificationDestinationPageComponent } from './verification-destination-page/verification-destination-page.component';
import { VerificationOrderQueueComponent } from './verification-order-queue/verification-order-queue.component';
import { VerificationOrderHeaderComponent } from './verification-order-header/verification-order-header.component';
import { VerificationDestinationQueueComponent } from './verification-destination-queue/verification-destination-queue.component';
import { VerificationDestinationHourQueueComponent } from './verification-destination-hour-queue/verification-destination-hour-queue.component';
import { VerificationDetailsPageComponent } from './verification-details-page/verification-details-page.component';
import { VerificationDashboardComponent } from './verification-dashboard/verification-dashboard.component';
import { LoadingComponent } from './loading/loading.component';
import { VerificationDetailsCardComponent } from './verification-details-card/verification-details-card.component';
import { InternalTransferDeviceOndemandItemsPageComponent } from './internal-transfer-device-ondemand-items-page/internal-transfer-device-ondemand-items-page.component';
import { InternalTransferDeviceOndemandItemsListComponent } from './internal-transfer-device-ondemand-items-list/internal-transfer-device-ondemand-items-list.component';
import { InternalTransferDeviceOndemandItemLocationsPageComponent } from './internal-transfer-device-ondemand-item-locations-page/internal-transfer-device-ondemand-item-locations-page.component';
import { InternalTransferDeviceOndemandItemLocationListComponent } from './internal-transfer-device-ondemand-item-location-list/internal-transfer-device-ondemand-item-location-list.component';
import { PrepackVerificationQueueComponent } from './prepack-verification-queue/prepack-verification-queue.component';
import { PrepackVerificationQueueDetailComponent } from './prepack-verification-queue-detail/prepack-verification-queue-detail.component';
import { PrepackVerificationSelectionComponent } from './prepack-verification-selection/prepack-verification-selection.component';

@NgModule({
  declarations: [
    UnderfilledPicklistsPageComponent,
    UnderfilledPicklistsComponent,
    UnderfilledPicklistLinesPageComponent,
    UnderfilledPicklistLinesComponent,
    PriorityCodePickRoutesPageComponent,
    PriorityCodePickRoutesComponent,
    PriorityCodeRouteAssignmentsPageComponent,
    DeviceSequenceOrderComponent,
    PriorityCodePickRoutesComponent,
    PickRouteSelectComponent,
    GuidedInvMgmtDevicelistPageComponent,
    EditPickRoutePageComponent,
    EditDeviceSequenceComponent,
    GuidedInvMgmtCycleCountPageComponent,
    HardwareLeasePageComponent,
    ItemManagementComponent,
    GuidedinvmgmtManualcyclecountPageComponent,
    InternalTransferDeviceSummariesPageComponent,
    InternalTransferDeviceListComponent,
    InternalTransferDeviceNeedsPageComponent,
    InternalTransferItemsListComponent,
    ItemManagementListComponent,
    InternalTransferPickPageComponent,
    InternalTransferPickNeedsListComponent,
    GuidedPickComponent,
    VerificationBasePageComponent,
    VerificationOrderPageComponent,
    VerificationDestinationPageComponent,
    VerificationOrderQueueComponent,
    VerificationOrderHeaderComponent,
    VerificationDestinationQueueComponent,
    VerificationDestinationHourQueueComponent,
    VerificationDetailsPageComponent,
    VerificationDashboardComponent,
    LoadingComponent,
    VerificationDetailsCardComponent,
    InternalTransferDeviceOndemandItemsPageComponent,
    InternalTransferDeviceOndemandItemsListComponent,
    InternalTransferDeviceOndemandItemLocationsPageComponent,
    InternalTransferDeviceOndemandItemLocationListComponent,
    PrepackVerificationQueueComponent,
    PrepackVerificationQueueDetailComponent,
    PrepackVerificationSelectionComponent,
  ],
  imports: [
    ButtonActionModule,
    ButtonToggleModule,
    CommonModule,
    CoreRoutingModule,
    FooterModule,
    FormsModule,
    GridModule,
    InputsModule,
    LayoutModule,
    ProgressAnimationModule,
    PopupWindowModule,
    RouterModule,
    SearchModule,
    SharedModule,
    SvgIconModule,
    ToastModule,
    TranslateModule,
  ],
})
export class CoreModule { }
