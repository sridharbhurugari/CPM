import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PicklistsQueuePageComponent } from "./picklists-queue-page/picklists-queue-page.component";
import { Xr2ExceptionsPageComponent } from "./Xr2-Exceptions-page/xr2-exceptions-page.component";
import { QuickPickPageComponent } from "./quick-pick-page/quick-pick-page.component";
import { Xr2ExceptionDetailsPageComponent } from "./xr2-exception-details-page/xr2-exceptions-details-page.component";
import { Xr2EventsPageComponent } from "./xr2-events-page/xr2-events-page.component";
import { Xr2QueueGroupingPageComponent } from "./xr2-queue-grouping-page/xr2-queue-grouping-page.component";
import { Xr2QueueDetailsPageComponent } from "./xr2-queue-details-page/xr2-queue-details-page.component";


const routes: Routes = [
  { path: 'picklists/queue', component: PicklistsQueuePageComponent/*,
  resolve: {
    cpmSignalR: CpmSignalRResolverService
  }*/ },
  { path: 'stocking/exceptions', component: Xr2ExceptionsPageComponent },
  { path: 'quickpick', component: QuickPickPageComponent },
  { path: 'stocking/exceptiondetails', component: Xr2ExceptionDetailsPageComponent },
  { path: 'settings/xr2eventslist', component: Xr2EventsPageComponent },
  { path: 'xr2Queue/grouping', component: Xr2QueueGroupingPageComponent },
  { path: 'xr2Queue/details', component: Xr2QueueDetailsPageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Xr2RoutingModule { }