import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickDrawerComponent } from './quick-pick-drawer.component';

describe('QuickPickDrawerComponent', () => {
  let component: QuickPickDrawerComponent;
  let fixture: ComponentFixture<QuickPickDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
