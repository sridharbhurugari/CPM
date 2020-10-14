import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { WindowService } from '../../shared/services/window-service';
import { SearchBoxComponent, PopupWindowProperties, PopupWindowService, PopupDialogType, PopupDialogService, PopupDialogProperties } from '@omnicell/webcorecomponents';
import { nameof } from '../../shared/functions/nameof';
import { switchMap, take } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IConfirmPopupData } from '../../shared/model/i-confirm-popup-data';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { PopupWindowComponent } from '@omnicell/webcorecomponents/lib/popupwindow/popup-window.component';

@Component({
  selector: 'app-underfilled-picklists',
  templateUrl: './underfilled-picklists.component.html',
  styleUrls: ['./underfilled-picklists.component.scss']
})
export class UnderfilledPicklistsComponent implements AfterViewInit{
  private _picklists: UnderfilledPicklist[];

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  searchTextFilter: string;

  searchFields = [
    nameof<UnderfilledPicklist>('DescriptionSearchValue'),
    nameof<UnderfilledPicklist>('DesintationSearchValue'),
    nameof<UnderfilledPicklist>('DateSearchValue'),
    nameof<UnderfilledPicklist>('PriorityDescription'),
    nameof<UnderfilledPicklist>('OrderId'),
  ];

  sequencePropertyName = nameof<UnderfilledPicklist>('SequenceOrder');
  orderPropertyName = nameof<UnderfilledPicklist>('OrderId');
  typePropertyName =  nameof<UnderfilledPicklist>('PriorityDescription');
  descriptionPropertyName =  nameof<UnderfilledPicklist>('DescriptionSearchValue');
  destinationPropertyName = nameof<UnderfilledPicklist>('DesintationSearchValue');
  datePropertyName = nameof<UnderfilledPicklist>('CompletedDate');
  popupTimeoutSeconds = 10;
  private okButtonText;
  private failedToSavePopupTitle;
  private failedToSavePopupMessage;

  currentSortPropertyName : string = this.datePropertyName;
  sortOrder: SortDirection = SortDirection.descending;
  doesUserHaveDispensePermissions: boolean;

  @Input()
  set picklists(value: UnderfilledPicklist[]){
    this._picklists = value;
    if(this.windowService.nativeWindow){
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  get picklists(): UnderfilledPicklist[]{
    return this._picklists;
  }

  constructor(
    private windowService: WindowService,
    private wpfActionControllerService: WpfActionControllerService,
    private underfilledPicklistsService: UnderfilledPicklistsService,
    private popupWindowService: PopupWindowService,
    private translateService: TranslateService,
    private dialogService: PopupDialogService
  ) {
    this.translateService.get('OK').subscribe((res: string) => {
      this.okButtonText = res;});
    this.translateService.get('FAILEDTOSAVE_HEADER_TEXT').subscribe((res: string) => {
      this.failedToSavePopupTitle = res;});
    this.translateService.get('FAILEDTOSAVE_BODY_TEXT').subscribe((res: string) => {
        this.failedToSavePopupMessage = res;});
    this.underfilledPicklistsService.doesUserHaveDeletePicklistPermissions().subscribe((res: boolean) => {
          this.doesUserHaveDispensePermissions = res;});
  }

  ngAfterViewInit(): void {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = data;
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }

  navigate(orderId: string){
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`picklists/underfilled/picklistLines`, {orderId: orderId});
  }

  columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.picklists = _.orderBy(this._picklists, x => x[this.currentSortPropertyName], event.SortDirection)
  }

  delete(underfilledPicklist: UnderfilledPicklist) {
    this.displayDeletePromptDialog(underfilledPicklist);
  }

  executeDelete(underfilledPicklist: UnderfilledPicklist) {
    underfilledPicklist.Saving = true;
    this.underfilledPicklistsService.delete(underfilledPicklist.OrderId).subscribe(x => {
      underfilledPicklist.Saving = false;
      _.remove(this.picklists, {
        OrderId: underfilledPicklist.OrderId
      });
    }, y => {
      underfilledPicklist.Saving = false;
      this.displayError();
    });
  }

  view(underfilledPicklist: UnderfilledPicklist) {
    this.navigate(underfilledPicklist.OrderId);
  }

  displayDeletePromptDialog(underfilledPicklist: UnderfilledPicklist) {
    const properties = new PopupWindowProperties();
    const data: IConfirmPopupData = {
      headerResourceKey: 'UNFILLED_DELET_PICKLIST_PROMPT_TITLE',
      confirmTextboxResourceKey: 'UNFILLED_DELET_PICKLIST_PROMPT_MESSAGE'
    };

    properties.data = data;

    let component = this.popupWindowService.show(ConfirmPopupComponent, properties) as unknown as ConfirmPopupComponent;
    component.dismiss.pipe(take(1)).subscribe(selectedConfirm => {
      if (selectedConfirm) {
        this.executeDelete(underfilledPicklist)
      }
    });
  }

  private displayError() {
    const properties = new PopupDialogProperties();
    properties.primaryButtonText = this.okButtonText;
    properties.titleElementText = this.failedToSavePopupTitle;
    properties.messageElementText = this.failedToSavePopupMessage;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 0;
    this.dialogService.showOnce(properties);
  }

}
