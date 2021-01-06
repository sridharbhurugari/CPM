import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IXr2VerificationNavigationParameters } from '../../shared/interfaces/i-xr2-verification-navigation-parameters';

@Component({
  selector: 'app-xr2-verification-patient-page',
  templateUrl: './xr2-verification-patient-page.component.html',
  styleUrls: ['./xr2-verification-patient-page.component.scss']
})
export class Xr2VerificationPatientPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IXr2VerificationNavigationParameters> = new EventEmitter();

  @Input() navigationParameters: IXr2VerificationNavigationParameters;

  private backRoute="OrderPage";
  private continueRoute="MedicationPahge";

  constructor() { }

  ngOnInit() {
  }

  onBackEvent(): void {
    const navigationParams = {} as IXr2VerificationNavigationParameters;
    navigationParams.Route = this.backRoute;
    this.pageNavigationEvent.emit(navigationParams);
  }

}
