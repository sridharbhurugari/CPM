import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidedinvmgmtManualcyclecountPageComponent } from './guidedinvmgmt-manualcyclecount-page.component';

describe('GuidedinvmgmtManualcyclecountPageComponent', () => {
  let component: GuidedinvmgmtManualcyclecountPageComponent;
  let fixture: ComponentFixture<GuidedinvmgmtManualcyclecountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidedinvmgmtManualcyclecountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidedinvmgmtManualcyclecountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
