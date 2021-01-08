import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { DestockService } from '../../api-xr2/services/destock.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { DestockTypeInfo } from '../model/destock-type-info';

@Component({
  selector: 'app-destock-typeinfo',
  templateUrl: './destock-typeinfo.component.html',
  styleUrls: ['./destock-typeinfo.component.scss']
})
export class DestockTypeInfoComponent implements OnInit {
  // @Input('deviceDestockTypeInfo')
  // set deviceDestockTypeInfo(value: DestockTypeInfo[]) {
  //   this._deviceDestockTypeInfo = value;

  // }
  // get deviceDestockTypeInfo(): DestockTypeInfo[] {
  //   return this._deviceDestockTypeInfo;
  // }
 @Input() deviceDestockTypeInfo: DestockTypeInfo[];
 @Input() searchTextFilter: string;
 @Output() printLabel: EventEmitter<DestockTypeInfo> = new EventEmitter<DestockTypeInfo>();

  currentSortPropertyName: string;

  searchFields = [
    nameof<IDestockTypeInfo>('Xr2DestockType_Display'),
  ];

  typePropertyName: string = nameof<IDestockTypeInfo>('Xr2DestockType_Display');
  typereferencePropertyName: string = nameof<IDestockTypeInfo>('Xr2DestockType_ResourcesManager');
  defaultdisplayorderPropertyName: string = nameof<IDestockTypeInfo>('DefaultDisplayOrder');
  barcodePropertyName: string =  nameof<IDestockTypeInfo>('Barcode');
  itemcountPropertyName: string =  nameof<IDestockTypeInfo>('ItemCount');
  bincountPropertyName: string = nameof<IDestockTypeInfo>('BinCount');
  daystoexpirePropertyName: string = nameof<IDestockTypeInfo>('DaysToExpire');
  printPropertName: string = 'PRINT';

  ngOnInit() {
  }

  columnSelected(event: IColHeaderSortChanged){
    // currently the sort is fixed
  }

  onPrint(event: DestockTypeInfo) {
    this.printLabel.next(event);
  }
}
