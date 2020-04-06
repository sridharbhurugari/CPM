import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTitleBottomMarginContainerComponent } from './header-title-bottom-margin-container.component';

describe('HeaderTitleBottomMarginContainerComponent', () => {
  let component: HeaderTitleBottomMarginContainerComponent;
  let fixture: ComponentFixture<HeaderTitleBottomMarginContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderTitleBottomMarginContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTitleBottomMarginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
