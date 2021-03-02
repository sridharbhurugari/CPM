import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { PopupWindowService, SvgIconModule } from '@omnicell/webcorecomponents';
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

describe('VerificationDetailsCardComponent', () => {
  let component: VerificationDetailsCardComponent;
  let fixture: ComponentFixture<VerificationDetailsCardComponent>;

  let translateService: Partial<TranslateService>;
  let popupWindowService: Partial<PopupWindowService>;
  let toastService: Partial<ToastService>;
  let barcodeScannedInputSubject: Subject<IBarcodeData>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDetailsCardComponent,
         MockColHeaderSortable, MockTranslatePipe,  MockCpClickableIconComponent, MockValidationIconComponent ],
      imports: [SvgIconModule],
      providers: [
        { provide: TranslateService, useValue: translateService},
        { provide: PopupWindowService, useValue: popupWindowService },
        { provide: ToastService, useValue: toastService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDetailsCardComponent);
    component = fixture.componentInstance;
    barcodeScannedInputSubject = new Subject<IBarcodeData>();
    component.barcodeScannedEventSubject = barcodeScannedInputSubject;
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

      component.onApproveClick(verificationItem);

      expect(verificationItem.VerifiedStatus).toBe(VerificationStatusTypes.Verified);
      expect(saveSpy).toHaveBeenCalledTimes(1);
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
  })

  describe('Scans', () => {
    it('should emit message on non item scan', () => {
      const unexpectedBarcodeSpy = spyOn(component.verificationDetailBarcodeScanUnexpected, 'emit');
      var barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: '12345|67', IsXr2PickingBarcode: true} as IBarcodeData;
      barcodeScannedInputSubject.next(barcodeData);
      expect(unexpectedBarcodeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit message on non matching item scan', () => {
      const unexpectedBarcodeSpy = spyOn(component.verificationDetailBarcodeScanUnexpected, 'emit');
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
      const newItem = new VerificationDestinationDetail(null);
      newItem.DestinationType = 'type';
      newItem.DestinationLine1 = 'DL0';
      newItem.DestinationLine2 = 'DL1',
      newItem.ItemId = '1'

      const newList = [
        Object.assign({}, newItem)
      ];

      component.verificationDestinationDetails = newList;

      var barcodeData = { ItemId: '1'} as IBarcodeData;
      barcodeScannedInputSubject.next(barcodeData);
      expect(component.selectedVerificationDestinationDetail.ItemId).toEqual('1');
    });
  });

  describe('Child Actions', () => {
    it('should remove item from list after verification save', () => {
      const newItem = new VerificationDestinationDetail(null);
      newItem.DestinationType = 'type';
      newItem.DestinationLine1 = 'DL0';
      newItem.DestinationLine2 = 'DL1',
      newItem.ItemId = '1'

      const newList = [
        Object.assign({}, newItem)
      ];

      component.verificationDestinationDetails = newList;
      component.selectedVerificationDestinationDetail = newItem;

      component.removeVerifiedDetails(newList);
      expect(component.selectedVerificationDestinationDetail).toEqual(null);
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
      const unexpectedBarcodeSpy = spyOn(component.verificationDetailBarcodeScanUnexpected, 'emit');
      const data = {} as IBarcodeData;

      component.onBarcodeScannedEvent(data);

      expect(unexpectedBarcodeSpy).toHaveBeenCalledTimes(1);
    });


    it('should emit barcode unexpected event on scan if item is not found', ()=> {
      const unexpectedBarcodeSpy = spyOn(component.verificationDetailBarcodeScanUnexpected, 'emit');
      const data = {ItemId: 'itemId1'} as IBarcodeData;
      component.verificationDestinationDetails = [{ItemId: 'itemId2'} as VerificationDestinationDetail]

      component.onBarcodeScannedEvent(data);

      expect(unexpectedBarcodeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit barcode required event and select item on scan without xr2 picking label scanned', ()=> {
      const requiredBarcodeSpy = spyOn(component.verificationBoxBarcodeRequired, 'emit');
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
  })
});
