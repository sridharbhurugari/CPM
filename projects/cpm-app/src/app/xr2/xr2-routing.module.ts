import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PicklistsQueuePageComponent } from "./picklists-queue-page/picklists-queue-page.component";
import { Xr2ExceptionsPageComponent } from "./Xr2-Exceptions-page/xr2-exceptions-page.component";
import { QuickPickPageComponent } from "./quick-pick-page/quick-pick-page.component";
import { Xr2ExceptionDetailsPageComponent } from "./xr2-exception-details-page/xr2-exceptions-details-page.component";
import { Xr2EventsPageComponent } from "./xr2-events-page/xr2-events-page.component";
import { Xr2QueuePageComponent } from './xr2-queue-page/xr2-queue-page.component';


const routes: Routes = [
  { path: 'picklists/queue', component: PicklistsQueuePageComponent/*,
  resolve: {
    cpmSignalR: CpmSignalRResolverService
  }*/ },
  { path: 'stocking/exceptions', component: Xr2ExceptionsPageComponent },
  { path: 'quickpick', component: QuickPickPageComponent },
  { path: 'stocking/exceptiondetails', component: Xr2ExceptionDetailsPageComponent },
  { path: 'settings/xr2eventslist', component: Xr2EventsPageComponent },
  { path: 'xr2Queue', component: Xr2QueuePageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Xr2RoutingModule { }
