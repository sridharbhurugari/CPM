import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferDeviceSummariesPageComponent } from './internal-transfer-device-summaries-page.component';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { of } from 'rxjs';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';
import { Component, Input } from '@angular/core';;

@Component({
  selector: 'app-internal-transfer-device-list',
  template: ''
})
class MockDeviceNeedsList {
  @Input()deviceNeeds: IDeviceReplenishmentNeed[];
}

describe('InternalTransferDeviceSummariesPageComponent', () => {
  let component: InternalTransferDeviceSummariesPageComponent;
  let fixture: ComponentFixture<InternalTransferDeviceSummariesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        InternalTransferDeviceSummariesPageComponent,
        MockDeviceNeedsList,
      ],
      providers: [
        { provide: WpfActionControllerService, useValue: { } },
        { provide: DeviceReplenishmentNeedsService, useValue: { get: () => of([]) } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceSummariesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
