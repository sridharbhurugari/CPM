import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidedInvMgmtCycleCountPageComponent } from './guidedinvmgmt-cyclecount-page.component';

describe('GuidedInvMgmtCycleCountPageComponent', () => {
  let component: GuidedInvMgmtCycleCountPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtCycleCountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidedInvMgmtCycleCountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidedInvMgmtCycleCountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
