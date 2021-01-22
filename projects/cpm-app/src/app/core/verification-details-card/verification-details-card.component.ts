import { Component, Input, OnInit } from '@angular/core';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';

@Component({
  selector: 'app-verification-details-card',
  templateUrl: './verification-details-card.component.html',
  styleUrls: ['./verification-details-card.component.scss']
})
export class VerificationDetailsCardComponent implements OnInit {

  constructor() { }

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



  ngOnInit() {
  }

  MedicationClicked(destinationDetail: VerificationDestinationDetail, index){
    this.HighlightRow = index;
    this.selectedVerificationDestinationDetail = destinationDetail;
    console.log(this.selectedVerificationDestinationDetail);
  }
}
