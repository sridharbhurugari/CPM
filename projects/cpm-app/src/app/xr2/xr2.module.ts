import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicklistsQueueComponent } from './picklists-queue/picklists-queue.component';
import { GridModule, ButtonActionModule, SingleselectDropdownModule, LayoutModule, FooterModule, SearchModule, InputsModule,
  PopupDialogModule } from '@omnicell/webcorecomponents';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PicklistsQueuePageComponent } from './picklists-queue-page/picklists-queue-page.component';
import { environment } from '../../environments/environment';
import {Xr2ExceptionsPageComponent} from './xr2-exceptions-page/xr2-exceptions-page.component';
import {Xr2ExceptionDetailsPageComponent} from './xr2-exception-details-page/xr2-exceptions-details-page.component';
@NgModule({
  declarations: [PicklistsQueueComponent, PicklistsQueuePageComponent,Xr2ExceptionsPageComponent,Xr2ExceptionDetailsPageComponent],
  imports: [
    CommonModule,
    GridModule,
    TranslateModule,
    RouterModule,
    ButtonActionModule,
    SingleselectDropdownModule,
    LayoutModule,
    FooterModule,
    SharedModule,
    InputsModule,
    SearchModule,
    PopupDialogModule
  ]
})
export class Xr2Module {}
