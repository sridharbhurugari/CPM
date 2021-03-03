import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferDeviceOndemandItemLocationListComponent } from './internal-transfer-device-ondemand-item-location-list.component';

describe('InternalTransferDeviceOndemandItemLocationListComponent', () => {
  let component: InternalTransferDeviceOndemandItemLocationListComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemLocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferDeviceOndemandItemLocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceOndemandItemLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
