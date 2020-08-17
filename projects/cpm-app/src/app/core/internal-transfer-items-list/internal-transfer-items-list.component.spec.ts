import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferItemsListComponent } from './internal-transfer-items-list.component';

describe('InternalTransferItemsListComponent', () => {
  let component: InternalTransferItemsListComponent;
  let fixture: ComponentFixture<InternalTransferItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
