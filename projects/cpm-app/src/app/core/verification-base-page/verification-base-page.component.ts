import { PopupDialogComponent, PopupDialogService, PopupDialogType } from '@omnicell/webcorecomponents';
import { BarcodeScanService } from 'oal-core';
import { forkJoin, merge, Observable, Subject, Subscription } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';
import { VerificationService } from '../../api-core/services/verification.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { VerificationOrderPageComponent } from '../verification-order-page/verification-order-page.component';
import { WindowService } from '../../shared/services/window-service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { IDialogContents } from '../../shared/interfaces/i-dialog-contents';

@Component({
  selector: "app-verification-base-page",
  templateUrl: "./verification-base-page.component.html",
  styleUrls: ["./verification-base-page.component.scss"],
})
export class VerificationBasePageComponent implements OnInit {

  @Input() savedPageConfiguration: IVerificationPageConfiguration;


  private barcodeScannedSubscription: Subscription;
  private initialRoute = VerificationRouting.OrderPage;

  barcodeScannedSubject: Subject<IBarcodeData> = new Subject<IBarcodeData>();
  approveAllClickSubject: Subject<void> = new Subject<void>();
  navigationParameters: IVerificationNavigationParameters;
  verificationRouting: typeof VerificationRouting = VerificationRouting;
  rejectReasons: Observable<string[]>;
  displayedDialog: PopupDialogComponent;

  ngUnsubscribe = new Subject();
  popupTimeoutSeconds: number;
  translations$: Observable<any>;

  @ViewChild(VerificationOrderPageComponent, { static: false }) childVerificationOrderPageComponent: VerificationOrderPageComponent;

  constructor(
    private windowService: WindowService,
    private wpfInteropService: WpfInteropService,
    private barcodeScanService: BarcodeScanService,
    private barcodeDataService: BarcodeDataService,
    private verificationService: VerificationService,
    private simpleDialogService: SimpleDialogService
  ) {
    this.setupDataRefresh();
  }

  ngOnInit() {
    this.hookupEventHandlers();
    this.initializeNavigationParameters();
    this.loadRejectReasons();
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

  onDisplayWarningDialogEvent(contents: IDialogContents) {
    this.clearDisplayedDialog();
    this.displayWarningDialog(contents.titleResourceKey, contents.msgResourceKey, contents.msgParams);
  }

  onDisplayYesNoDialogEvent(contents: IDialogContents) {
    this.clearDisplayedDialog();
    this.displayYesNoDialog(contents.titleResourceKey, contents.msgResourceKey, contents.msgParams).subscribe(result => {
      if(!result) {
        return;
      }

      this.approveAllClickSubject.next();
    });
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

  /* istanbul ignore next */
  private displayWarningDialog(titleResourceKey: string, msgResourceKey: string, msgParams? : Object) {
    this.simpleDialogService.getWarningOkPopup(titleResourceKey, msgResourceKey, msgParams).subscribe((dialog) => {
      this.displayedDialog = dialog;
    });
  }

  /* istanbul ignore next */
  private displayYesNoDialog(titleResourceKey: string, msgResourceKey: string, msgParams? : Object): Observable<boolean> {
    let buttonClick$ = new Observable<boolean>();
    this.simpleDialogService.getInfoYesNoPopup(titleResourceKey, msgResourceKey, msgParams).subscribe((dialog) => {
      this.displayedDialog = dialog;
      const primaryClick$ = dialog.didClickPrimaryButton.pipe(map(x => false));
      const secondaryClick$ = dialog.didClickSecondaryButton.pipe(map(x => true));
      buttonClick$ = merge(primaryClick$, secondaryClick$);
    });

    return buttonClick$;
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
      .pipe(filter(x => x == hash),takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.savedPageConfiguration = null;
        this.ngOnInit();
        if(this.childVerificationOrderPageComponent) {
          this.childVerificationOrderPageComponent.fromWPFNgOnInit();
          this.childVerificationOrderPageComponent.childVerificationOrderHeaderComponent.fromWPFNgOnInit();
        }
      });
  }
}
