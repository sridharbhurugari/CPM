import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderfilledPicklistsPageComponent } from './underfilled-picklists-page/underfilled-picklists-page.component';
import { UnderfilledPicklistsComponent } from './underfilled-picklists/underfilled-picklists.component';

import { GridModule } from '@omnicell/webcorecomponents';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [UnderfilledPicklistsPageComponent, UnderfilledPicklistsComponent],
  imports: [
    CommonModule,
    GridModule,
    TranslateModule
  ]
})
export class CoreModule { }
