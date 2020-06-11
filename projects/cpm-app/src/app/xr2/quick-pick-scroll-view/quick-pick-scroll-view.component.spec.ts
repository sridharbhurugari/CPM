import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickScrollViewComponent } from './quick-pick-scroll-view.component';

describe('QuickPickScrollViewComponent', () => {
  let component: QuickPickScrollViewComponent;
  let fixture: ComponentFixture<QuickPickScrollViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickScrollViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickScrollViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
