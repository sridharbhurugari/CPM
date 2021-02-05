import { Component, Input, OnInit } from '@angular/core';
import { BarcodeScanService } from 'oal-core';
import { Subject, Subscription } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';
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

  private barcodeScannedSubscription: Subscription;

  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  private initialRoute = VerificationRouting.OrderPage;

  navigationParameters: IVerificationNavigationParameters;
  verificationRouting: typeof VerificationRouting = VerificationRouting;

  xr2PickingBarcodeScanned: IBarcodeData;

  ngUnsubscribe = new Subject();

  constructor(private wpfInteropService: WpfInteropService, private barcodeScanService: BarcodeScanService, private barcodeDataService: BarcodeDataService) {
      this.wpfInteropService.wpfViewModelActivated.subscribe(() => {
        this.navigationParameters.Route = this.initialRoute;
      }) }

  ngOnInit() {
    this.hookupEventHandlers();
    this.initializeNavigationParameters();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.unhookEventHandlers();
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

  /* istanbul ignore next */
  private hookupEventHandlers(): void {
    if (this.isInvalidSubscription(this.barcodeScanService)) {
      return;
    }

    this.barcodeScannedSubscription = this.barcodeScanService.BarcodeScannedSubject.subscribe((scannedBarcode: string) =>
      this.barcodeDataService.getData(scannedBarcode).subscribe((result: IBarcodeData) => this.processScannedBarcodeData(result))
    );
  }

  /* istanbul ignore next */
  private unhookEventHandlers(): void {
    if (this.isInvalidSubscription(this.barcodeScanService)) {
      return;
    }

    this.unsubscribeIfValidSubscription(this.barcodeScannedSubscription);
  }

  processScannedBarcodeData(result: IBarcodeData): void {
    console.log(result);
    console.log(result.IsXr2PickingBarcode);

    if(result.IsXr2PickingBarcode)
    {
      this.xr2PickingBarcodeScanned = result;
      return;
    }

    if(result.IsProductBarcode) {

    }
  }

  private unsubscribeIfValidSubscription(subscription: Subscription): void {
    if (this.isValidSubscription(subscription)) {
      subscription.unsubscribe();
    }
  }

  private isValidSubscription(variable: any): boolean {
    return variable !== undefined && variable !== null;
  }

  private isInvalidSubscription(variable: any): boolean {
    return !this.isValidSubscription(variable);
  }
}
