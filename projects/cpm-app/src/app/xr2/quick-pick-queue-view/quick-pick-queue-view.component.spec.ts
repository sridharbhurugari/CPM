import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickQueueViewComponent } from './quick-pick-queue-view.component';
import { GridModule, ButtonActionModule, SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, FooterModule, LayoutModule, PersistService, SvgIconModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoreModule } from '../../core/core.module';
import { WindowService } from '../../shared/services/window-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';

describe('QuickPickQueueViewComponent', () => {
  let component: QuickPickQueueViewComponent;
  let fixture: ComponentFixture<QuickPickQueueViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickQueueViewComponent, MockTranslatePipe, MockSearchPipe, MockAppHeaderContainer ],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CoreModule, SvgIconModule],
      providers: [
        { provide: WindowService, useValue: []},
        { provide: WpfActionControllerService, useValue: []},
        { provide: PersistService, useValue: []},
        { provide: Xr2QuickPickQueueService, useValue: []},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickQueueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
