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
import { ItemManagementPageComponent } from './core/item-management-page/item-management-page.component';


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
  { path: 'itemmanagement', component: ItemManagementPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
