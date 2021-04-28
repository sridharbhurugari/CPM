import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Xr2ExceptionsPageComponent } from "./Xr2-Exceptions-page/xr2-exceptions-page.component";
import { QuickPickPageComponent } from "./quick-pick-page/quick-pick-page.component";
import { Xr2ExceptionDetailsPageComponent } from "./xr2-exception-details-page/xr2-exceptions-details-page.component";
import { Xr2EventsPageComponent } from "./xr2-events-page/xr2-events-page.component";
import { Xr2QueuePageComponent } from './xr2-queue-page/xr2-queue-page.component';
import { DestockPageComponent } from './destock-page/destock-page.component';
import { UtilizationPageComponent } from './utilization-page/utilization-page.component';
import { DetailsPocketsWithErrorsComponent } from './utilization-details-pockets-with-errors/utilization-details-pockets-with-errors.component';

const routes: Routes = [
  { path: 'stocking/exceptions', component: Xr2ExceptionsPageComponent },
  { path: 'quickpick', component: QuickPickPageComponent },
  { path: 'stocking/exceptiondetails', component: Xr2ExceptionDetailsPageComponent },
  { path: 'settings/xr2eventslist', component: Xr2EventsPageComponent },
  { path: 'xr2Queue', component: Xr2QueuePageComponent },
  { path: 'destock', component: DestockPageComponent },
  { path: 'utilization', component: UtilizationPageComponent },
  { path: 'utilization/detailsPocketsWithErrors/:deviceId', component: DetailsPocketsWithErrorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Xr2RoutingModule { }
