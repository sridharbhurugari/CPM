import { TranslateService } from '@ngx-translate/core';
import { PopupDialogComponent, PopupDialogProperties, PopupDialogService, PopupDialogType } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import { BarcodeScanService } from 'oal-core';
import { Observable, Subject, Subscription } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';
import { VerificationService } from '../../api-core/services/verification.service';
import { Component, Input, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { WindowService } from '../../shared/services/window-service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';

@Component({
  selector: "app-verification-base-page",
  templateUrl: "./verification-base-page.component.html",
  styleUrls: ["./verification-base-page.component.scss"],
})
export class VerificationBasePageComponent implements OnInit {
  private barcodeScannedSubscription: Subscription;

  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  barcodeScannedSubject: Subject<IBarcodeData> = new Subject<IBarcodeData>();

  private initialRoute = VerificationRouting.OrderPage;

  navigationParameters: IVerificationNavigationParameters;
  verificationRouting: typeof VerificationRouting = VerificationRouting;
  rejectReasons: Observable<string[]>;
  displayedDialog: PopupDialogComponent;

  ngUnsubscribe = new Subject();
  popupTimeoutSeconds: number;
  translations$: Observable<any>;

  translatables = [
    "PICK_VERIFICATION_EXPECTED_PICKING_BARCODE_SCAN",
    "BARCODESCAN_DIALOGWARNING_TITLE",
    "OK",
    "PICK_VERIFICATION_EXPECTED_ITEM_OR_PICKING_LABEL_SCAN",
  ];

  constructor(
    private wpfInteropService: WpfInteropService,
    private windowService: WindowService,
    private barcodeScanService: BarcodeScanService,
    private barcodeDataService: BarcodeDataService,
    private systemConfigurationService: SystemConfigurationService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private verificationService: VerificationService,
  ) {
    this.setupDataRefresh();
  }

  ngOnInit() {
    this.LoadTransientData();
    this.hookupEventHandlers();
    this.initializeNavigationParameters();
    this.loadRejectReasons();
  }

  private LoadTransientData() {
    this.systemConfigurationService
      .GetConfigurationValues("TIMEOUTS", "POP_UP_MESSAGE_TIMEOUT")
      .subscribe((result) => {
        this.popupTimeoutSeconds = Number(result.Value);
      });
    this.setTranslations();
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

  onNonXr2PickingBarcodeScanUnexpected() {
    this.displayExpectedPickingBarcodeScan();
  }

  onVerificationDetailBarcodeScanUnexpected() {
    this.displayUnexpectedBarcodeScanInDetails();
  }

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
  }

  /* istanbul ignore next */
  private hookupEventHandlers(): void {
    if (this.isInvalidSubscription(this.barcodeScanService)) {
      return;
    }

    this.barcodeScannedSubscription = this.barcodeScanService.BarcodeScannedSubject.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((scannedBarcode: string) =>
      this.barcodeDataService
        .getData(scannedBarcode)
        .subscribe((result: IBarcodeData) =>
          this.processScannedBarcodeData(result)
        )
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
    // TODO - This should probably check if it is an XR2 Picking Label and that it is actually supposed to show it?
    // Right now, you can scan something that has aged off and it will still show.
    // If we move the verification to here, we can handle it better on all views.
    this.clearDisplayedDialog();
    this.barcodeScannedSubject.next(result);
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

  private displayExpectedPickingBarcodeScan(): void {
    this.clearDisplayedDialog();
    this.translations$.subscribe((translations) => {
      const properties = new PopupDialogProperties("Role-Status-Warning");
      properties.titleElementText =
        translations.BARCODESCAN_DIALOGWARNING_TITLE;
      properties.messageElementText =
        translations.PICK_VERIFICATION_EXPECTED_PICKING_BARCODE_SCAN;
      properties.primaryButtonText = translations.OK;
      properties.showPrimaryButton = true;
      properties.showSecondaryButton = false;
      properties.dialogDisplayType = PopupDialogType.Warning;
      properties.timeoutLength = this.popupTimeoutSeconds;
      properties.uniqueId = Guid.create().toString();
      this.displayedDialog = this.dialogService.showOnce(properties);
    });
  }

  private displayUnexpectedBarcodeScanInDetails(): void {
    this.clearDisplayedDialog();
    this.translations$.subscribe((translations) => {
      const properties = new PopupDialogProperties("Role-Status-Warning");
      properties.titleElementText =
        translations.BARCODESCAN_DIALOGWARNING_TITLE;
      properties.messageElementText =
        translations.PICK_VERIFICATION_EXPECTED_ITEM_OR_PICKING_LABEL_SCAN;
      properties.primaryButtonText = translations.OK;
      properties.showPrimaryButton = true;
      properties.showSecondaryButton = false;
      properties.dialogDisplayType = PopupDialogType.Warning;
      properties.timeoutLength = this.popupTimeoutSeconds;
      properties.uniqueId = Guid.create().toString();
      this.displayedDialog = this.dialogService.showOnce(properties);
    });
  }

  private loadRejectReasons(): void {
    this.rejectReasons = this.verificationService.getVerificationRejectReasons();
  }

  /* istanbul ignore next */
  private clearDisplayedDialog() {
    try {
      if (this.displayedDialog) {
        this.displayedDialog.onCloseClicked();
      }
    } catch (err) {
      // Eat it - this happens if it was closed - this should be fixed in the Dialog so it doesnt crash
    }


  }

  /* istanbul ignore next */
  private setupDataRefresh() {
    let hash = this.windowService.getHash();
    this.wpfInteropService.wpfViewModelActivated
      .pipe(filter(x => x == hash), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.LoadTransientData();
        this.initializeNavigationParameters();
      });
  }
}
