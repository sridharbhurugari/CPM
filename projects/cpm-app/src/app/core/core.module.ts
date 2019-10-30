import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderfilledPicklistsPageComponent } from './underfilled-picklists-page/underfilled-picklists-page.component';
import { UnderfilledPicklistsComponent } from './underfilled-picklists/underfilled-picklists.component';

import { GridModule, ButtonActionModule, LayoutModule, FooterModule } from '@omnicell/webcorecomponents';
import { TranslateModule } from '@ngx-translate/core';
import { UnderfilledPicklistLinesPageComponent } from './underfilled-picklist-lines-page/underfilled-picklist-lines-page.component';
import { UnderfilledPicklistLinesComponent } from './underfilled-picklist-lines/underfilled-picklist-lines.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PriorityCodePickRoutesPageComponent } from './priority-code-pick-routes-page/priority-code-pick-routes-page.component';
import { PriorityCodePickRoutesComponent } from './priority-code-pick-routes/priority-code-pick-routes.component';



@NgModule({
  declarations: [
    UnderfilledPicklistsPageComponent,
    UnderfilledPicklistsComponent,
    UnderfilledPicklistLinesPageComponent,
    UnderfilledPicklistLinesComponent,
    PriorityCodePickRoutesPageComponent,
    PriorityCodePickRoutesComponent
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
  ]
})
export class CoreModule { }
