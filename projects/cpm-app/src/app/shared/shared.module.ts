import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { SearchPipe } from './pipes/search.pipe';
import { ColHeaderSortableComponent } from './components/col-header-sortable/col-header-sortable.component';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconModule, CheckboxModule, InputsModule, ButtonActionModule, PopupWindowModule, FooterModule } from '@omnicell/webcorecomponents';
import { GridMultiSelectDirective } from './directives/grid-multi-select.directive';
import { GridReorderDirective } from './directives/grid-reorder.directive';
import { RowReorderButtonsComponent } from './components/row-reorder-buttons/row-reorder-buttons.component';
import { TextResultPopupComponent } from './components/text-result-popup/text-result-popup.component';

@NgModule({
  declarations: [
    HeaderContainerComponent,
    SearchPipe,
    ColHeaderSortableComponent,
    GridMultiSelectDirective,
    GridReorderDirective,
    RowReorderButtonsComponent,
    TextResultPopupComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    SvgIconModule,
    InputsModule,
    CheckboxModule,
    ButtonActionModule,
    PopupWindowModule,
    FooterModule,
  ],
  exports: [
    HeaderContainerComponent,
    ColHeaderSortableComponent,
    SearchPipe,
    GridMultiSelectDirective,
    RowReorderButtonsComponent,
    GridReorderDirective,
    TextResultPopupComponent,
  ],
  entryComponents: [
    TextResultPopupComponent
  ]
})
export class SharedModule { }
