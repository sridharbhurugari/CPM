import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicklistsQueueComponent } from './picklists-queue/picklists-queue.component';
import { GridModule, ButtonActionModule, SingleselectDropdownModule, CardContainerModule, DashboardCardModule, LayoutModule, FooterModule, SearchModule, InputsModule,
  PopupDialogModule } from '@omnicell/webcorecomponents';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PicklistsQueuePageComponent } from './picklists-queue-page/picklists-queue-page.component';
import { QuickPickPageComponent } from './quick-pick-page/quick-pick-page.component';
import { environment } from '../../environments/environment';
import {Xr2ExceptionsPageComponent} from './Xr2-Exceptions-page/xr2-exceptions-page.component';
import { QuickPickQueueViewComponent } from './quick-pick-queue-view/quick-pick-queue-view.component';
import { QuickPickDrawerViewComponent } from './quick-pick-drawer-view/quick-pick-drawer-view.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { QuickPickDrawerDetailsViewComponent } from './quick-pick-drawer-details-view/quick-pick-drawer-details-view.component';
import { DashboardDetailsCardComponent } from './dashboard-details-card/dashboard-details-card.component';
import { QuickPickScrollViewComponent } from './quick-pick-scroll-view/quick-pick-scroll-view.component';
import { TrafficLightsComponent } from './traffic-lights/traffic-lights.component';
@NgModule({
  declarations: [PicklistsQueueComponent, PicklistsQueuePageComponent, Xr2ExceptionsPageComponent, QuickPickPageComponent, QuickPickQueueViewComponent, QuickPickDrawerViewComponent, DashboardCardComponent, QuickPickDrawerDetailsViewComponent, DashboardDetailsCardComponent, QuickPickScrollViewComponent, TrafficLightsComponent],
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
    PopupDialogModule
  ]
})
export class Xr2Module {}
