import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogComponent, PopupDialogService } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { CoreEventConnectionService } from '../../../api-core/services/core-event-connection.service';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';
import { IItemHeaderInfo } from '../../model/i-item-header-info';
import { MockDeviceLocationAccessComponent } from '../../testing/mock-device-location-access.spec';
import { MockHeaderedContentControlComponent } from '../../testing/mock-headered-content-control.spec';
import { MockSafetyStockProductComponent } from '../../testing/mock-safety-stock-product.spec';
import { MockScalableTextComponent } from '../../testing/mock-scalable-text.spec';
import { MockValidationContanerComponent } from '../../testing/mock-validation-container.spec';

import { GuidedItemHeaderComponent } from './guided-item-header.component';

describe('GuidedItemHeaderComponent', () => {
  let component: GuidedItemHeaderComponent;
  let fixture: ComponentFixture<GuidedItemHeaderComponent>;
  let popupDialogService: Partial<PopupDialogService>;
  let popupDialogComponent: Partial<PopupDialogComponent>;

  beforeEach(async(() => {
    popupDialogComponent = { 
      didClickCloseButton: new EventEmitter(), 
      didClickPrimaryButton: new EventEmitter(),
      onCloseClicked: jasmine.createSpy('onCloseClicked'),
    };
    popupDialogService = { showOnce: jasmine.createSpy('showOnce').and.returnValue(popupDialogComponent) };
    let coreEventConnectionService = {
      carouselReadySubject: new Subject(),
      carouselFaultedSubject: new Subject(),
    };
    TestBed.configureTestingModule({
      declarations: [ 
        GuidedItemHeaderComponent,
        MockScalableTextComponent,
        MockDeviceLocationAccessComponent,
        MockHeaderedContentControlComponent,
        MockValidationContanerComponent,
        MockSafetyStockProductComponent,
      ],
      providers: [
        { provide: TranslateService, useValue: { get: (x: string) => of(`${x}_TRANSLATED`) } },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidedItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.leaseDenied, 'emit');
    component.itemHeaderInfo = { } as IItemHeaderInfo;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('handleDeviceLocationAccessResult', () => {
    describe('called with DeviceLocationAccessResult Succeeded', () => {
      it('should set carouselFaulted false', () => {
        component.carouselFaulted = true;
        component.handleDeviceLocationAccessResult(DeviceLocationAccessResult.Succeeded);
        expect(component.carouselFaulted).toBeFalsy();
      });
    });
    describe('called with DeviceLocationAccessResult Failed', () => {
      it('should set carouselFaulted true', () => {
        component.carouselFaulted = false;
        component.handleDeviceLocationAccessResult(DeviceLocationAccessResult.Failed);
        expect(component.carouselFaulted).toBeTruthy();
      });
    });
    describe('called with DeviceLocationAccessResult LeaseNotRequested', () => {
      it('leaseDenied should emit', () => {
        component.handleDeviceLocationAccessResult(DeviceLocationAccessResult.LeaseNotRequested);
        expect(component.leaseDenied.emit).toHaveBeenCalled();
      });
    });
    describe('called with DeviceLocationAccessResult LeaseNotAvailable', () => {
      beforeEach(() => {
        component.handleDeviceLocationAccessResult(DeviceLocationAccessResult.LeaseNotAvailable);
      });

      it('should display error', () => {
        expect(popupDialogService.showOnce).toHaveBeenCalled();
      });

      describe('and lease denied popup is dismissted', () => {
        beforeEach(() => {
          popupDialogComponent.didClickCloseButton.emit();
        });

        it('leaseDenied should emit', () => {
          expect(component.leaseDenied.emit).toHaveBeenCalled();
        });
      });
    });
  })

  describe('handleLeaseBusyChanged', () => {
    describe('called with isBusy true', () => {
      beforeEach(() => {
        component.handleLeaseBusyChanged(true);
      });

      it('should display lease busy popup', () => {
        expect(popupDialogService.showOnce).toHaveBeenCalled();
      });

      describe('then called with isBusy false', () => {
        beforeEach(() => {
          component.handleLeaseBusyChanged(false);
        });

        it('should close the lease busy popup', () => {
          expect(popupDialogComponent.onCloseClicked).toHaveBeenCalled();
        });
      });
    });
  });
});
