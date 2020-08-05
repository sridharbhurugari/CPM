import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { SearchPipe } from './pipes/search.pipe';
import { ColHeaderSortableComponent } from './components/col-header-sortable/col-header-sortable.component';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconModule, CheckboxModule, InputsModule, ButtonActionModule, PopupWindowModule, FooterModule, ToastModule } from '@omnicell/webcorecomponents';
import { GridMultiSelectDirective } from './directives/grid-multi-select.directive';
import { GridReorderDirective } from './directives/grid-reorder.directive';
import { RowReorderButtonsComponent } from './components/row-reorder-buttons/row-reorder-buttons.component';
import { TextResultPopupComponent } from './components/text-result-popup/text-result-popup.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { HeaderTitleBottomMarginContainerComponent } from './components/header-title-bottom-margin-container/header-title-bottom-margin-container.component';
import { DeviceLocationAccessComponent } from './components/device-location-access/device-location-access.component';
import { SpinnerPopupComponent } from './components/spinner-popup/spinner-popup.component';
import { CPClickableIconComponent } from './components/cp-clickable-icon/cp-clickable-icon.component';
import { FormsModule } from '@angular/forms';
import { SplitResizeComponent } from './components/split-resize/split-resize.component';
import { DropdownPopupComponent } from './components/dropdown-popup/dropdown-popup.component';
import { GridSortColDirective } from './directives/grid-sort-col.directive';

@NgModule({
  declarations: [
    HeaderContainerComponent,
    SearchPipe,
    ColHeaderSortableComponent,
    GridMultiSelectDirective,
    GridReorderDirective,
    RowReorderButtonsComponent,
    TextResultPopupComponent,
    ConfirmPopupComponent,
    HeaderTitleBottomMarginContainerComponent,
    DeviceLocationAccessComponent,
    SpinnerPopupComponent,
    CPClickableIconComponent,
    SplitResizeComponent,
    DropdownPopupComponent,
    GridSortColDirective,
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
    ToastModule,
    FormsModule,
  ],
  exports: [
    HeaderContainerComponent,
    ColHeaderSortableComponent,
    SearchPipe,
    GridMultiSelectDirective,
    RowReorderButtonsComponent,
    GridReorderDirective,
    TextResultPopupComponent,
    SpinnerPopupComponent,
    ConfirmPopupComponent,
    HeaderTitleBottomMarginContainerComponent,
    DeviceLocationAccessComponent,
    CPClickableIconComponent,
    SplitResizeComponent,
    DropdownPopupComponent,
    GridSortColDirective,
  ],
  entryComponents: [
    TextResultPopupComponent,
    ConfirmPopupComponent,
    SpinnerPopupComponent,
    DropdownPopupComponent
  ]
})
export class SharedModule { }
