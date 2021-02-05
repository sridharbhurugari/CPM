import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { flatMap, Many } from 'lodash';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { VerificationStatusTypes } from '../../shared/constants/verification-status-types';
import { PopupWindowProperties, PopupWindowService, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { IDropdownPopupData } from '../../shared/model/i-dropdown-popup-data';
import { take } from 'rxjs/operators';
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';
import { DestinationTypes } from '../../shared/constants/destination-types';

@Component({
  selector: 'app-verification-details-card',
  templateUrl: './verification-details-card.component.html',
  styleUrls: ['./verification-details-card.component.scss']
})
export class VerificationDetailsCardComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private popupWindowService: PopupWindowService
    ) { }

  @Input()
  set verificationDestinationDetails(value : VerificationDestinationDetail[]){
    console.log('setting data');
     this._verificationDestinationDetails = value;
     this.setDetailsGroupData(value);
  }
  get verificationDestinationDetails(): VerificationDestinationDetail[]{
      return this._verificationDestinationDetails;
  }

  @Output() saveVerificationEvent: EventEmitter<VerificationDestinationDetail> = new EventEmitter<VerificationDestinationDetail>();
  @Output() approveVerification: EventEmitter<VerificationDestinationDetail> = new EventEmitter<VerificationDestinationDetail>();
  @Output() rejectVerification: EventEmitter<VerificationDestinationDetail> = new EventEmitter<VerificationDestinationDetail>();

  @Input() deviceDescription : string;
  @Input() rejectReasons: string[];

  private _verificationDestinationDetails : VerificationDestinationDetail[]

  selectedVerificationDestinationDetail : VerificationDestinationDetail;

  readonly itemVerificationPropertyName = nameof<VerificationDestinationDetail>('ItemFormattedGenericName');
  readonly verifiedVerificationPropertyName = nameof<VerificationDestinationDetail>('VerifiedStatus');
  readonly requiredVerificationPropertyName = nameof<VerificationDestinationDetail>('RequiredVerification');

  currentSortPropertyName: string;
  columnSortDirection: string;
  destinationLine1: string;
  destinationLine2: string;
  destinationType: string;

  destinationTypes: typeof DestinationTypes = DestinationTypes;

  translatables = [
    'REJECT_PICK',
    'REASON',
  ];

  translations$: Observable<any>;

  ngOnInit() {
    this.setTranslations();
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

   /* istanbul ignore next */
   trackByItemId(index: number, verificationDestinationDetail: any): Guid {
    if (!verificationDestinationDetail) {
      return null;
    }

    return verificationDestinationDetail.Id;
  }

  onApproveClick(selectedVerificationDestinationDetail: VerificationDestinationDetail): void {
    console.log('button approve clicked');
    console.log(selectedVerificationDestinationDetail);
    selectedVerificationDestinationDetail.VerifiedStatus = VerificationStatusTypes.Verified;
    this.saveVerificationEvent.emit(selectedVerificationDestinationDetail);
  }

  onRejectClick(selectedVerificationDestinationDetail: VerificationDestinationDetail): void {
    this.displayRejectPopupDialog(selectedVerificationDestinationDetail);
  }

  removeVerifiedDetails(verificationDestinationDetailsToRemove: VerificationDestinationDetail[]): void {
    const removalSet = new Set(verificationDestinationDetailsToRemove);
    this.verificationDestinationDetails = this.verificationDestinationDetails.filter((verificationDestinationDetail) => {
      return !removalSet.has(verificationDestinationDetail);
    });
    this.selectedVerificationDestinationDetail = null;
  }


  private displayRejectPopupDialog(selectedVerificationDestinationDetail: VerificationDestinationDetail): void {

    const properties = new PopupWindowProperties();
    const rejectReasonDisplayList: SingleselectRowItem[] = [];
    let defaultRejectReasonDisplayItem: SingleselectRowItem = null;
    let i = 0;
    this.rejectReasons.forEach((reason) => {
        i++;
        const rejectReasonDisplayRow = new SingleselectRowItem(i + '. ' + reason, reason);
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
                selectedVerificationDestinationDetail.VerifiedStatus = VerificationStatusTypes.Rejected;
                selectedVerificationDestinationDetail.RejectReason = data.selectedrow.value;
                this.saveVerificationEvent.emit(selectedVerificationDestinationDetail);
            }
        });
    });
  }

  private setDetailsGroupData(verificationDestinationDetails: VerificationDestinationDetail[]) {
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
