import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickQueueViewComponent } from './quick-pick-queue-view.component';
import { GridModule, ButtonActionModule, SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, FooterModule, LayoutModule, PersistService } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { WindowService } from '../../shared/services/window-service';
import { SharedModule } from '../../shared/shared.module';


describe('QuickPickQueueViewComponent', () => {
  let component: QuickPickQueueViewComponent;
  let fixture: ComponentFixture<QuickPickQueueViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickQueueViewComponent, MockTranslatePipe, MockSearchPipe, MockAppHeaderContainer],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CoreModule, SharedModule],
      providers: [
        { provide: WindowService, useValue: []},
        { provide: PersistService, useValue: []},
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
