import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@omnicell/webcorecomponents';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { VerificationService } from '../../api-core/services/verification.service';
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
  rejectReasons: Observable<string[]>;

  constructor(
    private wpfInteropService: WpfInteropService,
    private verificationService: VerificationService,
    private translateService: TranslateService,
    private toastService: ToastService
    ) {
      this.wpfInteropService.wpfViewModelActivated.subscribe(() => {
        this.navigationParameters.Route = this.initialRoute;
      }) }

  ngOnInit() {
    this.initializeNavigationParameters();
    this.loadRejectReasons();
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

  private loadRejectReasons(): void {
    this.rejectReasons = this.verificationService.getVerificationRejectReasons();
  }
}
