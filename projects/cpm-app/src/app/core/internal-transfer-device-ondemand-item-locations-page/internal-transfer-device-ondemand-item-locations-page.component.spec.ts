import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferDeviceOndemandItemLocationsPageComponent } from './internal-transfer-device-ondemand-item-locations-page.component';

describe('InternalTransferDeviceOndemandItemLocationsPageComponent', () => {
  let component: InternalTransferDeviceOndemandItemLocationsPageComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemLocationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferDeviceOndemandItemLocationsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceOndemandItemLocationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
