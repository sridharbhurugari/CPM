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

@Component({
  selector: 'app-verification-details-card',
  templateUrl: './verification-details-card.component.html',
  styleUrls: ['./verification-details-card.component.scss']
})
export class VerificationDetailsCardComponent implements OnInit {

  @Output() verificationDetailBarcodeScanUnexpected: EventEmitter<IBarcodeData> = new EventEmitter();

  constructor(
    private translateService: TranslateService,
    private popupWindowService: PopupWindowService,
    private toastService: ToastService
    ) { }

  @Input()
  set verificationDestinationDetails(value : VerificationDestinationDetail[]){
    console.log('setting data');
     this._verificationDestinationDetails = value;
     this.selectedVerificationDestinationDetail = null;
     this.setDetailsGroupData(value);
  }
  get verificationDestinationDetails(): VerificationDestinationDetail[]{
      return this._verificationDestinationDetails;
  }

  @Output() saveVerificationEvent: EventEmitter<VerificationDestinationDetail[]> = new EventEmitter<VerificationDestinationDetail[]>();

  @Input() deviceDescription : string;
  @Input() rejectReasons: string[];
  @Input() barcodeScannedEventSubject: Observable<IBarcodeData>;

  private barcodeScannedEventSubscription: Subscription;

  private _verificationDestinationDetails : VerificationDestinationDetail[]

  selectedVerificationDestinationDetail : VerificationDestinationDetail;

  readonly itemVerificationPropertyName = nameof<VerificationDestinationDetail>('ItemFormattedGenericName');
  readonly verifiedVerificationPropertyName = nameof<VerificationDestinationDetail>('VerifiedStatus');

  ngUnsubscribe = new Subject();
  currentSortPropertyName: string;
  columnSortDirection: string;
  destinationLine1: string;
  destinationLine2: string;
  destinationType: string;
  rowIconWidthPercent = 13; // Static for row icon width

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
    //TODO If Item, check for Item in control - jump to it if present.
    // If not an item in the control - or not an item barcode, Fire event alerting incorect barcode scanned - display popup
    if(!data.ItemId)
    {
      this.verificationDetailBarcodeScanUnexpected.emit(data);
      return;
    }

    const index = this.verificationDestinationDetails.findIndex(x => x.ItemId.toUpperCase() === data.ItemId.toUpperCase());
    if(index === -1)
    {
      this.verificationDetailBarcodeScanUnexpected.emit(data);
      return;
    }

    this.selectedVerificationDestinationDetail = this.verificationDestinationDetails[index];
  }

  medicationClicked(destinationDetail: VerificationDestinationDetail): void {
    this.selectedVerificationDestinationDetail = destinationDetail;
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
    console.log('button approve clicked');
    console.log(selectedVerificationDestinationDetail);
    selectedVerificationDestinationDetail.VerifiedStatus = VerificationStatusTypes.Verified;
    this.saveVerificationEvent.emit([selectedVerificationDestinationDetail]);
  }

  onRejectClick(selectedVerificationDestinationDetail: VerificationDestinationDetail): void {
    this.displayRejectPopupDialog([selectedVerificationDestinationDetail]);
  }

  onRequiredIconClick() {
    this.showAlert();
  }

  showAlert(): void {
    //if(this.selectedVerificationDestinationDetail.Exception) {
      var exceptionMsg;
      this.translateService.get('XR2_PICK_VERIFICATION_EXCEPTION').subscribe(result => { exceptionMsg = result; });
      this.toastService.error('error title', exceptionMsg, {
        timeout: 5000,
        pauseOnHover: false
      });
    // }
  }

  removeVerifiedDetails(verificationDestinationDetailsToRemove: VerificationDestinationDetail[]): void {
    const removalSet = new Set(verificationDestinationDetailsToRemove);
    this.verificationDestinationDetails = this.verificationDestinationDetails.filter((verificationDestinationDetail) => {
      return !removalSet.has(verificationDestinationDetail);
    });
    this.selectedVerificationDestinationDetail = null;
  }

  /* istanbul ignore next */
  trackByItemId(index: number, verificationDestinationDetail: any): Guid {
    if (!verificationDestinationDetail) {
      return null;
    }

    return verificationDestinationDetail.Id;
  }

  calculateMaxLabelWidth(verificationDestinationDetail: VerificationDestinationDetail) {
    let widthIconOutputDevice = verificationDestinationDetail.HasOutputDeviceVerification ? this.rowIconWidthPercent: 0;
    let widthIconException = verificationDestinationDetail.Exception ? this.rowIconWidthPercent: 0;
    return widthIconOutputDevice + widthIconException;
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
              });
              this.saveVerificationEvent.emit(selectedVerificationDestinationDetails);
            }
        });
    });
  }

  private setDetailsGroupData(verificationDestinationDetails: VerificationDestinationDetail[]): void {
    if(verificationDestinationDetails && verificationDestinationDetails.length > 0) {
      this.destinationLine1 = verificationDestinationDetails[0].DestinationLine1;
      this.destinationLine2 = verificationDestinationDetails[0].DestinationLine2;
      this.destinationType = verificationDestinationDetails[0].DestinationType;
    }
  }

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
  }
}
