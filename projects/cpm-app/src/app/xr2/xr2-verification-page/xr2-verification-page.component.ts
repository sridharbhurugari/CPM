import { Component, OnInit } from '@angular/core';
import { IXr2VerificationNavigationParameters } from '../../shared/interfaces/i-xr2-verification-navigation-parameters';

@Component({
  selector: 'app-xr2-verification-page',
  templateUrl: './xr2-verification-page.component.html',
  styleUrls: ['./xr2-verification-page.component.scss']
})
export class Xr2VerificationPageComponent implements OnInit {

  private initialRoute="OrderPage";

  navigationParameters: IXr2VerificationNavigationParameters;

  constructor() { }

  ngOnInit() {
    this.initializeNavigationParameters();
  }

  initializeNavigationParameters() {
    this.navigationParameters = {} as IXr2VerificationNavigationParameters;
    this.navigationParameters.Route = this.initialRoute;
  }

  onPageNavigationEvent(params: IXr2VerificationNavigationParameters) {
    this.navigationParameters = params;
  }

}
