import { Injectable } from '@angular/core';
import { PopupDialogComponent } from '@omnicell/webcorecomponents';
import { Observable, Subject, Subscription } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IBarcodeOverrideData } from '../model/i-barcode-override-data';
import { BarcodeParsingService } from './barcode-parsing.service';
import { BarcodeSafetyStockService } from './barcode-safety-stock.service';
import { SimpleDialogService } from './dialogs/simple-dialog.service';
import { UserPermissionsCacheService } from './user-permissions-cache.service';

@Injectable()
export class BarcodeOverrideService {
  private _subscription: Subscription;
  private _overrideEnabled: boolean;

  barcodeOverrideData: IBarcodeOverrideData;

  overrideBarcodeParsed$: Subject<IBarcodeData> = new Subject<IBarcodeData>();
  overridePopup: PopupDialogComponent;
  userCanOverride$: Observable<boolean>;

  get productScanPending(): boolean {
    return this.barcodeSafetyStockService.awaitingProductScan;
  }

  get dispenseScanPending(): boolean {
    return this.barcodeSafetyStockService.awaitingDispenseScan;
  }

  get binScanPending(): boolean {
    return this.barcodeSafetyStockService.awaitingBinScan;
  }

  get scanPending(): boolean {
    return this.productScanPending || this.dispenseScanPending || this.binScanPending;
  }

  constructor(
    private barcodeParsingService: BarcodeParsingService,
    private simpleDialogService: SimpleDialogService,
    private barcodeSafetyStockService: BarcodeSafetyStockService,
    private userPermissionsCacheService: UserPermissionsCacheService,
  ) {
    this.userCanOverride$ = this.userPermissionsCacheService.canOverrideBarcode();
  }

  initialize(value: IBarcodeOverrideData) {
    this.userCanOverride$.subscribe(x => {
      if(x){
        this.continueInitialize(value);
      }
    })
  }

  continueInitialize(value: IBarcodeOverrideData) {
    this.disableOverride();
    this.barcodeOverrideData = value;
    this.detachSubscription();

    if (this.barcodeOverrideData) {
      this._subscription = this.barcodeParsingService.barcodeParsed$.subscribe(x => this.handleBarcodeData(x));
    }
  }

  dispose() {
    this.detachSubscription();
  }

  handleBarcodeData(barcodeData: IBarcodeData): void {
    if (!this.scanPending) {
      return;
    }

    if (this._overrideEnabled) {
      this.handleScanForOverride(barcodeData);
      return;
    }

    if (!this.isValidScan(barcodeData, this.barcodeOverrideData)) {
      if (this.barcodeOverrideData.allowOverride) {
        this.enableOverride();
      } else {
        this.simpleDialogService.displayWarningOk('BARCODESCAN_DIALOGWARNING_TITLE', 'BARCODESCAN_DIALOGWARNING_MESSAGE');
      }
    }
  }

  private handleScanForOverride(barcodeData: IBarcodeData) {
    if (barcodeData.IsBarcodeOverride) {
      this.overrideBarcodeParsed$.next(barcodeData);
      this.disableOverride();
    } else {
      this.overridePopup.onCloseClicked();
      this.simpleDialogService.getWarningOkPopup('BARCODESCAN_OVERRIDEPASSCODEDOESNOTMATCH_TITLE', 'BARCODESCAN_OVERRIDEPASSCODEDOESNOTMATCH_MESSAGE')
        .subscribe(x => this.overridePopup = x);
    }
  }

  private isValidScan(barcodeData: IBarcodeData, barcodeOverrideData: IBarcodeOverrideData) {
    return (barcodeData.IsProductBarcode && this.productScanPending && barcodeData.ItemId == barcodeOverrideData.itemId) ||
      (barcodeData.IsBinBarcode && this.binScanPending && barcodeData.ItemId == barcodeOverrideData.itemId) ||
      (barcodeData.IsDispenseBarcode && this.dispenseScanPending && barcodeOverrideData.dispenseIds.some(x => x == barcodeData.DispenseId)) ||
      (barcodeData.IsTrayBarcode && barcodeOverrideData.acceptTrayBarcodes) ||
      (barcodeData.IsBarcodeOverride && this._overrideEnabled);
  }

  private getOverrideText() {
    var messageStringKey = "BARCODESCAN_OVERRIDEBARCODE_MSG_PBC";

    if (this.productScanPending && this.dispenseScanPending) {
      messageStringKey = "BARCODESCAN_OVERRIDEBARCODE_MSG_PBC_AND_TRANSACTIONLABEL";
    }
    else if (this.productScanPending && this.binScanPending) {
      messageStringKey = "BARCODESCAN_OVERRIDEBARCODE_MSG_PBC_AND_BINLABEL";
    }
    else if (this.productScanPending) {
      messageStringKey = "BARCODESCAN_OVERRIDEBARCODE_MSG_PBC";
    }
    else if (this.dispenseScanPending) {
      messageStringKey = "BARCODESCAN_OVERRIDEBARCODE_MSG_TRANSACTIONLABEL";
    }
    else if (this.binScanPending) {
      messageStringKey = "BARCODESCAN_OVERRIDEBARCODE_MSG_BINLABEL";
    }

    return messageStringKey;
  }

  private enableOverride() {
    this._overrideEnabled = true;
    let barcodeMsg = this.getOverrideText();
    this.simpleDialogService.getWarningCancelPopup('BARCODESCAN_OVERRIDEBARCODETITLE', barcodeMsg).subscribe(x => this.overridePopup = x);
  }

  private disableOverride() {
    if (this.overridePopup) {
      this.overridePopup.onCloseClicked();
    }

    this._overrideEnabled = false;
  }

  private detachSubscription() {
    if(!this._subscription){
      return;
    }

    this._subscription.unsubscribe();
  }
}
