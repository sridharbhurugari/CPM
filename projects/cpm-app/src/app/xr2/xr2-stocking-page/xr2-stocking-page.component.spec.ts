import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2StockingPageComponent } from './xr2-stocking-page.component';

describe('Xr2StockingPageComponent', () => {
  let component: Xr2StockingPageComponent;
  let fixture: ComponentFixture<Xr2StockingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2StockingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2StockingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
