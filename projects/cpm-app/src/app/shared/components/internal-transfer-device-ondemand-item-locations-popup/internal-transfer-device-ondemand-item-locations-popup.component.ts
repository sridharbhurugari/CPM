import { Component, OnInit } from '@angular/core';
import { IPopupWindowContainer, PopupWindowProperties } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { IItemLocationDetail } from '../../../api-core/data-contracts/i-item-location-detail';
import { nameof } from '../../functions/nameof';
import { IInternalTransferDeviceOnDemandItemLocationsPopupData } from '../../model/i-internal-transfer-device-ondemand-item-locations-popup-data';

@Component({
  selector: 'app-internal-transfer-device-ondemand-item-locations-popup',
  templateUrl: './internal-transfer-device-ondemand-item-locations-popup.component.html',
  styleUrls: ['./internal-transfer-device-ondemand-item-locations-popup.component.scss']
})
export class InternalTransferDeviceOndemandItemLocationsPopupComponent implements OnInit , IPopupWindowContainer {
  windowInfo: boolean;
  windowFilter: boolean;
  windowFooter: boolean;

  readonly locationDescriptionPropertyName: string = nameof<IItemLocationDetail>('LocationDescription');
  readonly expirationDatePropertyName: string = nameof<IItemLocationDetail>('ExpirationDate');
  readonly quantityOnHandPropertyName: string = nameof<IItemLocationDetail>('QuantityOnHand');
  readonly quantityPropertyName: string = nameof<IItemLocationDetail>('Quantity');

  searchPropertyNames: string[] = [
    this.locationDescriptionPropertyName
  ]

  searchTextFilter: string;

  constructor() { }
  data: IInternalTransferDeviceOnDemandItemLocationsPopupData;
  dismiss: Subject<boolean | PopupWindowProperties>;

  ngOnInit() {
    this.windowInfo = this.data.windowInfo;
    this.windowFilter = this.data.windowFilter;
    this.windowFooter = this.data.windowFooter;
  }

  selectedPickChanged() {
  }

  cancel() {
    this.dismiss.next(false);
  }

  continue() {
    this.dismiss.next(false);
  }

}
