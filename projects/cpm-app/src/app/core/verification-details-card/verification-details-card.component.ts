import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { TranslateService } from '@ngx-translate/core';
import { ToastComponent } from '@omnicell/webcorecomponents/lib/toast/toast.component';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-verification-details-card',
  templateUrl: './verification-details-card.component.html',
  styleUrls: ['./verification-details-card.component.scss']
})
export class VerificationDetailsCardComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  @Input() 
  set verificationDestinationDetails(value : VerificationDestinationDetail[]){
    console.log('setting data');
     this._verificationDestinationDetails = value;
  }
  get verificationDestinationDetails(): VerificationDestinationDetail[]{
      return this._verificationDestinationDetails;
  }

  private _verificationDestinationDetails : VerificationDestinationDetail[]
  HighlightRow : number;
  selectedVerificationDestinationDetail : IVerificationDestinationDetail;

  readonly itemVerificationPropertyName = nameof<VerificationDestinationDetail>('ItemFormattedGenericName');
  readonly verifiedVerificationPropertyName = nameof<VerificationDestinationDetail>('VerifiedStatus');
  readonly requiredVerificationPropertyName = nameof<VerificationDestinationDetail>('RequiredVerification');

  currentSortPropertyName: string;
  columnSortDirection: string;

  ngOnInit() {
  }

  medicationClicked(destinationDetail: VerificationDestinationDetail, index){
    this.HighlightRow = index;
    this.selectedVerificationDestinationDetail = destinationDetail;
    console.log(this.selectedVerificationDestinationDetail);
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.columnSortDirection = event.SortDirection;
    this.verificationDestinationDetails = this.sort(this.verificationDestinationDetails, event.SortDirection);
  }

  sort(verificationDestinationDetails: VerificationDestinationDetail[], sortDirection: Many<boolean | 'asc' | 'desc'>): VerificationDestinationDetail[] {
    return _.orderBy(verificationDestinationDetails, x => x[this.currentSortPropertyName], sortDirection);
  }

  getOrderDate(verificationDestinationDetail: VerificationDestinationDetail): string {
    const orderDate = new Date(verificationDestinationDetail.FillDate).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
  }

  alert(destinationDetail: VerificationDestinationDetail, index){
    // Toast message based on required flag
  }

   /* istanbul ignore next */
   trackByItemId(index: number, verificationDestinationDetail: any): Guid {
    if (!verificationDestinationDetail) {
      return null;
    }

    return verificationDestinationDetail.Id;
  }

}
