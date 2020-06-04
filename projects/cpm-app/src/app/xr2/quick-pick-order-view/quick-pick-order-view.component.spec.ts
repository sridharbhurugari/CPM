import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickOrderViewComponent } from './quick-pick-order-view.component';

describe('QuickPickOrderViewComponent', () => {
  let component: QuickPickOrderViewComponent;
  let fixture: ComponentFixture<QuickPickOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
