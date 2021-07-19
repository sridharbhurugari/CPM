import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2InvoicesPageComponent } from './xr2-invoices-page.component';

describe('Xr2StockingPageComponent', () => {
  let component: Xr2InvoicesPageComponent;
  let fixture: ComponentFixture<Xr2InvoicesPageComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2InvoicesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2InvoicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
