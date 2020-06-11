import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridModule, ButtonActionModule, SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, FooterModule, LayoutModule, PersistService } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { QuickPickPageComponent } from './quick-pick-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { Xr2QuickPickQueueDeviceService } from '../../api-xr2/services/xr2-quick-pick-queue-device.service';
import { WindowService } from '../../shared/services/window-service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';

@Component({
  selector: 'oc-search-box',
  template: ''
})
class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('QuickPickPageComponent', () => {
  let component: QuickPickPageComponent;
  let fixture: ComponentFixture<QuickPickPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickPageComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox, MockAppHeaderContainer ],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CoreModule],
      providers: [
        { provide: Xr2QuickPickQueueService, useValue: []},
        { provide: Xr2QuickPickQueueDeviceService, useValue: []},
        { provide: WindowService, useValue: []},
        { provide: OcapHttpConfigurationService, useValue: []},
      ]
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
