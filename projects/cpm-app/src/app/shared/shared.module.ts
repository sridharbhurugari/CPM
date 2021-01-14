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
import { NotificationComponent } from './components/notification/notification.component';
import { FormsModule } from '@angular/forms';
import { SplitResizeComponent } from './components/split-resize/split-resize.component';
import { DropdownPopupComponent } from './components/dropdown-popup/dropdown-popup.component';
import { GridSortColDirective } from './directives/grid-sort-col.directive';
import { CPDataLabelComponent } from './components/cp-data-label/cp-data-label.component';
import { GuidedItemHeaderComponent } from './components/guided-item-header/guided-item-header.component';
import { HeaderedContentControlComponent } from './components/headered-content-control/headered-content-control.component';
import { SplitFixedComponent } from './components/split-fixed/split-fixed.component';
import { ScalableTextComponent } from './components/scalable-text/scalable-text.component';
import { HorizontalTabsComponent } from './components/horizontal-tabs/horizontal-tabs.component';
import { TabContentsComponent } from './components/tab-contents/tab-contents.component';
import { ValidationIconComponent } from './components/validation-icon/validation-icon.component';
import { ValidationContainerComponent } from './components/validation-container/validation-container.component';
import { SafetyStockProductComponent } from './components/safety-stock-product/safety-stock-product.component';
import { CpGeneralHeaderComponent } from './components/cp-general-header/cp-general-header.component';

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
    NotificationComponent,
    SplitResizeComponent,
    DropdownPopupComponent,
    GridSortColDirective,
    CPDataLabelComponent,
    GuidedItemHeaderComponent,
    HeaderedContentControlComponent,
    SplitFixedComponent,
    ScalableTextComponent,
    HorizontalTabsComponent,
    TabContentsComponent,
    ValidationIconComponent,
    ValidationContainerComponent,
    SafetyStockProductComponent,
    CpGeneralHeaderComponent,
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
    CPDataLabelComponent,
    NotificationComponent,
    SplitResizeComponent,
    DropdownPopupComponent,
    GridSortColDirective,
    GuidedItemHeaderComponent,
    SplitFixedComponent,
    ScalableTextComponent,
    HeaderedContentControlComponent,
    HorizontalTabsComponent,
    TabContentsComponent,
    ValidationIconComponent,
    CpGeneralHeaderComponent,
  ],
  entryComponents: [
    TextResultPopupComponent,
    ConfirmPopupComponent,
    SpinnerPopupComponent,
    DropdownPopupComponent
  ]
})
export class SharedModule { }
