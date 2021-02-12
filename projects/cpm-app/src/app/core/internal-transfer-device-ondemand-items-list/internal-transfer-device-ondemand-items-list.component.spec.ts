import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferDeviceOndemandItemsListComponent } from './internal-transfer-device-ondemand-items-list.component';

describe('InternalTransferDeviceOndemandItemsListComponent', () => {
  let component: InternalTransferDeviceOndemandItemsListComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferDeviceOndemandItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceOndemandItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
