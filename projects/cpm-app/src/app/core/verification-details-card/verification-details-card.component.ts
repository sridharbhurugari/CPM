import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import {  Many } from 'lodash';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { VerificationStatusTypes } from '../../shared/constants/verification-status-types';
import { PopupWindowProperties, PopupWindowService, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { IDropdownPopupData } from '../../shared/model/i-dropdown-popup-data';
import { catchError, take, takeUntil, tap, timeout } from 'rxjs/operators';
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';
import { ToastService } from '@omnicell/webcorecomponents';
import { DestinationTypes } from '../../shared/constants/destination-types';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { LogService } from '../../api-core/services/log-service';
import { LoggingCategory } from '../../shared/constants/logging-category';
import { LogVerbosity } from 'oal-core';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { IDialogContents } from '../../shared/interfaces/i-dialog-contents';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { ItemDetailsService } from '../../api-core/services/item-details.service';

@Component({
  selector: 'app-verification-details-card',
  templateUrl: './verification-details-card.component.html',
  styleUrls: ['./verification-details-card.component.scss']
})
export class VerificationDetailsCardComponent implements OnInit {
  @Output() saveVerificationEvent: EventEmitter<VerificationDestinationDetail[]> = new EventEmitter<VerificationDestinationDetail[]>();
  @Output() displayWarningDialogEvent: EventEmitter<IDialogContents> = new EventEmitter();
  @Output() displayYesNoDialogEvent: EventEmitter<IDialogContents> = new EventEmitter();

  @Input() deviceDescription : string;
  @Input() rejectReasons: string[];
  @Input() barcodeScannedEventSubject: Observable<IBarcodeData>;
  @Input() approveAllClickSubject: Observable<void>;
  @Input() IsBoxBarcodeVerified: boolean;
  @Input() completedDestinationDetails: VerificationDestinationDetail[];
  @Input() approveAllSaving: boolean;

  @Input()
  set verificationDestinationDetails(value : VerificationDestinationDetail[]){
     this._verificationDestinationDetails = value;
     this.setDetailsGroupData(value);
  }
  get verificationDestinationDetails(): VerificationDestinationDetail[]{
      return this._verificationDestinationDetails;
  }

  private barcodeScannedEventSubscription: Subscription;
  private approveAllClickSubscription: Subscription;
  private _verificationDestinationDetails : VerificationDestinationDetail[];
  private _loggingCategory: string = LoggingCategory.Verification;
  private _componentName: string = "VerificationDetailsCardComponent";

  readonly itemVerificationPropertyName = nameof<VerificationDestinationDetail>('ItemFormattedGenericName');
  readonly verifiedVerificationPropertyName = nameof<VerificationDestinationDetail>('VerifiedStatus');

  selectedVerificationDestinationDetail : VerificationDestinationDetail;
  scanToAdvanceVerificationDestinationDetail: VerificationDestinationDetail;
  currentSortPropertyName: string;
  columnSortDirection: string;
  destinationLine1: string;
  destinationLine2: string;
  destinationType: string;
  rowIconWidthPercent = 13; // Static for row icon width
  ngUnsubscribe = new Subject();

  destinationTypes: typeof DestinationTypes = DestinationTypes;

  translatables = [
    'REJECT_PICK',
    'REASON'
  ];

  translations$: Observable<any>;

  constructor(
    private translateService: TranslateService,
    private popupWindowService: PopupWindowService,
    private toastService: ToastService,
    private logService: LogService,
    private itemDetailsService: ItemDetailsService
    ) { }

  ngOnInit() {
    this.setSubscriptions();
    this.setTranslations();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if(this.barcodeScannedEventSubscription) {
      this.barcodeScannedEventSubscription.unsubscribe();
    }
  }

  onBarcodeScannedEvent(data: IBarcodeData): void {
    if(!data.ItemId)
    {
      this.displayWarningDialogEvent.emit({
        titleResourceKey: 'BARCODESCAN_DIALOGWARNING_TITLE',
        msgResourceKey: 'PICK_VERIFICATION_EXPECTED_ITEM_OR_PICKING_LABEL_SCAN',
        msgParams: null
      });
      return;
    }

    const match = this.verificationDestinationDetails.find(x => x.ItemId.toUpperCase() === data.ItemId.toUpperCase());
    if(!match)
    {
      this.handleItemNotFound(data);
      return;
    }

    this.handleSuccessfulBarcodeScan(match, data);
  }

  medicationClicked(destinationDetail: VerificationDestinationDetail): void {
    this.selectedVerificationDestinationDetail = destinationDetail;
    if(!destinationDetail.IsSafetyStockItem || this.IsBoxBarcodeVerified && destinationDetail.IsMedBarcodeVerified) {
      this.scanToAdvanceVerificationDestinationDetail = destinationDetail;
    }
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.columnSortDirection = event.SortDirection;
    this.verificationDestinationDetails = this.sort(this.verificationDestinationDetails, event.SortDirection);
  }

  sort(verificationDestinationDetails: VerificationDestinationDetail[], sortDirection: Many<boolean | 'asc' | 'desc'>): VerificationDestinationDetail[] {
    return _.orderBy(verificationDestinationDetails, x => x[this.currentSortPropertyName], sortDirection);
  }

  getOrderDate(verificationDestinationDetail: IVerificationDestinationDetail): string {
    const orderDate = new Date(verificationDestinationDetail.FillDate).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
  }

  onApproveAllClick() {
    this.displayYesNoDialogEvent.emit({
      titleResourceKey: 'APPROVE_ALL',
      msgResourceKey: 'APPROVE_ALL_DIALOG_MESSAGE',
      msgParams: null
    });
  }

  onApproveClick(selectedVerificationDestinationDetail: VerificationDestinationDetail): void {
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this._componentName + ' Button Approve Clicked');
    this.approveItems([selectedVerificationDestinationDetail]);
  }

  onRejectClick(selectedVerificationDestinationDetail: VerificationDestinationDetail): void {
    this.displayRejectPopupDialog([selectedVerificationDestinationDetail]);
  }

  onRequiredIconClick() {
    this.showAlert();
  }

  onApproveAllPopupConfirmClick() {
    this.approveAllSaving = true;
    const itemsToApprove = this.getVerifiableDetailItems();
    this.approveItems(itemsToApprove);
  }

  approveItems(verificationDestinationDetails: VerificationDestinationDetail[]) {
    /* istanbul ignore next */
    verificationDestinationDetails.forEach((item) => {
      this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
        this._componentName + ' Approving ItemId: ' + item.ItemId + ' trackById: ' + item.Id);

      item.VerifiedStatus = VerificationStatusTypes.Verified;
    })
    this.saveVerificationEvent.emit(verificationDestinationDetails);
  }

  completeAndRemoveVerifiedDetails(verificationDestinationDetailsToRemove: VerificationDestinationDetail[]): void {
    const removalSet = new Set(verificationDestinationDetailsToRemove);
    this.verificationDestinationDetails = this.verificationDestinationDetails.filter((verificationDestinationDetail) => {
      return !removalSet.has(verificationDestinationDetail);
    });
    this.completedDestinationDetails.push(...verificationDestinationDetailsToRemove);
  }

  containsVerifiableItem(items: VerificationDestinationDetail[]) {
    if(!items) {
      return false;
    }

    return items.some((item) =>
    (!item.IsSafetyStockItem) || (item.IsSafetyStockItem && item.IsMedBarcodeVerified));
  }

  containsSafetyStockMedication(items: VerificationDestinationDetail[]) {
    if(!items) {
      return false;
    }

    return items.some(x => x.IsSafetyStockItem);
  }

  getVerifiableDetailItems(): VerificationDestinationDetail[] {
    return this.verificationDestinationDetails.filter((detail) =>
    (!detail.IsSafetyStockItem) || (detail.IsSafetyStockItem && detail.IsMedBarcodeVerified));
  }

  calculateDynamicIconWidth(verificationDestinationDetail: VerificationDestinationDetail) {
    let widthIconOutputDevice = verificationDestinationDetail.HasOutputDeviceVerification ? this.rowIconWidthPercent: 0;
    let widthIconException = verificationDestinationDetail.Exception ? this.rowIconWidthPercent: 0;
    return widthIconOutputDevice + widthIconException;
  }

  /* istanbul ignore next */
  trackByItemId(index: number, verificationDestinationDetail: any): Guid {
    if (!verificationDestinationDetail) {
      return null;
    }

    return verificationDestinationDetail.Id;
  }

   /* istanbul ignore next */
   showAlert(): void {
    var exceptionMsg;
    this.translateService.get('XR2_PICK_VERIFICATION_EXCEPTION').subscribe(result => { exceptionMsg = result; });
    this.toastService.error('error title', exceptionMsg, {
      timeout: 5000,
      pauseOnHover: false
    });
  }

  private handleSuccessfulBarcodeScan(item: VerificationDestinationDetail, data: IBarcodeData) {
    item.TransactionScannedBarcodeFormat = data.BarCodeFormat;
    item.TransactionScannedBarcodeProductId = data.ProductId;
    item.TransactionScannedRawBarcode = data.BarCodeScanned;

    // If we have a scan to advance item (already checked for validity) and
    // that item is currently selected, approve it
    if(this.scanToAdvanceVerificationDestinationDetail
      && this.scanToAdvanceVerificationDestinationDetail === this.selectedVerificationDestinationDetail
      && this.scanToAdvanceVerificationDestinationDetail !== item) {
        this.approveItems([this.scanToAdvanceVerificationDestinationDetail]);
      }

      this.selectedVerificationDestinationDetail = item;
      this.scrollToRowId(item.Id);

    if(this.IsBoxBarcodeVerified) {
      item.IsMedBarcodeVerified = true;
      // Item is now box and med verified, save it for potential scan to advance
      this.scanToAdvanceVerificationDestinationDetail = item;
    } else {
      this.displayWarningDialogEvent.emit({
        titleResourceKey: 'ITEM_SCAN_TITLE',
        msgResourceKey: 'SCAN_PICKING_LABEL_FIRST_MESSAGE',
        msgParams : null
      });
    }
  }

  handleItemNotFound(data: IBarcodeData): void {

    // Check if item has already been completed
    const completedItem = this.getCompletedVerification(data)

    if(!completedItem) {
      this.handleInvalidItemScan(data)
    } else if(completedItem.VerifiedStatus === VerificationStatusTypes.Verified
      || completedItem.VerifiedStatus === VerificationStatusTypes.Rejected) {
      this.displayWarningDialogEvent.emit({
        titleResourceKey: 'ITEM_SCAN_TITLE',
        msgResourceKey: 'ITEM_ALREADY_VERIFIED_MESSAGE',
        msgParams: {
          itemFormattedGenericName: completedItem.ItemFormattedGenericName,
          itemTradeName: completedItem.ItemTradeName
        }
      });
    }
  }

  /* istanbul ignore next */
  private displayRejectPopupDialog(selectedVerificationDestinationDetails: VerificationDestinationDetail[]): void {

    const properties = new PopupWindowProperties();
    const rejectReasonDisplayList: SingleselectRowItem[] = [];
    let defaultRejectReasonDisplayItem: SingleselectRowItem = null;

    this.rejectReasons.forEach((reason) => {
        const rejectReasonDisplayRow = new SingleselectRowItem(reason, reason);
        rejectReasonDisplayList.push(rejectReasonDisplayRow);
    });

    const rowsToHideCheckbox = rejectReasonDisplayList;

    this.translations$.subscribe((translations) => {
        const data: IDropdownPopupData = {
            popuptitle: translations.REJECT_PICK,
            dropdowntitle: '',
            dropdownrows: rejectReasonDisplayList,
            defaultrow: defaultRejectReasonDisplayItem,
            showCheckbox: false,
            checkboxLabel: '',
            checkboxSelected: false,
            checkboxHideSelection: rowsToHideCheckbox,
            selectedrow: defaultRejectReasonDisplayItem,
            selectedcheckbox: false,
            selectText: translations.REASON,
            autoSort: false
        };

        properties.data = data;

        let component =
            this.popupWindowService.show(DropdownPopupComponent, properties) as unknown as DropdownPopupComponent;
        component.dismiss.pipe(take(1)).subscribe(selectedOk => {
            if (selectedOk) {
              selectedVerificationDestinationDetails.forEach((detail) => {
                detail.VerifiedStatus = VerificationStatusTypes.Rejected;
                detail.RejectReason = data.selectedrow.value;
                /* istanbul ignore next */
                this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
                  this._componentName + ' Rejecting Item Id: ' + detail.ItemId + ' trackById: ' + detail.Id);
              });

              this.saveVerificationEvent.emit(selectedVerificationDestinationDetails);
              this.completedDestinationDetails.push(...selectedVerificationDestinationDetails);
              this.selectedVerificationDestinationDetail = null;
            }
        });
    });
  }

  private getCompletedVerification(data: IBarcodeData) {
    return this.completedDestinationDetails.find(x => x.ItemId.toUpperCase() === data.ItemId.toUpperCase());
  }

  private setDetailsGroupData(verificationDestinationDetails: VerificationDestinationDetail[]): void {
    if(verificationDestinationDetails && verificationDestinationDetails.length > 0) {
      this.destinationLine1 = verificationDestinationDetails[0].DestinationLine1;
      this.destinationLine2 = verificationDestinationDetails[0].DestinationLine2;
      this.destinationType = verificationDestinationDetails[0].DestinationType;
    } else {
      this.resetPageDisplay();
    }
  }

  private resetPageDisplay() {
    this.destinationLine1 = null;
    this.destinationLine2 = null;
    this.destinationType = null;
    this.selectedVerificationDestinationDetail = null;
  }

  private handleInvalidItemScan(data : IBarcodeData): void {
    const dialogContents: IDialogContents = {
      titleResourceKey: 'ITEM_SCAN_TITLE',
      msgResourceKey: 'ITEM_INVALID_FOR_DESTINATION_MESSAGE',
      msgParams: { itemFormattedGenericName: '', itemTradeName: ''}
    }

    this.itemDetailsService.getAlias(data.ItemId)
    .pipe(
      timeout(2000),
      tap((details) => {
        if(details) {
          const formattedName = details.ItemGenericName ? `${details.ItemGenericName} ${details.RxSuffix}`: '';
          dialogContents.msgParams['itemFormattedGenericName'] = formattedName;
          dialogContents.msgParams['itemTradeName'] = details.ItemTradeName;
        }

        this.displayWarningDialogEvent.emit(dialogContents);
      }),
      catchError(e => {
        this.displayWarningDialogEvent.emit(dialogContents);
        return of(null);
      })
    ).subscribe();
  }

  private setSubscriptions() {
    if(this.barcodeScannedEventSubscription) {
      this.barcodeScannedEventSubscription.unsubscribe();
    }
    if(this.approveAllClickSubscription) {
      this.approveAllClickSubscription.unsubscribe();
    }
    this.barcodeScannedEventSubscription = this.barcodeScannedEventSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: IBarcodeData) => this.onBarcodeScannedEvent(data));
    this.approveAllClickSubscription = this.approveAllClickSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.onApproveAllPopupConfirmClick());
  }

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
  }

  /* istanbul ignore next */
  private scrollToRowId(id: Guid){
    try {
      var el = document.getElementById(id.toString());
      el.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
    } catch (error) {
      console.log(error);
    }
  }
}
