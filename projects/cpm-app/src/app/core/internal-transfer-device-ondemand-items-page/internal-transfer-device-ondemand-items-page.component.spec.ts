import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferDeviceOndemandItemsPageComponent } from './internal-transfer-device-ondemand-items-page.component';

describe('InternalTransferDeviceOndemandItemsPageComponent', () => {
  let component: InternalTransferDeviceOndemandItemsPageComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferDeviceOndemandItemsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceOndemandItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
