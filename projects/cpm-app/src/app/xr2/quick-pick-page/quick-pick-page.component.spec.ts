import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickPageComponent } from './quick-pick-page.component';

describe('QuickPickPageComponent', () => {
  let component: QuickPickPageComponent;
  let fixture: ComponentFixture<QuickPickPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
