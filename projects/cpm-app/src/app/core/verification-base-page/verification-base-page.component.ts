import { Component, Input, OnInit } from '@angular/core';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';

@Component({
  selector: 'app-verification-base-page',
  templateUrl: './verification-base-page.component.html',
  styleUrls: ['./verification-base-page.component.scss']
})
export class VerificationBasePageComponent implements OnInit {

  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  private initialRoute = VerificationRouting.OrderPage;

  navigationParameters: IVerificationNavigationParameters;
  verificationRouting: typeof VerificationRouting = VerificationRouting;

  constructor(private wpfInteropService: WpfInteropService) {
      this.wpfInteropService.wpfViewModelActivated.subscribe(() => {
        this.navigationParameters.Route = this.initialRoute;
      }) }

  ngOnInit() {
    this.initializeNavigationParameters();
  }

  initializeNavigationParameters(): void {
    this.navigationParameters = {} as IVerificationNavigationParameters;
    this.navigationParameters.Route = this.initialRoute;
  }

  onPageNavigationEvent(params: IVerificationNavigationParameters): void {
    this.navigationParameters = params;
  }

  onPageConfigurationUpdateEvent(event: IVerificationPageConfiguration) {
    this.savedPageConfiguration = event;
  }

}
