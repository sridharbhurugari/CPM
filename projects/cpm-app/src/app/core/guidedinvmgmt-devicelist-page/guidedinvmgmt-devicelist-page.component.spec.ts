import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidedInvMgmtDevicelistPageComponent } from './guidedinvmgmt-devicelist-page.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { GridModule, FooterModule, LayoutModule, SvgIconModule, SearchModule } from '@omnicell/webcorecomponents';
import { SharedModule } from '../../shared/shared.module';

describe('GuidedinvmgmtDevicelistPageComponent', () => {
  let component: GuidedInvMgmtDevicelistPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtDevicelistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidedInvMgmtDevicelistPageComponent, MockTranslatePipe ],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule, SvgIconModule, SharedModule]
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
