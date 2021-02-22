import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalTransferDeviceSummariesPageComponent } from './internal-transfer-device-summaries-page.component';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { of, Subject } from 'rxjs';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';
import { Component, Input } from '@angular/core';
import { CoreEventConnectionService } from
  "../../api-core/services/core-event-connection.service";import { Router } from '@angular/router';
import { MockButtonToggle } from '../testing/mock-button-toggle-box.spec';
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

  beforeEach(async(() => {
    getDeviceItemNeeds = jasmine.createSpy('get');
    deviceReplenishmentNeedsService = {
      get: getDeviceItemNeeds,
    };
    coreEventConnectionService = {
      refreshDeviceNeedsSubject: new Subject(),
    };


    TestBed.configureTestingModule({
      declarations: [
        InternalTransferDeviceSummariesPageComponent,
        MockDeviceNeedsList,
        MockButtonToggle
      ],
      providers: [
        { provide: Router, useValue: { } },
        { provide: DeviceReplenishmentNeedsService, useValue: deviceReplenishmentNeedsService },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
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
    component.isTransferByNeeds = true;
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
});
