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
import { QuickPickOrderViewComponent } from './quick-pick-order-view/quick-pick-order-view.component';
import { QuickPickDrawerViewComponent } from './quick-pick-drawer-view/quick-pick-drawer-view.component';
import { QuickPickDrawerComponent } from './quick-pick-drawer/quick-pick-drawer.component';
@NgModule({
  declarations: [PicklistsQueueComponent, PicklistsQueuePageComponent, Xr2ExceptionsPageComponent, QuickPickPageComponent, QuickPickOrderViewComponent, QuickPickDrawerViewComponent, QuickPickDrawerComponent],
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
