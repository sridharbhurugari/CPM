import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderfilledPicklistsPageComponent } from './core/underfilled-picklists-page/underfilled-picklists-page.component';
import { UnderfilledPicklistLinesPageComponent } from './core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component';
import { PriorityCodePickRoutesPageComponent } from './core/priority-code-pick-routes-page/priority-code-pick-routes-page.component';
import { PicklistsQueuePageComponent } from './xr2/picklists-queue-page/picklists-queue-page.component';
// tslint:disable-next-line: max-line-length
import { PriorityCodeRouteAssignmentsPageComponent } from './core/priority-code-route-assignments-page/priority-code-route-assignments-page.component';
import { GuidedInvMgmtDevicelistPageComponent } from './core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component';
import { EditPickRoutePageComponent } from './core/edit-pick-route-page/edit-pick-route-page.component';
/*import { CpmSignalRResolverService } from './xr2/services/cpm-signal-rresolver.service';*/
import { GuidedInvMgmtCycleCountPageComponent } from './core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component';
import { HardwareLeasePageComponent } from './core/hardware-lease-page/hardware-lease-page.component';
import { ItemManagementComponent } from './core/item-management/item-management.component';
import { Xr2ExceptionsPageComponent } from './xr2/Xr2-Exceptions-page/xr2-exceptions-page.component';
import { GuidedinvmgmtManualcyclecountPageComponent } from './core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component';
import { QuickPickPageComponent } from './xr2/quick-pick-page/quick-pick-page.component';
import { Xr2ExceptionDetailsPageComponent } from './xr2/xr2-exception-details-page/xr2-exceptions-details-page.component';
import { Xr2EventsPageComponent } from './xr2/xr2-events-page/xr2-events-page.component';
import { InternalTransferDeviceSummariesPageComponent } from './core/internal-transfer-device-summaries-page/internal-transfer-device-summaries-page.component';
import { InternalTransferDeviceNeedsPageComponent } from './core/internal-transfer-device-needs-page/internal-transfer-device-needs-page.component';
const routes: Routes = [
  { path: 'picklists/underfilled', component: UnderfilledPicklistsPageComponent },
  { path: 'picklists/underfilled/picklistLines', component: UnderfilledPicklistLinesPageComponent },
  { path: 'picklists/queue', component: PicklistsQueuePageComponent/*,
  resolve: {
    cpmSignalR: CpmSignalRResolverService
  }*/ },
  { path: 'priorityCodePickRoutes', component: PriorityCodePickRoutesPageComponent },
  { path: 'priorityCode/RouteAssignments', component: PriorityCodeRouteAssignmentsPageComponent },
  { path: 'guidedinvmgmt/devicelist', component: GuidedInvMgmtDevicelistPageComponent },
  { path: 'pickRoutes/:pickRouteId', component: EditPickRoutePageComponent },
  { path: 'guidedinvmgmt/cyclecount', component: GuidedInvMgmtCycleCountPageComponent },
  { path: 'hardwareLease/requestLease', component: HardwareLeasePageComponent },
  { path: 'itemmanagement', component: ItemManagementComponent },
  { path: 'stocking/exceptions', component: Xr2ExceptionsPageComponent },
  { path: 'guidedinvmgmt/manualcyclecount', component: GuidedinvmgmtManualcyclecountPageComponent },
  { path: 'quickpick', component: QuickPickPageComponent},
  { path: 'stocking/exceptiondetails', component: Xr2ExceptionDetailsPageComponent },
  { path: 'settings/xr2eventslist', component:Xr2EventsPageComponent },
  { path: 'internalTransfer/deviceReplenishmentNeeds', component:InternalTransferDeviceSummariesPageComponent },
  { path: 'internalTransfer/deviceReplenishmentNeeds/:deviceId', component:InternalTransferDeviceNeedsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
