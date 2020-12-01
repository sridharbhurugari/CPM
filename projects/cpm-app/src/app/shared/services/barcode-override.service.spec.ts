import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PopupDialogComponent } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IBarcodeOverrideData } from '../model/i-barcode-override-data';
import { BarcodeOverrideService } from './barcode-override.service';
import { BarcodeParsingService } from './barcode-parsing.service';
import { BarcodeSafetyStockService } from './barcode-safety-stock.service';
import { SimpleDialogService } from './dialogs/simple-dialog.service';
import { UserPermissionsCacheService } from './user-permissions-cache.service';

describe('BarcodeOverrideService', () => {
  let service: BarcodeOverrideService;
  let barcodeParsed$: Subject<IBarcodeData>;
  let safetyStockService: BarcodeSafetyStockService;
  let userPermissionsCacheService: UserPermissionsCacheService;
  let barcodeOverrideData: IBarcodeOverrideData;
  let simpleDialogService: Partial<SimpleDialogService>;
  let warningOkPopup: Partial<PopupDialogComponent>;

  beforeEach(() => {
    barcodeParsed$ = new Subject<IBarcodeData>();;
    spyOn(barcodeParsed$, 'subscribe').and.callThrough();
    warningOkPopup = jasmine.createSpyObj('warningOkPopup', [ 'onCloseClicked', 'onSecondaryClicked', ]);
    warningOkPopup.didClickCloseButton = new EventEmitter();
    warningOkPopup.didClickPrimaryButton = new EventEmitter();
    let warningCancelPopup = { 
      onCloseClicked: () => { },
      didClickCloseButton: new EventEmitter(),
      didClickPrimaryButton: new EventEmitter(),
      onSecondaryClicked: () => { },
    };
    simpleDialogService = { 
      getWarningOkPopup: jasmine.createSpy('getWarningOkPopup').and.returnValue(of(warningOkPopup)),
      getWarningCancelPopup: jasmine.createSpy('getWarningCancelPopup').and.returnValue(of(warningCancelPopup)),
    };
    barcodeOverrideData = {
      acceptParsedDates: false,
      acceptParsedNumbers: false,
      acceptTrayBarcodes: false,
      allowOverride: false,
      dispenseIds: [],
      itemId: '',
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: BarcodeParsingService, useValue: { barcodeParsed$: barcodeParsed$ } },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: BarcodeSafetyStockService, useValue: { } },
        { provide: UserPermissionsCacheService, useValue: { } },
        BarcodeOverrideService,
      ],
    });
    service = TestBed.get(BarcodeOverrideService);
    spyOn(service.overrideBarcodeParsed$, 'next');
    safetyStockService = TestBed.get(BarcodeSafetyStockService);
    safetyStockService.productScannedSuccessfully = new EventEmitter<IBarcodeData>();
    userPermissionsCacheService = TestBed.get(UserPermissionsCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given user does not have override permission', () => {
    beforeEach(() => {
      userPermissionsCacheService.canOverrideBarcode = () => of(false);
    });

    describe('and data allows override', () => {
      beforeEach(() => {
        barcodeOverrideData.allowOverride = true;
      });

      describe('when initialize is called', () => {
        beforeEach(() => {
          service.initialize(barcodeOverrideData);
        });

        it('should subscribe to scans', () => {
          expect(barcodeParsed$.subscribe).toHaveBeenCalled();
        });

        describe('and awaiting safety stock scan', () => {
          beforeEach(() => {
            safetyStockService.awaitingProductScan = true;
          });

          describe('and an invalid scan is handled', () => {
            beforeEach(() => {
              barcodeParsed$.next({ IsProductBarcode: true, ItemId: 'noMatch' } as IBarcodeData);
            });

            it('should display invalid scan warning without accepting override', () => {
              expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalled();
            });

            describe('when another invalid scan is handled', () => {
              beforeEach(() => {
                barcodeParsed$.next({ IsProductBarcode: true, ItemId: 'noMatch' } as IBarcodeData);
              });

              it('should close the invalid scan warning and open another one', () => {
                expect(warningOkPopup.onCloseClicked).toHaveBeenCalled();
              expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalled();
              });
            });
          });
        });

        describe('and no safety stock scan is needed', () => {
          beforeEach(() => {
            safetyStockService.awaitingProductScan = false;
          });

          describe('when an invalid scan is handled', () => {
            beforeEach(() => {
              barcodeParsed$.next({ IsProductBarcode: true, ItemId: 'noMatch' } as IBarcodeData);
            });

            it('should not display any popup', () => {
              expect(simpleDialogService.getWarningCancelPopup).not.toHaveBeenCalled();
              expect(simpleDialogService.getWarningOkPopup).not.toHaveBeenCalled();
            })
          });
        });
      });
    });
  });

  describe('given user has override permission', () => {
    beforeEach(() => {
      userPermissionsCacheService.canOverrideBarcode = () => of(true);
    });

    describe('and data allows override', () => {
      beforeEach(() => {
        barcodeOverrideData.allowOverride = true;
      });

      describe('when initialize is called', () => {
        beforeEach(() => {
          service.initialize(barcodeOverrideData);
        });

        it('should subscribe to scans', () => {
          expect(barcodeParsed$.subscribe).toHaveBeenCalled();
        });

        describe('and awaiting safety stock scan', () => {
          beforeEach(() => {
            safetyStockService.awaitingProductScan = true;
          });

          describe('and an invalid scan is handled', () => {
            beforeEach(() => {
              barcodeParsed$.next({ IsProductBarcode: true, ItemId: 'noMatch' } as IBarcodeData);
            });

            it('should display override popup', () => {
              expect(simpleDialogService.getWarningCancelPopup).toHaveBeenCalled();
            });

            describe('when an override scan is handled', () => {
              beforeEach(() => {
                barcodeParsed$.next({ IsBarcodeOverride: true } as IBarcodeData);
              });

              it('should indicate overrideBarcodeParsed$', () => {
                expect(service.overrideBarcodeParsed$.next).toHaveBeenCalled();
              });
            });

            describe('when another invalid scan is handled', () => {
              beforeEach(() => {
                barcodeParsed$.next({ IsProductBarcode: true, ItemId: 'noMatch' } as IBarcodeData);
              });

              it('should diplay popup indicating incorrect override code', () => {
                expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalled();
              });
            });
          });
        });

        describe('and no safety stock scan is needed', () => {
          beforeEach(() => {
            safetyStockService.awaitingProductScan = false;
          });

          describe('when an invalid scan is handled', () => {
            beforeEach(() => {
              barcodeParsed$.next({ IsProductBarcode: true, ItemId: 'noMatch' } as IBarcodeData);
            });

            it('should not display any popup', () => {
              expect(simpleDialogService.getWarningCancelPopup).not.toHaveBeenCalled();
              expect(simpleDialogService.getWarningOkPopup).not.toHaveBeenCalled();
            })
          });
        });
      });
    });

    describe('and data forbids override', () => {
      beforeEach(() => {
        barcodeOverrideData.allowOverride = false;
      });

      describe('when initialize is called', () => {
        beforeEach(() => {
          service.initialize(barcodeOverrideData);
        });

        it('should subscribe to scans', () => {
          expect(barcodeParsed$.subscribe).toHaveBeenCalled();
        });

        describe('and awaiting safety stock scan', () => {
          beforeEach(() => {
            safetyStockService.awaitingProductScan = true;
          });

          describe('and an invalid scan is handled', () => {
            beforeEach(() => {
              barcodeParsed$.next({ IsProductBarcode: true, ItemId: 'noMatch' } as IBarcodeData);
            });

            it('should display invalid scan warning without accepting override', () => {
              expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalled();
            });

            describe('when another invalid scan is handled', () => {
              beforeEach(() => {
                barcodeParsed$.next({ IsProductBarcode: true, ItemId: 'noMatch' } as IBarcodeData);
              });

              it('should close the invalid scan warning and open another one', () => {
                expect(warningOkPopup.onCloseClicked).toHaveBeenCalled();
              expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalled();
              });
            });
          });
        });

        describe('and no safety stock scan is needed', () => {
          beforeEach(() => {
            safetyStockService.awaitingProductScan = false;
          });

          describe('when an invalid scan is handled', () => {
            beforeEach(() => {
              barcodeParsed$.next({ IsProductBarcode: true, ItemId: 'noMatch' } as IBarcodeData);
            });

            it('should not display any popup', () => {
              expect(simpleDialogService.getWarningCancelPopup).not.toHaveBeenCalled();
              expect(simpleDialogService.getWarningOkPopup).not.toHaveBeenCalled();
            })
          });
        });
      });
    });
  });
});
