import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderfilledPicklistsPageComponent } from './core/underfilled-picklists-page/underfilled-picklists-page.component';
import { UnderfilledPicklistLinesPageComponent } from './core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component';
import { PriorityCodePickRoutesPageComponent } from './core/priority-code-pick-routes-page/priority-code-pick-routes-page.component';
// tslint:disable-next-line: max-line-length
import { PriorityCodeRouteAssignmentsPageComponent } from './core/priority-code-route-assignments-page/priority-code-route-assignments-page.component';


const routes: Routes = [
  { path: 'picklists/underfilled', component: UnderfilledPicklistsPageComponent },
  { path: 'picklists/underfilled/picklistLines', component: UnderfilledPicklistLinesPageComponent },
  { path: 'priorityCodePickRoutes', component: PriorityCodePickRoutesPageComponent },
  { path: 'priorityCode/RouteAssignments', component: PriorityCodeRouteAssignmentsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
