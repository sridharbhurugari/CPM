import { Component, OnInit, ViewChild, Output, EventEmitter, HostListener } from '@angular/core';
import { SortDirection } from '../../shared/constants/sort-direction';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { filter, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject, Subscribable, Subscription } from 'rxjs';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { nameof } from '../../shared/functions/nameof';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { IPrepackVerificationQueueItem } from '../../api-core/data-contracts/i-prepack-verification-queue-item';
import { PrepackVerificationQueueItem } from '../model/prepack-verification-queue-item';
import { PrepackVerificationService } from '../../api-core/services/prepack-verification.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { BarcodeScanService } from 'oal-core';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prepack-verification-queue',
  templateUrl: './prepack-verification-queue.component.html',
  styleUrls: ['./prepack-verification-queue.component.scss']
})
export class PrepackVerificationQueueComponent implements OnInit {

  @ViewChild('searchBox', { static: true }) searchElement: SearchBoxComponent;
  loadingData: boolean;
  searchPipe: SearchPipe = new SearchPipe();
  searchFields = [nameof<PrepackVerificationQueueItem>('ItemDescription'), nameof<PrepackVerificationQueueItem>('ItemId'), nameof<PrepackVerificationQueueItem>('DeviceDescription')];
  currentSortPropertyName: string;
  columnSortDirection: SortDirection;

  prepackVerificationItems$: Observable<IPrepackVerificationQueueItem[]>;
  unfilteredPrepackVerificationQueueItems: PrepackVerificationQueueItem[];
  filteredPrepackVerificationQueueItems: PrepackVerificationQueueItem[];

  idPropertyName = nameof<PrepackVerificationQueueItem>('PrepackVerificationQueueId');
  descriptionPropertyName = nameof<PrepackVerificationQueueItem>('ItemDescription');
  itemIdPropertyName = nameof<PrepackVerificationQueueItem>('ItemId');
  packagerPropertyName = nameof<PrepackVerificationQueueItem>('DeviceDescription');
  qtyPackagedPropertyName = nameof<PrepackVerificationQueueItem>('QuantityToPackage');
  datePropertyName = nameof<PrepackVerificationQueueItem>('PackagedDate');

  ngUnsubscribe = new Subject();

  nonBarcodeInputFocus: boolean = false;
  rawBarcodeMessage: string = '';
  pagelevelInput: string;
  private barcodeScannedSubscription: Subscription;

  constructor(
    private prepackVerificationService: PrepackVerificationService,
    private windowService: WindowService,
    private wpfInteropService: WpfInteropService,
    public translateService: TranslateService,
    private barcodeScanService: BarcodeScanService,
    private barcodeDataService: BarcodeDataService,
    private router: Router,) {
    this.setupDataRefresh();
  }

  ngOnInit() {
    this.loadPrepackVerificationQueueItems();
    this.hookupEventHandlers();
  }

  ngAfterViewInit(): void {
    this.configureSearchHandler();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.unhookEventHandlers();
  }

  private loadPrepackVerificationQueueItems(): void {
    this.loadingData = true;
    this.prepackVerificationItems$ = this.prepackVerificationService.getPrepackQueueData().pipe(
      map((prepackVerificationItems) => {
        this.loadingData = false;
        return prepackVerificationItems.map((verificationItem) => {
          console.log(verificationItem);
          return new PrepackVerificationQueueItem(verificationItem);
        });
      }), shareReplay(1)
    );

    this.prepackVerificationItems$.subscribe((pvi) => {
      this.unfilteredPrepackVerificationQueueItems = pvi;
      this.filteredPrepackVerificationQueueItems = pvi;
    });
  }

  orderChanged(orderedItems: PrepackVerificationQueueItem[]) {
    this.filteredPrepackVerificationQueueItems = orderedItems;
  }

  onDeleteClick(verification: PrepackVerificationQueueItem) {
    this.prepackVerificationService.deletePrepackQueueVerification(verification.PrepackVerificationQueueId).subscribe(result => this.loadPrepackVerificationQueueItems());
  }

  private configureSearchHandler() {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.filteredPrepackVerificationQueueItems = this.filterBySearchText(data, this.unfilteredPrepackVerificationQueueItems);
      });
  }

  /* istanbul ignore next */
  private setupDataRefresh() {
    let hash = this.windowService.getHash();
    this.wpfInteropService.wpfViewModelActivated
      .pipe(filter(x => x == hash), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.loadPrepackVerificationQueueItems();
      });
  }

  /* istanbul ignore next */
  private filterBySearchText(text: string, unfilteredArray: PrepackVerificationQueueItem[]) {
    if (!unfilteredArray) return [];
    return this.searchPipe.transform(unfilteredArray, text, this.searchFields);
  }

  /* ------------------------------- BEGIN SCANNING CODE ----------------------------------*/

  /* istanbul ignore next */
  @HostListener("document:keypress", ['$event']) onKeypressHandler(event: KeyboardEvent) {
    console.log(event);
    if (!this.nonBarcodeInputFocus) {
      let isInputComplete = this.barcodeScanService.handleKeyInput(event);
      //If not from barcode scanner ignore the character
      if (!this.barcodeScanService.isScannerInput()) {
        this.barcodeScanService.reset();
      }
      if (isInputComplete) {
        //populating the page level input into text box.
        this.pagelevelInput = this.barcodeScanService.BarcodeInputCharacters;
        this.rawBarcodeMessage = this.barcodeScanService.BarcodeInputCharacters;
        this.barcodeScanService.reset();
        alert(this.rawBarcodeMessage);
        ////this.showthedetailspageordialog();
      }
    }
  }

  /* istanbul ignore next */
  reset() {
    this.rawBarcodeMessage = '';
  }

  /* istanbul ignore next */
  private hookupEventHandlers(): void {

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

  /* istanbul ignore next */
  private unsubscribeIfValidSubscription(subscription: Subscription): void {
    if (this.isValidSubscription(subscription)) {
      subscription.unsubscribe();
    }
  }

  /* istanbul ignore next */
  private isValidSubscription(variable: any): boolean {
    return variable !== undefined && variable !== null;
  }

  /* istanbul ignore next */
  private isInvalidSubscription(variable: any): boolean {
    return !this.isValidSubscription(variable);
  }

  /* istanbul ignore next */
  processScannedBarcodeData(barodeData: IBarcodeData): void {
    this.barcodeScanService.reset();
    alert(JSON.stringify(barodeData));
  }

  /* istanbul ignore next */
  isInvalid(variable: any): boolean {
    return !this.isValid(variable);
  }

  /* istanbul ignore next */
  isValid(variable: any): boolean {
    return variable !== undefined && variable !== null;
  }
  /* ------------------------------- END SCANNING CODE ----------------------------------*/

  public NavigateToPrepackVerificationDetailsPage(rowClicked: PrepackVerificationQueueItem) {
    this.router.navigate(["core/prepackVerificationDetail/", rowClicked.PrepackVerificationQueueId]);
  }

}
