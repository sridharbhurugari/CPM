import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickDrawerDetailsViewComponent } from './quick-pick-drawer-details-view.component';

describe('QuickPickDrawerDetailsViewComponent', () => {
  let component: QuickPickDrawerDetailsViewComponent;
  let fixture: ComponentFixture<QuickPickDrawerDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickDrawerDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickDrawerDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
