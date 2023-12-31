import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ButtonActionModule, PopupWindowService, SvgIconModule } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { VerificationStatusTypes } from '../../shared/constants/verification-status-types';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockValidationIconComponent } from '../../shared/testing/mock-validation-icon.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ToastService } from '@omnicell/webcorecomponents';
import { VerificationDetailsCardComponent } from './verification-details-card.component';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { Guid } from 'guid-typescript';
import { LogService } from '../../api-core/services/log-service';
import { IDialogContents } from '../../shared/interfaces/i-dialog-contents';
import { ItemDetailsService } from '../../api-core/services/item-details.service';
import { IItemAliasDetails } from '../../api-core/data-contracts/i-item-alias-details';
import { HttpClient } from '@angular/common/http';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

describe('VerificationDetailsCardComponent', () => {
  let component: VerificationDetailsCardComponent;
  let fixture: ComponentFixture<VerificationDetailsCardComponent>;

  let translateService: Partial<TranslateService>;
  let popupWindowService: Partial<PopupWindowService>;
  let toastService: Partial<ToastService>;
  let barcodeScannedInputSubject: Subject<IBarcodeData>;
  let approveAllClickSubject: Subject<void>;
  let logService: Partial<LogService>;
  let itemDetailsService: Partial<ItemDetailsService>;

  popupWindowService = { show: jasmine.createSpy('show').and.returnValue(true) };

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of('')),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  toastService = {
    error: jasmine.createSpy('error'),
    warning: jasmine.createSpy('warning'),
    info: jasmine.createSpy('info'),
  };

  logService = {
    logMessageAsync: jasmine.createSpy('logMessageAsync')
  }

  itemDetailsService = {
    getAlias: jasmine.createSpy('getAlias').and.returnValue(of({} as IItemAliasDetails))
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDetailsCardComponent,
         MockColHeaderSortable, MockTranslatePipe,  MockCpClickableIconComponent, MockValidationIconComponent ],
      imports: [SvgIconModule, ButtonActionModule],
      providers: [
        { provide: TranslateService, useValue: translateService},
        { provide: PopupWindowService, useValue: popupWindowService },
        { provide: ToastService, useValue: toastService },
        { provide: LogService, useValue: logService },
        { provide: ItemDetailsService, useValue: itemDetailsService},
        { provide: HttpClient, useValue: { get: () => {}} },
        { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
        { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDetailsCardComponent);
    component = fixture.componentInstance;
    barcodeScannedInputSubject = new Subject<IBarcodeData>();
    approveAllClickSubject = new Subject<void>();
    component.barcodeScannedEventSubject = barcodeScannedInputSubject;
    component.approveAllClickSubject = approveAllClickSubject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set group data/titles on item list set', () => {
    const newItem = new VerificationDestinationDetail(null);
    newItem.DestinationType = 'type';
    newItem.DestinationLine1 = 'DL0';
    newItem.DestinationLine2 = 'DL1'
    const newList = [
      Object.assign({}, newItem)
    ];

    component.verificationDestinationDetails = newList;

    expect(component.destinationType).toBe(newItem.DestinationType);
    expect(component.destinationLine1).toBe(newItem.DestinationLine1);
    expect(component.destinationLine2).toBe(newItem.DestinationLine2);
  });

  it('should set group data/titles on item list set to null if empty', () => {
    component.verificationDestinationDetails = [];

    expect(component.destinationType).toBe(null);
    expect(component.destinationLine1).toBe(null);
    expect(component.destinationLine2).toBe(null);
  });

  describe('Sorting', () => {
    it('should set sort order on column selected event', () => {
      const mockSortEvent = {} as IColHeaderSortChanged;
      const expectedSortOrder = SortDirection.ascending;
      const expectedColumnName = 'column';
      mockSortEvent.SortDirection = expectedSortOrder;
      mockSortEvent.ColumnPropertyName = expectedColumnName;

      component.columnSelected(mockSortEvent);

      expect(component.currentSortPropertyName).toBe(expectedColumnName);
      expect(component.columnSortDirection).toBe(expectedSortOrder);
    });
  });


  describe('Formatting/Styling', () => {
    it('should get formated datetime', () => {
      const mockdetail = new VerificationDestinationDetail(null);
      const expectedDate = new Date(1, 1, 1, 1, 1, 1, 1);

      mockdetail.FillDate = expectedDate;

      expect(component.getOrderDate(mockdetail)).toBe(expectedDate.toLocaleString('en-US'));
    });

    it('should calculate icon withs for the rows dynamically', () => {
      const expectedWidth1 = component.rowIconWidthPercent;
      const expectedWidth2 = component.rowIconWidthPercent * 2;
      const expectedWidth3 = 0;
      const item1 = new VerificationDestinationDetail(null);
      const item2 = new VerificationDestinationDetail(null);
      const item3 = new VerificationDestinationDetail(null);
      item1.HasOutputDeviceVerification = true;
      item2.HasOutputDeviceVerification = true;
      item2.Exception = true;

      expect(component.calculateDynamicIconWidth(item1)).toBe(expectedWidth1);
      expect(component.calculateDynamicIconWidth(item2)).toBe(expectedWidth2);
      expect(component.calculateDynamicIconWidth(item3)).toBe(expectedWidth3);
    });
  });

  describe('Button Clicks', () => {
    it('should send event with verified item on appove click', () => {
      const verificationItem = new VerificationDestinationDetail(null);
      const saveSpy =  spyOn(component.saveVerificationEvent, 'emit');
      component.completedDestinationDetails = [];

      component.onApproveClick(verificationItem);

      expect(verificationItem.VerifiedStatus).toBe(VerificationStatusTypes.Verified);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(logService.logMessageAsync).toHaveBeenCalled();
    });

    it('should set selected upon item click', () => {
      const mockdetail = new VerificationDestinationDetail(null);
      mockdetail.OrderId = "1"
      component.medicationClicked(mockdetail);
      expect(component.selectedVerificationDestinationDetail.OrderId).toBe("1");
    });

    it('should display toast on required icon click', () => {
      component.onRequiredIconClick();

      expect(toastService.error).toHaveBeenCalledTimes(1);
    });

    it('should disable verify all button when no items are present', () => {
      component.verificationDestinationDetails = [];

      const result = component.containsVerifiableItem(component.verificationDestinationDetails);

      expect(result).toBe(false);
    });

    it('should disable verify all button when all scans required', () => {
      const item1 = new VerificationDestinationDetail(null);
      const item2 = new VerificationDestinationDetail(null);
      const item3 = new VerificationDestinationDetail(null);
      const item4 = new VerificationDestinationDetail(null);
      item1.IsMedBarcodeVerified = false;
      item1.IsSafetyStockItem = true;
      item2.IsMedBarcodeVerified = false;
      item2.IsSafetyStockItem = true;
      item3.IsMedBarcodeVerified = false;
      item3.IsSafetyStockItem = true;
      item4.IsMedBarcodeVerified = false;
      item4.IsSafetyStockItem = true;
      component.verificationDestinationDetails = [item1, item2, item3, item4];

      const result = component.containsVerifiableItem(component.verificationDestinationDetails);

      expect(result).toBe(false);
    });

    it('should enable verify all button when when a required scan is met', () => {
      const item1 = new VerificationDestinationDetail(null);
      const item2 = new VerificationDestinationDetail(null);
      const item3 = new VerificationDestinationDetail(null);
      const item4 = new VerificationDestinationDetail(null);
      item1.IsMedBarcodeVerified = false;
      item1.IsSafetyStockItem = true;
      item2.IsMedBarcodeVerified = false;
      item2.IsSafetyStockItem = true;
      item3.IsMedBarcodeVerified = false;
      item3.IsSafetyStockItem = true;
      item4.IsMedBarcodeVerified = true;
      item4.IsSafetyStockItem = true;
      component.verificationDestinationDetails = [item1, item2, item3, item4];

      const result = component.containsVerifiableItem(component.verificationDestinationDetails);

      expect(result).toBe(true);
    });

    it('should verify all and send items through save event', () => {
      const saveSpy = spyOn(component.saveVerificationEvent, 'emit');
      const item1 = new VerificationDestinationDetail(null);
      const item2 = new VerificationDestinationDetail(null);
      const item3 = new VerificationDestinationDetail(null);
      const item4 = new VerificationDestinationDetail(null);
      const unverifiedItem = new VerificationDestinationDetail(null);
      item1.IsMedBarcodeVerified = false;
      item1.IsSafetyStockItem = false;
      item1.VerifiedStatus = VerificationStatusTypes.Unverified;
      item2.IsMedBarcodeVerified = true;
      item2.IsSafetyStockItem = true;
      item2.VerifiedStatus = VerificationStatusTypes.Unverified;
      item3.IsMedBarcodeVerified = false;
      item3.IsSafetyStockItem = false;
      item3.VerifiedStatus = VerificationStatusTypes.Unverified;
      item4.IsMedBarcodeVerified = true;
      item4.IsSafetyStockItem = true;
      item4.VerifiedStatus = VerificationStatusTypes.Unverified;
      unverifiedItem.IsMedBarcodeVerified = false;
      unverifiedItem.IsSafetyStockItem = true;
      unverifiedItem.VerifiedStatus = VerificationStatusTypes.Unverified;
      const verifiedItems = [item1, item2, item3, item4];
      component.verificationDestinationDetails = [item1, item2, item3, item4, unverifiedItem];

      component.onApproveAllPopupConfirmClick();

      verifiedItems.forEach((item) => {
        expect(item.VerifiedStatus).toBe(VerificationStatusTypes.Verified);
      });
      expect(unverifiedItem.VerifiedStatus).toBe(VerificationStatusTypes.Unverified);
      expect(saveSpy).toHaveBeenCalledWith(verifiedItems);
    });
  })

  describe('Scans', () => {
    it('should emit message on non item scan', () => {
      const unexpectedBarcodeSpy = spyOn(component.displayWarningDialogEvent, 'emit');
      var barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: '12345|67', IsXr2PickingBarcode: true} as IBarcodeData;
      barcodeScannedInputSubject.next(barcodeData);
      expect(unexpectedBarcodeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit message on non matching item scan', () => {
      const unexpectedBarcodeSpy = spyOn(component.displayWarningDialogEvent, 'emit');
      component.completedDestinationDetails = [];
      const newItem = new VerificationDestinationDetail(null);
      newItem.DestinationType = 'type';
      newItem.DestinationLine1 = 'DL0';
      newItem.DestinationLine2 = 'DL1',
      newItem.ItemId = 'Item1'

      const newList = [
        Object.assign({}, newItem)
      ];

      component.verificationDestinationDetails = newList;

      var barcodeData = { ItemId: '1'} as IBarcodeData;
      barcodeScannedInputSubject.next(barcodeData);
      expect(unexpectedBarcodeSpy).toHaveBeenCalledTimes(1);
    });

    it('should set selected data on matching item scan', () => {
      const expectedBarcodeScanned = 'ABC';
      const expectedProductId = '123';
      const expectedBarcodeFormat = 'MC';
      const expectedItemId = '1';
      const newItem = new VerificationDestinationDetail(null);
      newItem.DestinationType = 'type';
      newItem.DestinationLine1 = 'DL0';
      newItem.DestinationLine2 = 'DL1',
      newItem.ItemId = expectedItemId

      const newList = [
        Object.assign({}, newItem)
      ];

      component.verificationDestinationDetails = newList;

      var barcodeData = { ItemId: expectedItemId, BarCodeScanned: expectedBarcodeScanned, ProductId: expectedProductId, BarCodeFormat: expectedBarcodeFormat} as IBarcodeData;
      barcodeScannedInputSubject.next(barcodeData);
      expect(component.selectedVerificationDestinationDetail.ItemId).toEqual(expectedItemId);
      expect(component.selectedVerificationDestinationDetail.TransactionScannedBarcodeFormat).toEqual(expectedBarcodeFormat);
      expect(component.selectedVerificationDestinationDetail.TransactionScannedBarcodeProductId).toEqual(expectedProductId);
      expect(component.selectedVerificationDestinationDetail.TransactionScannedRawBarcode).toEqual(expectedBarcodeScanned);
    });

    it('should show dialog on completed item scan', () => {
      const dialogSpy = spyOn(component.displayWarningDialogEvent, 'emit');
      const item1 = new VerificationDestinationDetail(null);
      const item2 = new VerificationDestinationDetail(null);
      const scan = {} as IBarcodeData;
      item1.ItemId = '1';
      item2.ItemId = '2';
      scan.ItemId = '2';
      item2.ItemFormattedGenericName = 'generic';
      item2.ItemTradeName = 'trade';
      item2.VerifiedStatus = VerificationStatusTypes.Verified;
      const expectedDialogEvent = {
        titleResourceKey: 'ITEM_SCAN_TITLE',
        msgResourceKey: 'ITEM_ALREADY_VERIFIED_MESSAGE',
        msgParams: { itemFormattedGenericName: 'generic', itemTradeName: 'trade' }
      } as IDialogContents;
      component.verificationDestinationDetails = [item1];
      component.completedDestinationDetails = [item2];

      component.onBarcodeScannedEvent(scan);

      expect(dialogSpy).toHaveBeenCalledWith(expectedDialogEvent);
    });
  });

  describe('Child Actions', () => {
    it('should remove item from list after verification save', () => {
      const newItem = new VerificationDestinationDetail(null);
      newItem.DestinationType = 'type';
      newItem.DestinationLine1 = 'DL0';
      newItem.DestinationLine2 = 'DL1',
      newItem.ItemId = '1'
      component.completedDestinationDetails = [];

      const newList = [
        Object.assign({}, newItem)
      ];

      component.verificationDestinationDetails = newList;
      component.selectedVerificationDestinationDetail = newItem;

      component.completeAndRemoveVerifiedDetails(newList);
      expect(component.verificationDestinationDetails.length).toEqual(0);
    });
  });

  describe('Safety Stock', ()=> {
    it('should contain safety stock item', () => {
      const item1 = new VerificationDestinationDetail(null);
      const item2 = new VerificationDestinationDetail(null);
      const item3 = new VerificationDestinationDetail(null);
      item1.IsSafetyStockItem = true;
      const items = [item1, item2, item3];

      expect(component.containsSafetyStockMedication(items)).toBeTruthy();
    });

    it('should not contain safety stock item', () => {
      const item1 = new VerificationDestinationDetail(null);
      const item2 = new VerificationDestinationDetail(null);
      const item3 = new VerificationDestinationDetail(null);
      const items = [item1, item2, item3];

      expect(component.containsSafetyStockMedication(items)).toBeFalsy();
    });

    it('should emit barcode unexpected event on scan if not formatted correctly', ()=> {
      const unexpectedBarcodeSpy = spyOn(component.displayWarningDialogEvent, 'emit');
      const data = {} as IBarcodeData;

      component.onBarcodeScannedEvent(data);

      expect(unexpectedBarcodeSpy).toHaveBeenCalledTimes(1);
    });


    it('should emit barcode unexpected event on scan if item is not found', ()=> {
      const unexpectedBarcodeSpy = spyOn(component.displayWarningDialogEvent, 'emit');
      component.completedDestinationDetails = [];
      const data = {ItemId: 'itemId1'} as IBarcodeData;
      component.verificationDestinationDetails = [{ItemId: 'itemId2'} as VerificationDestinationDetail]

      component.onBarcodeScannedEvent(data);

      expect(unexpectedBarcodeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit barcode required event and select item on scan without xr2 picking label scanned', ()=> {
      const requiredBarcodeSpy = spyOn(component.displayWarningDialogEvent, 'emit');
      const data = {ItemId: 'itemId'} as IBarcodeData;
      const item = {ItemId: 'itemId', Id: Guid.create()} as VerificationDestinationDetail
      component.verificationDestinationDetails = [item];
      component.IsBoxBarcodeVerified = false;

      component.onBarcodeScannedEvent(data);

      expect(component.selectedVerificationDestinationDetail).toBe(item);
      expect(requiredBarcodeSpy).toHaveBeenCalledTimes(1);
    });


    it('should verify med barcode and select item on scan with xr2 picking label scanned', ()=> {
      const data = {ItemId: 'itemId'} as IBarcodeData;
      const item = {ItemId: 'itemId', Id: Guid.create()} as VerificationDestinationDetail
      component.verificationDestinationDetails = [item];
      component.IsBoxBarcodeVerified = true;

      component.onBarcodeScannedEvent(data);

      expect(component.selectedVerificationDestinationDetail).toBe(item);
      expect(item.IsMedBarcodeVerified).toBeTruthy();
    });
  });

  describe('Scan to advance - scanning', () => {
    it('should cache scan to advance item on successful barcode scan', () => {
      const data = {ItemId: 'itemId'} as IBarcodeData;
      const item = {ItemId: 'itemId',  Id: Guid.create()} as VerificationDestinationDetail;
      component.verificationDestinationDetails = [item];
      component.IsBoxBarcodeVerified = true;
      component.scanToAdvanceVerificationDestinationDetail = null;

      component.onBarcodeScannedEvent(data);

      expect(component.scanToAdvanceVerificationDestinationDetail).toBe(item);
    });

    it('should not approve scan to advance item if no cached item', () => {
      const saveEventSpy = spyOn(component.saveVerificationEvent, 'emit');
      const data = {ItemId: 'itemId'} as IBarcodeData;
      const item = {ItemId: 'itemId', Id: Guid.create()} as VerificationDestinationDetail;
      component.verificationDestinationDetails = [item];
      component.IsBoxBarcodeVerified = true;
      component.selectedVerificationDestinationDetail = item;
      component.scanToAdvanceVerificationDestinationDetail = null;

      component.onBarcodeScannedEvent(data);

      expect(saveEventSpy).toHaveBeenCalledTimes(0);
    });

    it('should approve scan to advance item if on selected item', () => {
      const saveEventSpy = spyOn(component.saveVerificationEvent, 'emit');
      component.completedDestinationDetails = [];
      const data = {ItemId: 'itemId'} as IBarcodeData;
      const item = {ItemId: 'itemId', Id: Guid.create()} as VerificationDestinationDetail;
      const scanToAdvanceItem = new VerificationDestinationDetail(null);
      component.verificationDestinationDetails = [item];
      component.IsBoxBarcodeVerified = true;
      component.selectedVerificationDestinationDetail = scanToAdvanceItem;
      component.scanToAdvanceVerificationDestinationDetail = scanToAdvanceItem;

      component.onBarcodeScannedEvent(data);

      expect(component.scanToAdvanceVerificationDestinationDetail).toBe(item);
      expect(saveEventSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Scan to advance - clicking', () => {
    it('should not cache the clicked medication if not verified', () => {
      const item = new VerificationDestinationDetail(null);
      item.IsSafetyStockItem = true;
      component.IsBoxBarcodeVerified = false;
      item.IsMedBarcodeVerified = false;

      component.medicationClicked(item);

      expect(component.scanToAdvanceVerificationDestinationDetail).toBe(undefined);
    });

    it('should cache the clicked medication as scan to advance item if not a safety stock item', () => {
      const item = new VerificationDestinationDetail(null);
      item.IsSafetyStockItem = false;

      component.medicationClicked(item);

      expect(component.scanToAdvanceVerificationDestinationDetail).toBe(item);
    });

    it('should cache the clicked medication as scan to advance item if med and box verified', () => {
      const item = new VerificationDestinationDetail(null);
      item.IsSafetyStockItem = true;
      component.IsBoxBarcodeVerified = true;
      item.IsMedBarcodeVerified = true;

      component.medicationClicked(item);

      expect(component.scanToAdvanceVerificationDestinationDetail).toBe(item);
    });
  });

  describe('API Calls', () => {
    it('should remove items from details list on successful save', () => {
      const item1 = new VerificationDestinationDetail(null);
      const item2 = new VerificationDestinationDetail(null);
      const item3 = new VerificationDestinationDetail(null);
      const item4 = new VerificationDestinationDetail(null);
      const verifiedItems = [item1, item2, item3];
      component.verificationDestinationDetails = [item1, item2, item3, item4];
      component.completedDestinationDetails = [];

      component.completeAndRemoveVerifiedDetails(verifiedItems);

      expect(component.verificationDestinationDetails.length).toBe(1);
      expect(component.verificationDestinationDetails[0]).toBe(item4);
      expect(component.completedDestinationDetails).toEqual(verifiedItems);
    });
  })
});
