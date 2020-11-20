import { Injectable } from '@angular/core';
import { PopupDialogComponent } from '@omnicell/webcorecomponents';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
  private _overridePopup: PopupDialogComponent;
  private _warningPopup: PopupDialogComponent;
  private _barcodeOverrideData: IBarcodeOverrideData;

  overrideBarcodeParsed$: Subject<IBarcodeData> = new Subject<IBarcodeData>();

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
  }

  initialize(value: IBarcodeOverrideData) {
    this.disableOverride();
    this._barcodeOverrideData = value;
    this.detachSubscription();

    if (this._barcodeOverrideData) {
      this._subscription = combineLatest(this.barcodeParsingService.barcodeParsed$, this.userPermissionsCacheService.canOverrideBarcode())
        .subscribe(x => this.handleBarcodeData(x[0], x[1]));
    }
  }

  dispose() {
    this.detachSubscription();
  }

  handleBarcodeData(barcodeData: IBarcodeData, userCanOverride: boolean) {
    if (!this.scanPending) {
      return;
    }

    if(this._warningPopup) {
      this._warningPopup.onCloseClicked();
    }

    if (this._overrideEnabled) {
      this.handleScanForOverride(barcodeData);
      return;
    }

    if (!this.isValidScan(barcodeData, this._barcodeOverrideData)) {
      if (this._barcodeOverrideData.allowOverride && userCanOverride) {
        this.enableOverride();
      } else {
        this.simpleDialogService.getWarningOkPopup('BARCODESCAN_DIALOGWARNING_TITLE', 'BARCODESCAN_DIALOGWARNING_MESSAGE')
          .pipe(take(1))
          .subscribe(x => this._warningPopup = x);
      }
    }
  }

  private handleScanForOverride(barcodeData: IBarcodeData) {
    if (barcodeData.IsBarcodeOverride) {
      this.overrideBarcodeParsed$.next(barcodeData);
      this.disableOverride();
    } else {
      this._overridePopup.onCloseClicked();
      this.simpleDialogService.getWarningOkPopup('BARCODESCAN_OVERRIDEPASSCODEDOESNOTMATCH_TITLE', 'BARCODESCAN_OVERRIDEPASSCODEDOESNOTMATCH_MESSAGE')
        .pipe(take(1))
        .subscribe(x => this._overridePopup = x);
    }
  }

  /* istanbul ignore next */
  private isValidScan(barcodeData: IBarcodeData, barcodeOverrideData: IBarcodeOverrideData) {
    return (barcodeData.IsProductBarcode && this.productScanPending && barcodeData.ItemId == barcodeOverrideData.itemId) ||
      (barcodeData.IsBinBarcode && this.binScanPending && barcodeData.ItemId == barcodeOverrideData.itemId) ||
      (barcodeData.IsDispenseBarcode && this.dispenseScanPending && barcodeOverrideData.dispenseIds.some(x => x == barcodeData.DispenseId)) ||
      (barcodeData.IsTrayBarcode && barcodeOverrideData.acceptTrayBarcodes) ||
      (barcodeData.IsBarcodeOverride && this._overrideEnabled);
  }

  /* istanbul ignore next */
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
    this.simpleDialogService.getWarningCancelPopup('BARCODESCAN_OVERRIDEBARCODETITLE', barcodeMsg)
      .pipe(take(1))
      .subscribe(x => this._overridePopup = x);
  }

  private disableOverride() {
    if (this._overridePopup) {
      this._overridePopup.onCloseClicked();
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
