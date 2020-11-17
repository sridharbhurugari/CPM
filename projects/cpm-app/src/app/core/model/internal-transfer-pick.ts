import { EventEmitter } from '@angular/core';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { ISelectable } from '../../shared/model/i-selectable';
import { ISelectionStateChanged } from '../../shared/model/i-selection-state-changed';

export class InternalTransferPick implements IItemReplenishmentNeed, ISelectable<InternalTransferPick> {
    private _isSelected: boolean;
    private _packsToPick: number;

    constructor(replensihmentNeed: IItemReplenishmentNeed, pickQuantity: number) {
        Object.assign(this, replensihmentNeed);
        this._isSelected = true;
        this.PacksNeeded = this.Xr2Item ? this.DeviceQuantityNeeded / this.PackSize : pickQuantity;
        this._packsToPick = this.PacksNeeded;
    }

    SelectionStateChanged: EventEmitter<ISelectionStateChanged<InternalTransferPick>> = new EventEmitter<ISelectionStateChanged<InternalTransferPick>>();

    PacksNeeded: number;

    ItemId: string;
    ItemFormattedGenericName: string;
    ItemBrandName: string;
    DeviceQuantityOnHand: number;
    DeviceQuantityNeeded: number;
    DeviceParLevel: number;
    DeviceRestockLevel: number;
    PendingDevicePickQuantity: number;
    DisplayPackageSize: string;
    DisplayDeviceQuantityNeeded: string;
    DisplayNumberOfPackages: string;
    DisplayDeviceQuantityOnHand: string;
    DisplayQohNumberOfPackages: string;
    PackSize: number;
    Xr2Item: boolean;
    UnitOfIssue: string;
    PickLocationDeviceLocationId: number;
    PickLocationDescription: string;
    PickLocationQoh: number;
    ItemFormattedDescription: string;
    ItemBrandNameDescription: string;
    ItemIdDescription: string;
    SortFormattedName: string;
    DestinationDeviceDescription: string;

    get QuantityToPick(): number {
        return this.PackSize * this.PacksToPick;
    }

    get IsSelected(): boolean {
        return this._isSelected;
    }

    set IsSelected(value: boolean) {
        if(value === this._isSelected) {
            return;
        }

        this._isSelected = value;
        this._packsToPick = value ? this.PacksNeeded : 0;
    }

    get PacksToPick(): number {
        return this._packsToPick;
    }

    set PacksToPick(value: number) {
        if(value === this._packsToPick) {
            return;
        }

        this._packsToPick = value;
        let selectedState = this._packsToPick > 0;
        if(selectedState != this._isSelected){
            this._isSelected = selectedState;
            this.SelectionStateChanged.next({ selectedState: this._isSelected, selectedValue: this });
        }
    }
}