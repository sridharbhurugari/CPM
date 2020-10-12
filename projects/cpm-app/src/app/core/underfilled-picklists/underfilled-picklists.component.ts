import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { WindowService } from '../../shared/services/window-service';
import { SearchBoxComponent, PopupWindowProperties, PopupWindowService } from '@omnicell/webcorecomponents';
import { nameof } from '../../shared/functions/nameof';
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IConfirmPopupData } from '../../shared/model/i-confirm-popup-data';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';

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

  currentSortPropertyName : string = this.datePropertyName;
  sortOrder: SortDirection = SortDirection.descending;

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
    private popupWindowService: PopupWindowService
  ) {
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
      alert('failure');
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

}
