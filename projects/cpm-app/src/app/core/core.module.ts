import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderfilledPicklistsPageComponent } from './underfilled-picklists-page/underfilled-picklists-page.component';
import { UnderfilledPicklistsComponent } from './underfilled-picklists/underfilled-picklists.component';

import { GridModule, ButtonActionModule, LayoutModule, FooterModule, SearchModule, InputsModule, SvgIconModule } from '@omnicell/webcorecomponents';
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
    GuidedInvMgmtCycleCountPageComponent,
  ],
  imports: [
    CommonModule,
    GridModule,
    TranslateModule,
    RouterModule,
    ButtonActionModule,
    LayoutModule,
    FooterModule,
    SharedModule,
    InputsModule,
    SearchModule,
    SvgIconModule,
    FormsModule,
  ],})
export class CoreModule { }
