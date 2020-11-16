import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { CheckboxValues } from '../../shared/constants/checkbox-values';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';
import { IGridSelectionChanged } from '../../shared/events/i-grid-selection-changed';
import { fixCheckAllNoneClass } from '../../shared/functions/fixCheckAllNoneClass';
import { nameof } from '../../shared/functions/nameof';
import { sumValues } from '../../shared/functions/sumValues';
import { InternalTransferPick } from '../model/internal-transfer-pick';

@Component({
  selector: 'app-internal-transfer-pick-needs-list',
  templateUrl: './internal-transfer-pick-needs-list.component.html',
  styleUrls: ['./internal-transfer-pick-needs-list.component.scss']
})
export class InternalTransferPickNeedsListComponent implements AfterViewInit {
  private _itemNeeds: InternalTransferPick[];

  @Input()
  set itemNeeds(value: InternalTransferPick[]) {
    this._itemNeeds = value;
    this.areAllValuesSelected = true;
    this.pickQtyChanged();
  }

  get itemNeeds(): InternalTransferPick[] {
    return this._itemNeeds;
  }

  @Output()
  pickTotalChanged: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('headerCheckContainer', {
    static: true
  })
  headerCheckContainer: ElementRef;

  checkboxToggleAll: string = CheckboxValues.ToggleAll;

  areAllValuesSelected: boolean = true;

  readonly destDevicePropertyName: string = nameof<InternalTransferPick>('DestinationDeviceDescription');
  readonly needPropertyName: string = nameof<InternalTransferPick>('DeviceQuantityNeeded');
  readonly qohPropertyName: string = nameof<InternalTransferPick>('DeviceQuantityOnHand');
  readonly pendingPickPropertyName: string = nameof<InternalTransferPick>('PendingDevicePickQuantity');
  readonly quantityToPick: string = nameof<InternalTransferPick>('QuantityToPick');

  constructor() { }

  ngAfterViewInit(): void {
    fixCheckAllNoneClass(this.headerCheckContainer);
  }

  pickQtyChanged(){
    if (!this.itemNeeds) {
      return;
    }

    let pickTotal = sumValues(this.itemNeeds, x => x.QuantityToPick);
    this.pickTotalChanged.emit(pickTotal);
  }

  selectedPicksChanged(selectionChanged: IGridSelectionChanged<IItemReplenishmentNeed | string>) {
    this.areAllValuesSelected = selectionChanged.areAllValuesSelected;
    let selected = selectionChanged.changeType === SelectionChangeType.selected;
    if (selectionChanged.changedValue === CheckboxValues.ToggleAll) {
      this.itemNeeds.forEach(x => x.IsSelected = selected);
    }else{
      var toggledNeed = this.itemNeeds.find(x => x == selectionChanged.changedValue);
      toggledNeed.IsSelected = selected;
    }

    let pickTotal = sumValues(this.itemNeeds, x => x.QuantityToPick);
    this.pickTotalChanged.emit(pickTotal);
  }
}