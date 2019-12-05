import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidedInvMgmtDevicelistPageComponent } from './guidedinvmgmt-devicelist-page.component';

describe('GuidedinvmgmtDevicelistPageComponent', () => {
  let component: GuidedInvMgmtDevicelistPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtDevicelistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidedInvMgmtDevicelistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidedInvMgmtDevicelistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
