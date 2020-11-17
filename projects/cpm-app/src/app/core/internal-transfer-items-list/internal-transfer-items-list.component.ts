import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { nameof } from '../../shared/functions/nameof';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { IGridSelectionChanged } from '../../shared/events/i-grid-selection-changed';
import { CheckboxValues } from '../../shared/constants/checkbox-values';
import { fixCheckAllNoneClass } from '../../shared/functions/fixCheckAllNoneClass';

@Component({
  selector: 'app-internal-transfer-items-list',
  templateUrl: './internal-transfer-items-list.component.html',
  styleUrls: ['./internal-transfer-items-list.component.scss']
})
export class InternalTransferItemsListComponent implements AfterViewInit {
  readonly itemDescriptionPropertyName: string = nameof<IItemReplenishmentNeed>('ItemFormattedGenericName');
  readonly brandPropertyName: string = nameof<IItemReplenishmentNeed>('ItemBrandName');
  readonly restockPropertyName: string = nameof<IItemReplenishmentNeed>('DeviceRestockLevel');
  readonly parPropertyName: string = nameof<IItemReplenishmentNeed>('DeviceParLevel');
  readonly needPropertyName: string = nameof<IItemReplenishmentNeed>('DeviceQuantityNeeded');
  readonly qohPropertyName: string = nameof<IItemReplenishmentNeed>('DeviceQuantityOnHand');
  readonly pendingPickPropertyName: string = nameof<IItemReplenishmentNeed>('PendingDevicePickQuantity');
  readonly PickLocationDescriptionPropertyName: string = nameof<IItemReplenishmentNeed>('PickLocationDescription');
  readonly PickLocationQohPropertyName: string = nameof<IItemReplenishmentNeed>('PickLocationQoh');
  private _itemNeeds: IItemReplenishmentNeed[];

  selectedItemNeeds: IItemReplenishmentNeed[] = new Array();

  checkboxToggleAll: string = CheckboxValues.ToggleAll;

  areAllValuesSelected: boolean;

  searchPropertyNames: string[] = [
    this.itemDescriptionPropertyName,
    this.brandPropertyName,
  ]

  searchTextFilter: string;

  @Input()
  set itemNeeds(value: IItemReplenishmentNeed[]) {
    this._itemNeeds = value;
    this.windowService.dispatchResizeEvent();
  }

  get itemNeeds(): IItemReplenishmentNeed[] {
    return this._itemNeeds;
  }

  @ViewChild('ocsearchbox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  @ViewChild('headerCheckContainer', {
    static: true
  })
  headerCheckContainer: ElementRef;

  @Output()
  selectionChanged: EventEmitter<IItemReplenishmentNeed[]> = new EventEmitter();

  constructor(
    private windowService: WindowService
  ) { }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
    .subscribe(data => {
      this.searchTextFilter = data;
      this.windowService.dispatchResizeEvent();
    });
    fixCheckAllNoneClass(this.headerCheckContainer);
  }

  selectedItemsChanged(selectionEvent: IGridSelectionChanged<IItemReplenishmentNeed>) {
    this.selectedItemNeeds = selectionEvent.selectedValues;
    this.selectionChanged.next(this.selectedItemNeeds);
    this.areAllValuesSelected = selectionEvent.areAllValuesSelected;
  }

}
