import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternalTransferDeviceNeedsPageComponent } from "./internal-transfer-device-needs-page/internal-transfer-device-needs-page.component";
import { InternalTransferDeviceSummariesPageComponent } from "./internal-transfer-device-summaries-page/internal-transfer-device-summaries-page.component";
import { GuidedinvmgmtManualcyclecountPageComponent } from "./guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component";
import { HardwareLeasePageComponent } from "./hardware-lease-page/hardware-lease-page.component";
import { ItemManagementComponent } from "./item-management/item-management.component";
import { PriorityCodePickRoutesPageComponent } from "./priority-code-pick-routes-page/priority-code-pick-routes-page.component";
import { PriorityCodeRouteAssignmentsPageComponent } from "./priority-code-route-assignments-page/priority-code-route-assignments-page.component";
import { GuidedInvMgmtDevicelistPageComponent } from "./guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component";
import { EditPickRoutePageComponent } from "./edit-pick-route-page/edit-pick-route-page.component";
import { GuidedInvMgmtCycleCountPageComponent } from "./guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component";
import { UnderfilledPicklistsPageComponent } from "./underfilled-picklists-page/underfilled-picklists-page.component";
import { UnderfilledPicklistLinesPageComponent } from "./underfilled-picklist-lines-page/underfilled-picklist-lines-page.component";
import { InternalTransferPickPageComponent } from './internal-transfer-pick-page/internal-transfer-pick-page.component';
import { VerificationBasePageComponent } from './verification-base-page/verification-base-page.component';
import { LoadingComponent } from './loading/loading.component';
import { InternalTransferDeviceOndemandItemsPageComponent } from './internal-transfer-device-ondemand-items-page/internal-transfer-device-ondemand-items-page.component';
import { InternalTransferDeviceOndemandItemLocationsPageComponent } from './internal-transfer-device-ondemand-item-locations-page/internal-transfer-device-ondemand-item-locations-page.component';
import { PrepackVerificationQueueComponent } from './prepack-verification-queue/prepack-verification-queue.component';
import { PrepackVerificationQueueDetailComponent } from './prepack-verification-queue-detail/prepack-verification-queue-detail.component';
import { PrepackVerificationSelectionComponent } from './prepack-verification-selection/prepack-verification-selection.component';

const routes: Routes = [
  { path: 'internalTransfer/deviceReplenishmentNeeds', component: InternalTransferDeviceSummariesPageComponent },
  { path: 'internalTransfer/deviceReplenishmentNeeds/:deviceId', component: InternalTransferDeviceNeedsPageComponent },
  { path: 'internalTransfer/deviceReplenishmentOnDemand/:deviceId', component: InternalTransferDeviceOndemandItemsPageComponent },
  { path: 'guidedinvmgmt/manualcyclecount', component: GuidedinvmgmtManualcyclecountPageComponent },
  { path: 'hardwareLease/requestLease', component: HardwareLeasePageComponent },
  { path: 'itemmanagement', component: ItemManagementComponent },
  { path: 'priorityCodePickRoutes', component: PriorityCodePickRoutesPageComponent },
  { path: 'priorityCode/RouteAssignments', component: PriorityCodeRouteAssignmentsPageComponent },
  { path: 'guidedinvmgmt/devicelist', component: GuidedInvMgmtDevicelistPageComponent },
  { path: 'pickRoutes/:pickRouteId', component: EditPickRoutePageComponent },
  { path: 'guidedinvmgmt/cyclecount', component: GuidedInvMgmtCycleCountPageComponent },
  { path: 'picklists/underfilled', component: UnderfilledPicklistsPageComponent },
  { path: 'picklists/underfilled/picklistLines', component: UnderfilledPicklistLinesPageComponent },
  { path: 'internalTransfer/guidedpicking', component: InternalTransferPickPageComponent },
  { path: 'verification', component: VerificationBasePageComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'internalTransfer/deviceReplenishmentOnDemand/ItemSource/deviceId/:deviceId/itemId/:itemId/packSize/:packSize', component: InternalTransferDeviceOndemandItemLocationsPageComponent },
  { path: 'prepackVerification', component: PrepackVerificationQueueComponent },
  { path: 'prepackVerificationSelection', component: PrepackVerificationSelectionComponent, data: { reuseComponent: true } },
  { path: 'prepackVerificationDetail/:prepackVerificationQueueId', component: PrepackVerificationQueueDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
