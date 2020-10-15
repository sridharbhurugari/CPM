import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicklistsQueueComponent } from './picklists-queue/picklists-queue.component';
import {
  GridModule, ButtonActionModule, SingleselectDropdownModule, CardContainerModule, DashboardCardModule, LayoutModule, FooterModule, SearchModule, InputsModule,
  PopupDialogModule, SvgIconModule, DaterangeModule, CheckboxModule
} from '@omnicell/webcorecomponents';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PicklistsQueuePageComponent } from './picklists-queue-page/picklists-queue-page.component';
import { QuickPickPageComponent } from './quick-pick-page/quick-pick-page.component';
import { environment } from '../../environments/environment';
import {Xr2ExceptionsPageComponent} from './Xr2-Exceptions-page/xr2-exceptions-page.component';
import {Xr2ExceptionDetailsPageComponent} from './xr2-exception-details-page/xr2-exceptions-details-page.component';
import { QuickPickQueueViewComponent } from './quick-pick-queue-view/quick-pick-queue-view.component';
import { QuickPickDrawerViewComponent } from './quick-pick-drawer-view/quick-pick-drawer-view.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { QuickPickDrawerDetailsViewComponent } from './quick-pick-drawer-details-view/quick-pick-drawer-details-view.component';
import { QuickPickBoxItemsView } from './quick-pick-box-items-view/quick-pick-box-items-view.component';
import { TrafficLightsComponent } from './traffic-lights/traffic-lights.component';
import {Xr2EventsPageComponent} from './xr2-events-page/xr2-events-page.component';
import { Xr2QueueGroupingPageComponent } from './xr2-queue-grouping-page/xr2-queue-grouping-page.component';
import { Xr2QueueDetailsPageComponent } from './xr2-queue-details-page/xr2-queue-details-page.component';
import { Xr2GroupingQueueComponent } from './xr2-grouping-queue/xr2-grouping-queue.component';
import { Xr2DetailsQueueComponent } from './xr2-details-queue/xr2-details-queue.component';
import { Xr2QueueGroupingHeaderComponent } from './xr2-queue-grouping-header/xr2-queue-grouping-header.component';
import { Xr2QueueDetailsHeaderComponent } from './xr2-queue-details-header/xr2-queue-details-header.component';
import { Xr2QueueButtonPanelComponent } from './xr2-queue-button-panel/xr2-queue-button-panel.component';
@NgModule({
  declarations: [
    PicklistsQueueComponent,
    PicklistsQueuePageComponent,
    Xr2ExceptionsPageComponent,
    Xr2ExceptionDetailsPageComponent,
    QuickPickPageComponent,
    QuickPickQueueViewComponent,
    QuickPickDrawerViewComponent,
    DashboardCardComponent,
    QuickPickDrawerDetailsViewComponent,
    QuickPickBoxItemsView,
    TrafficLightsComponent,
    Xr2EventsPageComponent,
    Xr2QueueGroupingPageComponent,
    Xr2QueueDetailsPageComponent,
    Xr2GroupingQueueComponent,
    Xr2DetailsQueueComponent,
    Xr2QueueGroupingHeaderComponent,
    Xr2QueueDetailsHeaderComponent,
    Xr2QueueButtonPanelComponent,
  ],
  imports: [
    CommonModule,
    GridModule,
    TranslateModule,
    RouterModule,
    ButtonActionModule,
    SingleselectDropdownModule,
    CardContainerModule,
    DashboardCardModule,
    LayoutModule,
    FooterModule,
    SharedModule,
    InputsModule,
    SearchModule,
    PopupDialogModule,
    CheckboxModule,
    SvgIconModule,
    DaterangeModule
  ]
})
export class Xr2Module { }
