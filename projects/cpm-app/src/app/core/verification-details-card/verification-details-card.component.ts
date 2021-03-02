import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { flatMap, Many } from 'lodash';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { Observable, Subject, Subscription } from 'rxjs';
import { VerificationStatusTypes } from '../../shared/constants/verification-status-types';
import { PopupWindowProperties, PopupWindowService, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { IDropdownPopupData } from '../../shared/model/i-dropdown-popup-data';
import { take, takeUntil } from 'rxjs/operators';
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';
import { ToastService } from '@omnicell/webcorecomponents';
import { DestinationTypes } from '../../shared/constants/destination-types';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { LogService } from '../../api-core/services/log-service';
import { LoggingCategory } from '../../shared/constants/logging-category';
import { LogVerbosity } from 'oal-core';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';

@Component({
  selector: 'app-verification-details-card',
  templateUrl: './verification-details-card.component.html',
  styleUrls: ['./verification-details-card.component.scss']
})
export class VerificationDetailsCardComponent implements OnInit {

  @Output() verificationDetailBarcodeScanUnexpected: EventEmitter<IBarcodeData> = new EventEmitter();
  private _loggingCategory = LoggingCategory.Verification;

  constructor(
    private translateService: TranslateService,
    private popupWindowService: PopupWindowService,
    private toastService: ToastService,
    private logService: LogService
    ) { }

  @Input()
  set verificationDestinationDetails(value : VerificationDestinationDetail[]){
     this._verificationDestinationDetails = value;
     this.setDetailsGroupData(value);
  }
  get verificationDestinationDetails(): VerificationDestinationDetail[]{
      return this._verificationDestinationDetails;
  }

  @Output() saveVerificationEvent: EventEmitter<VerificationDestinationDetail[]> = new EventEmitter<VerificationDestinationDetail[]>();
  @Output() verificationBoxBarcodeRequired: EventEmitter<void> = new EventEmitter();

  @Input() deviceDescription : string;
  @Input() rejectReasons: string[];
  @Input() barcodeScannedEventSubject: Observable<IBarcodeData>;
  @Input() IsBoxBarcodeVerified: boolean;

  private barcodeScannedEventSubscription: Subscription;
  private _verificationDestinationDetails : VerificationDestinationDetail[];

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
    'REASON',
  ];

  translations$: Observable<any>;

  ngOnInit() {
    if(this.barcodeScannedEventSubscription) {
      this.barcodeScannedEventSubscription.unsubscribe();
    }
    this.barcodeScannedEventSubscription = this.barcodeScannedEventSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: IBarcodeData) => this.onBarcodeScannedEvent(data));
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
      this.handleFailedBarcodeScan(data);
      return;
    }

    const match = this.verificationDestinationDetails.find(x => x.ItemId.toUpperCase() === data.ItemId.toUpperCase());
    if(!match)
    {
      this.handleFailedBarcodeScan(data);
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

  onApproveClick(selectedVerificationDestinationDetail: VerificationDestinationDetail): void {
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this.constructor.name + ' Button Approve Clicked');
    this.approveItem(selectedVerificationDestinationDetail);
  }

  onRejectClick(selectedVerificationDestinationDetail: VerificationDestinationDetail): void {
    this.displayRejectPopupDialog([selectedVerificationDestinationDetail]);
  }

  onRequiredIconClick() {
    this.showAlert();
  }

  approveItem(selectedVerificationDestinationDetail: VerificationDestinationDetail) {
    /* istanbul ignore next */
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this.constructor.name + ' Approving ItemId: ' + selectedVerificationDestinationDetail.ItemId + ' trackById: ' + selectedVerificationDestinationDetail.Id);

    selectedVerificationDestinationDetail.VerifiedStatus = VerificationStatusTypes.Verified;
    this.saveVerificationEvent.emit([selectedVerificationDestinationDetail]);
  }

  removeVerifiedDetails(verificationDestinationDetailsToRemove: VerificationDestinationDetail[]): void {
    const removalSet = new Set(verificationDestinationDetailsToRemove);
    this.verificationDestinationDetails = this.verificationDestinationDetails.filter((verificationDestinationDetail) => {
      return !removalSet.has(verificationDestinationDetail);
    });
  }

  containsSafetyStockMedication(items: VerificationDestinationDetail[]) {
    if(!items) {
      return false;
    }

    return items.some(x => x.IsSafetyStockItem);
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
    // If we have a scan to advance item (already checked for validity) and
    // that item is currently selected, approve it
    if(this.scanToAdvanceVerificationDestinationDetail
      && this.scanToAdvanceVerificationDestinationDetail === this.selectedVerificationDestinationDetail
      && this.scanToAdvanceVerificationDestinationDetail !== item) {
      this.approveItem(this.scanToAdvanceVerificationDestinationDetail);
    }

    this.selectedVerificationDestinationDetail = item;

    if(this.IsBoxBarcodeVerified) {
      item.IsMedBarcodeVerified = true;
      // Item is now box and med verified, save it for potential scan to advance
      this.scanToAdvanceVerificationDestinationDetail = item;
    } else {
      this.verificationBoxBarcodeRequired.emit();
    }
  }

  private handleFailedBarcodeScan(data: IBarcodeData) {
    this.verificationDetailBarcodeScanUnexpected.emit(data);
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
            selectText: translations.REASON
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
                  this.constructor.name + ' Rejecting Item Id: ' + detail.ItemId + ' trackById: ' + detail.Id);
              });
                
              this.saveVerificationEvent.emit(selectedVerificationDestinationDetails);
              this.selectedVerificationDestinationDetail = null;
            }
        });
    });
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

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
  }

}
