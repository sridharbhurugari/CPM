import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { WindowService } from '../../shared/services/window-service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';

@Component({
  selector: 'app-verification-base-page',
  templateUrl: './verification-base-page.component.html',
  styleUrls: ['./verification-base-page.component.scss']
})
export class VerificationBasePageComponent implements OnInit {
  private _ngUnsubscribe: Subject<void> = new Subject();

  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  private initialRoute = VerificationRouting.OrderPage;

  navigationParameters: IVerificationNavigationParameters;
  verificationRouting: typeof VerificationRouting = VerificationRouting;

  constructor(
    private wpfInteropService: WpfInteropService,
    private windowService: WindowService,
  ) {
    let hash = this.windowService.getHash();
    this.wpfInteropService.wpfViewModelActivated
      .pipe(filter(x => x == hash), takeUntil(this._ngUnsubscribe))
      .subscribe(() => {
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

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete()
  }

}
