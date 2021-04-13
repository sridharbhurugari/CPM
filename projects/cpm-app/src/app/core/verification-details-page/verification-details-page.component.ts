import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable, of, Subscription, forkJoin } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';
import { VerificationService } from '../../api-core/services/verification.service';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { VerificationDashboardData } from '../../shared/model/verification-dashboard-data';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { VerifiableItem } from '../../shared/model/verifiable-item';
import { LogService } from '../../api-core/services/log-service';
import { LogVerbosity } from 'oal-core';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { LoggingCategory } from '../../shared/constants/logging-category';
import { VerificationDetailsCardComponent } from '../verification-details-card/verification-details-card.component';
import { IVerificationDashboardData } from '../../api-core/data-contracts/i-verification-dashboard-data';
import { IVerificationDestinationDetailViewData } from '../../api-core/data-contracts/i-verification-destination-detail-view-data';
import { IDialogContents } from '../../shared/interfaces/i-dialog-contents';
import { VerificationStatusTypes } from '../../shared/constants/verification-status-types';
@Component({
  selector: 'app-verification-details-page',
  templateUrl: './verification-details-page.component.html',
  styleUrls: ['./verification-details-page.component.scss']
})
export class VerificationDetailsPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();
  @Output() displayWarningDialogEvent: EventEmitter<IDialogContents> = new EventEmitter();

  @Input() navigationParameters: IVerificationNavigationParameters;
  @Input() barcodeScannedEventSubject: Observable<IBarcodeData>;
  @Input() rejectReasons: string[];


  private xr2xr2PickingBarcodeScannedSubscription: Subscription;
  private backRoute = VerificationRouting.DestinationPage;
  private _loggingCategory = LoggingCategory.Verification;
  private _componentName = "VerificationDetailsPageComponent";

  ngUnsubscribe = new Subject();
  verificationDestinationItems: Observable<VerificationDestinationItem[]>;
  verificationDashboardData: Observable<VerificationDashboardData>;
  verificationDestinationDetails: Observable<IVerificationDestinationDetail[]>;
  completedDestinationDetails: Observable<IVerificationDestinationDetail[]>;
  dashboardUpdateSubject: Subject<IVerificationDashboardData> = new Subject();
  itemBarcodeScannedSubject: Subject<IBarcodeData> = new Subject<IBarcodeData>();

  @ViewChild(VerificationDetailsCardComponent, null) childVerificationDetailsCardComponent: VerificationDetailsCardComponent;

  headerSubTitle: Observable<string>;
  headerTitle: Observable<string>;
  translations$: Observable<any>;

  validDestinationDetails: boolean = true;
  IsBoxBarcodeVerified: boolean;

  translatables = [
    'LOADING',
    'PICK_VERIFICATION_DETAILS_NO_DATA_FOUND_TITLE'
  ];

  FillDate: string;
  DeviceDescription: string;

  constructor(
    private translateService: TranslateService,
    private verificationService: VerificationService,
    private logService: LogService,
  ) {
  }

  ngOnInit() {
    this.xr2xr2PickingBarcodeScannedSubscription = this.barcodeScannedEventSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: IBarcodeData) => this.onBarcodeScannedEvent(data));
    this.LoadData();
    this.setTranslations();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.xr2xr2PickingBarcodeScannedSubscription.unsubscribe();
  }

  private LoadData() {
    this.loadVerificationDashboardData();
    this.loadVerificationDestinationDetails();
    this.childVerificationDetailsCardComponent.selectedVerificationDestinationDetail = null;
  }

  onBarcodeScannedEvent(data: IBarcodeData) {
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this._componentName + ' Barcode Scanned: ' + data.BarCodeScanned);

    if(data.IsXr2PickingBarcode) {

      // If a valid safety stock item is in cache and its a different box, approve it on valid box scan
      if(this.childVerificationDetailsCardComponent.scanToAdvanceVerificationDestinationDetail
        && this.childVerificationDetailsCardComponent.scanToAdvanceVerificationDestinationDetail === this.childVerificationDetailsCardComponent.selectedVerificationDestinationDetail
        && this.isDifferentBox(data)) {
        this.childVerificationDetailsCardComponent.approveItem(this.childVerificationDetailsCardComponent.scanToAdvanceVerificationDestinationDetail);
      }

      // Verify the current box
      this.IsBoxBarcodeVerified = true;

      // Load new data
      if(this.isDifferentBox(data)) {
        this.navigationParameters.OrderId = data.OrderId;
        this.navigationParameters.DestinationId = data.DestinationId;
        this.navigationParameters.DeviceId = data.DeviceId;
        this.navigationParameters.RoutedByScan = true;
        this.LoadData();
      }
    } else {
      this.itemBarcodeScannedSubject.next(data);
    }
  }

  onBackEvent(): void {
    let navigationParams: IVerificationNavigationParameters;
    if(this.validDestinationDetails) {
      navigationParams = {
        PriorityCodeDescription: this.navigationParameters.PriorityCodeDescription,
        OrderId: this.navigationParameters.OrderId,
        DeviceId: this.navigationParameters.DeviceId,
        DestinationId: null,
        Route: this.backRoute
      } as IVerificationNavigationParameters;
    } else {
      navigationParams = {
        PriorityCodeDescription: null,
        OrderId: null,
        DeviceId: null,
        DestinationId: null,
        Route: VerificationRouting.OrderPage
      } as IVerificationNavigationParameters;
    }

    this.pageNavigationEvent.emit(navigationParams);
  }

  onDisplayWarningDialogEvent(contents: any) {
    this.displayWarningDialogEvent.emit(contents);
  }

  private loadVerificationDestinationDetails(): void {
    // TODO - Determine what to do here if data cannot be loaded for some reason - perhaps they scanned something already verified.
    if(!this.navigationParameters || !this.navigationParameters.DestinationId || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    this.verificationService.getVerificationDestinationDetails(this.navigationParameters.DestinationId, this.navigationParameters.OrderId, this.navigationParameters.DeviceId).subscribe(
      (verificationDetailViewData) => {
        this.generateHeaderTitle(verificationDetailViewData);
        this.generateHeaderSubTitle(verificationDetailViewData);
        this.generateSafetyStockSettings(verificationDetailViewData.DetailItems);
        this.verificationDestinationDetails = of(verificationDetailViewData.DetailItems.filter(item => item.VerifiedStatus === VerificationStatusTypes.Unverified));
        this.completedDestinationDetails = of(verificationDetailViewData.DetailItems.filter((item) => {
        return item.VerifiedStatus === VerificationStatusTypes.Rejected || item.VerifiedStatus === VerificationStatusTypes.Verified
        }));
      }), shareReplay(1);
  }

  private generateHeaderTitle(verificationDetailViewData: IVerificationDestinationDetailViewData){
    if(verificationDetailViewData.PriorityDescription) {
      this.headerTitle = of(verificationDetailViewData.PriorityDescription);
    } else {
      forkJoin(this.translations$).subscribe(r => {
        const translations = r[0];
        this.headerTitle = of(translations.PICK_VERIFICATION_DETAILS_NO_DATA_FOUND_TITLE);
        this.validDestinationDetails = false;
      });
    }
  }

  private generateHeaderSubTitle(verificationDetailViewData: IVerificationDestinationDetailViewData) {
    var stringResult = ''
    if(verificationDetailViewData.DeviceDescription) {
      stringResult += verificationDetailViewData.DeviceDescription;
    }

    if(verificationDetailViewData.OrderId) {
      if(stringResult !== '') {
        stringResult += ' - ';
      }

      stringResult += verificationDetailViewData.OrderId;
    }

    if(verificationDetailViewData.FillDate) {
      if(stringResult !== '') {
        stringResult += ' - ';
      }
      stringResult += this.transformDateTime(verificationDetailViewData.FillDate);
    }
    this.headerSubTitle = of(stringResult);
  }

  private isDifferentBox(data: IBarcodeData) {
    return this.navigationParameters.DeviceId !== data.DeviceId || data.DestinationId !== this.navigationParameters.DestinationId || data.OrderId !== this.navigationParameters.OrderId
  }

  private generateSafetyStockSettings(verificationDetailViewData: IVerificationDestinationDetail[]) {
    this.IsBoxBarcodeVerified = this.navigationParameters.RoutedByScan || !verificationDetailViewData.some(x => x.IsSafetyStockItem);
  }

  private loadVerificationDashboardData(): void {
    if(!this.navigationParameters || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    this.verificationDashboardData = this.verificationService
    .getVerificationDashboardData(
      this.navigationParameters.PriorityCodeDescription,
      this.navigationParameters.DeviceId.toString(),
       this.navigationParameters.OrderId
       ).pipe(
      map((verificationDashboardData) => {
        return new VerificationDashboardData(verificationDashboardData)
      }), shareReplay(1)
    );
  }

  private transformDateTime(date: Date): string {
    const orderDate = new Date(date).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
   }

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
  }

  onSaveVerificationEvent($event: VerificationDestinationDetail[]): void {
    console.log($event)
    this.saveVerification($event);
  }

  private saveVerification(verificationDestinationDetails: VerificationDestinationDetail[]): void {
    /* istanbul ignore next */
    verificationDestinationDetails.map(detail => {
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this._componentName + ' Saving Verifications, trackById: ' + detail.Id);
    })
    this.verificationService.saveVerification(
      verificationDestinationDetails.map((detail) => {
      detail.Saving = true;
      return VerifiableItem.fromVerificationDestinationDetail(detail);
      }))
    .subscribe(success => {
      try {
        this.handleSaveVerificationSuccess(verificationDestinationDetails);
      } catch(exception) {
        /* istanbul ignore next */
        this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
          this._componentName + ' handleSaveVerificationSuccess failed: ' + exception);
      }
    }, error => {
      try {
        this.handleSaveVerificationFailure(verificationDestinationDetails, error);
      } catch(exception) {
        /* istanbul ignore next */
        this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
          this._componentName + ' handleSaveVerificationFailure failed: ' + exception);
      }
    });
  }

  private handleSaveVerificationSuccess(verificationDestinationDetails: VerificationDestinationDetail[]): void {
    const dashboardDataAdded =  {
      CompleteStatuses: verificationDestinationDetails.length,
      CompleteExceptions: verificationDestinationDetails.filter(x => x.Exception).length,
      CompleteOutputDevices: verificationDestinationDetails.filter(x => x.HasOutputDeviceVerification).length
     } as IVerificationDashboardData

    verificationDestinationDetails.map(detail => detail.Saving = false);
    this.childVerificationDetailsCardComponent.removeVerifiedDetails(verificationDestinationDetails);
    if(verificationDestinationDetails.includes(this.childVerificationDetailsCardComponent.selectedVerificationDestinationDetail)) {
      this.childVerificationDetailsCardComponent.selectedVerificationDestinationDetail = null;
    }
    this.dashboardUpdateSubject.next(dashboardDataAdded);
    /* istanbul ignore next */
    verificationDestinationDetails.map(detail => {
      this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this._componentName + ' Saving Verifications Complete, trackById: ' + detail.Id);
    });
  }

  private handleSaveVerificationFailure(verificationDestinationDetails: VerificationDestinationDetail[], error): void {
    verificationDestinationDetails.map(detail => detail.Saving = false);
    /* istanbul ignore next */
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this._componentName + ' Saving Verifications failed: ' + error);
  }
}
