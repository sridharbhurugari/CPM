import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickDrawerViewComponent } from './quick-pick-drawer-view.component';

describe('QuickPickDrawerViewComponent', () => {
  let component: QuickPickDrawerViewComponent;
  let fixture: ComponentFixture<QuickPickDrawerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickDrawerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickDrawerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
