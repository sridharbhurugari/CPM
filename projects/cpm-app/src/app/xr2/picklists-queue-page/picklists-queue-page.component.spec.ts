import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PicklistsQueuePageComponent } from './picklists-queue-page.component';
import { PicklistsQueueComponent } from './../picklists-queue/picklists-queue.component';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { Subject, of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { Input, Component } from '@angular/core';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { ButtonActionModule, SingleselectDropdownModule, GridModule, PopupDialogService, PopupDialogModule,
  FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { CoreModule } from '../../core/core.module';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { IQuickPickQueueItem } from '../../api-xr2/data-contracts/i-quick-pick-queue-item';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('PicklistsQueuePageComponent', () => {
  let component: PicklistsQueuePageComponent;
  let fixture: ComponentFixture<PicklistsQueuePageComponent>;
  let picklistsQueueEventConnectionService: Partial<PicklistsQueueEventConnectionService>;
  let picklistQueueService: Partial<PicklistsQueueService>;
  let spyPicklistQueueServiceGet: jasmine.Spy;


  beforeEach(async(() => {
    picklistsQueueEventConnectionService = {
      addOrUpdatePicklistQueueItemSubject: new Subject(),
      removePicklistQueueItemSubject: new Subject(),
      reloadPicklistQueueItemsSubject: new Subject()
    };

    picklistQueueService = {
      get: () => of()
    };

    spyOn(picklistsQueueEventConnectionService.reloadPicklistQueueItemsSubject, 'subscribe').and.callThrough();
    spyPicklistQueueServiceGet = spyOn(picklistQueueService, 'get').and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [ PicklistsQueuePageComponent, PicklistsQueueComponent, MockTranslatePipe, MockSearchBox,
         MockSearchPipe, MockAppHeaderContainer ],
      imports: [ GridModule, ButtonActionModule, SingleselectDropdownModule, PopupDialogModule, FooterModule, LayoutModule, CoreModule ],
      providers: [
        { provide: PicklistsQueueService, useValue: picklistQueueService },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: { } },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: TranslateService, useValue: { get: () => of([]) } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistsQueuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('should call picklistQueueService', fakeAsync(() => {
    const spy = picklistQueueService.get;
    component.ngOnInit();
    tick();
    expect(spyPicklistQueueServiceGet).toHaveBeenCalled();
  }));

  it('should subscribe to events', () => {
    expect(component).toBeTruthy();
    expect(picklistsQueueEventConnectionService.reloadPicklistQueueItemsSubject.subscribe).toHaveBeenCalled();
  });

  it('should reload on reloadPicklistQueueItemsSubject event', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(spyPicklistQueueServiceGet).toHaveBeenCalled();
    const currentCallCount = spyPicklistQueueServiceGet.calls.count();
    picklistsQueueEventConnectionService.reloadPicklistQueueItemsSubject.next();
    tick();
    expect(spyPicklistQueueServiceGet.calls.count()).toBeGreaterThan(currentCallCount);
  }));
});
