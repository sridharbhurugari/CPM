import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicklistsQueueComponent } from './picklists-queue/picklists-queue.component';
import { GridModule, ButtonActionModule, LayoutModule, FooterModule, SearchModule, InputsModule,
  PopupDialogModule } from '@omnicell/webcorecomponents';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PicklistsQueuePageComponent } from './picklists-queue-page/picklists-queue-page.component';

@NgModule({
  declarations: [PicklistsQueueComponent, PicklistsQueuePageComponent],
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
    PopupDialogModule
  ]
})
export class Xr2Module { }
