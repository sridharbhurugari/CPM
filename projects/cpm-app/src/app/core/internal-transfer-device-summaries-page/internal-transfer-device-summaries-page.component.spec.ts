import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalTransferDeviceSummariesPageComponent } from './internal-transfer-device-summaries-page.component';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { of, Subject } from 'rxjs';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';
import { Component, Input } from '@angular/core';
import { CoreEventConnectionService } from
  "../../api-core/services/core-event-connection.service";import { ActivatedRoute, Router } from '@angular/router';
import { MockButtonToggle } from '../testing/mock-button-toggle-box.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { WindowService } from '../../shared/services/window-service';
;

@Component({
  selector: 'app-internal-transfer-device-list',
  template: ''
})
class MockDeviceNeedsList {
  @Input()deviceNeeds: IDeviceReplenishmentNeed[];
  @Input()tranferDefaultvalue: boolean;
}

describe('InternalTransferDeviceSummariesPageComponent', () => {
  let component: InternalTransferDeviceSummariesPageComponent;
  let fixture: ComponentFixture<InternalTransferDeviceSummariesPageComponent>;
  let getDeviceItemNeeds: jasmine.Spy;
  let coreEventConnectionService: Partial<CoreEventConnectionService>;
  let deviceReplenishmentNeedsService: Partial<DeviceReplenishmentNeedsService>;
  let router: Partial<Router>;
  let wpfInteropService: Partial<WpfInteropService>;

  beforeEach(async(() => {
    getDeviceItemNeeds = jasmine.createSpy('get');
    deviceReplenishmentNeedsService = {
      get: getDeviceItemNeeds,
    };
    coreEventConnectionService = {
      refreshDeviceNeedsSubject: new Subject(),
    };
    wpfInteropService = {
      wpfViewModelActivated: new Subject<string>(),
    };


    TestBed.configureTestingModule({
      declarations: [
        InternalTransferDeviceSummariesPageComponent,
        MockDeviceNeedsList,
        MockButtonToggle,
        MockTranslatePipe,
      ],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: DeviceReplenishmentNeedsService, useValue: deviceReplenishmentNeedsService },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
        { provide: ActivatedRoute, useValue: { queryParamMap : new Subject() } },
        { provide: WpfInteropService, useValue: wpfInteropService },
        { provide: WindowService, useValue: { getHash: () => null } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(coreEventConnectionService.refreshDeviceNeedsSubject, 'subscribe').and.callThrough();
    getDeviceItemNeeds.and.returnValue(of([]));
    fixture = TestBed.createComponent(InternalTransferDeviceSummariesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Connect to Events', () => {
    it('Connects to events on creation', () => {
      expect(component).toBeTruthy();
      expect(coreEventConnectionService.refreshDeviceNeedsSubject.subscribe).toHaveBeenCalled();
    });
  });

  describe('Refresh Device Needs', () => {
    it('should reload data',
      () => {
        coreEventConnectionService.refreshDeviceNeedsSubject.next();
        expect(deviceReplenishmentNeedsService.get).toHaveBeenCalled();
      });
  });

  describe('setIsNeedsBasedTransfer', () => {
    it('should update query param', () => {
      var value = false;
      component.setIsNeedsBasedTransfer(value);
      let expectedQueryParams = jasmine.objectContaining({ isNeedsBased: value });
      let expectedExtras = jasmine.objectContaining({ queryParams: expectedQueryParams });
      expect(router.navigate).toHaveBeenCalledWith([], expectedExtras);
    });
  });

  describe('isTransferByNeeds true', () => {
    beforeEach(() => {
      component.isTransferByNeeds = true;
    });

    describe('deviceSelected', () => {
      it('should navigate to needs screen', () => {
        component.deviceSelected(5);
        expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.stringMatching('deviceReplenishmentNeeds')]));
      });
    });
  });

  describe('isTransferByNeeds false', () => {
    beforeEach(() => {
      component.isTransferByNeeds = false;
    });

    describe('deviceSelected', () => {
      it('should navigate to on demand screen', () => {
        component.deviceSelected(5);
        expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.stringMatching('deviceReplenishmentOnDemand')]));
      });
    });
  });
});
