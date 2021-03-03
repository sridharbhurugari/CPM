import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferDeviceOndemandItemLocationsPopupComponent } from './internal-transfer-device-ondemand-item-locations-popup.component';

describe('InternalTransferDeviceOndemandItemLocationsPopupComponent', () => {
  let component: InternalTransferDeviceOndemandItemLocationsPopupComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemLocationsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferDeviceOndemandItemLocationsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceOndemandItemLocationsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
