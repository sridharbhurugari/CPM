import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Xr2QueueGroupingPageComponent } from './xr2-queue-grouping-page.component';
import { Xr2QueueGroupingHeaderComponent } from '../xr2-queue-grouping-header/xr2-queue-grouping-header.component';
import { Xr2GroupingQueueComponent } from '../xr2-grouping-queue/xr2-grouping-queue.component';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { Subject, of, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { Input, Component } from '@angular/core';
import { ButtonActionModule, SingleselectDropdownModule, GridModule, PopupDialogService, PopupDialogModule,
         FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { DevicesService } from '../../api-core/services/devices.service';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('Xr2QueueGroupingPageComponent', () => {
  let component: Xr2QueueGroupingPageComponent;
  let fixture: ComponentFixture<Xr2QueueGroupingPageComponent>;
  let picklistsQueueEventConnectionService: Partial<PicklistsQueueEventConnectionService>;
  let picklistQueueService: Partial<PicklistsQueueService>;
  let devicesService: Partial<DevicesService>;
  let spyPicklistQueueServiceGetGrouped: jasmine.Spy;


  beforeEach(async(() => {
    picklistsQueueEventConnectionService = {
      addOrUpdatePicklistQueueItemSubject: new Subject(),
      removePicklistQueueItemSubject: new Subject(),
      reloadPicklistQueueItemsSubject: new Subject()
    };

    picklistQueueService = {
      getGrouped: () => of()
    };

    devicesService = {
      getAllXr2Devices: () => of()
    };

    spyOn(picklistsQueueEventConnectionService.reloadPicklistQueueItemsSubject, 'subscribe').and.callThrough();
    spyPicklistQueueServiceGetGrouped = spyOn(picklistQueueService, 'getGrouped').and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [ Xr2QueueGroupingPageComponent, Xr2GroupingQueueComponent,
        Xr2QueueGroupingHeaderComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox,
        MockAppHeaderContainer, MockColHeaderSortable, MockCpClickableIconComponent, MockCpDataLabelComponent ],
      imports: [ GridModule, ButtonActionModule, SingleselectDropdownModule, PopupDialogModule, FooterModule, LayoutModule ],
      providers: [
        { provide: PicklistsQueueService, useValue: picklistQueueService },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: { } },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: DevicesService, useValue: devicesService},
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueGroupingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  describe('Services', () => {
    it('should call picklistQueueService', fakeAsync(() => {
      component.ngOnInit();
      tick();
      expect(spyPicklistQueueServiceGetGrouped).toHaveBeenCalled();
    }));
  });

  describe('Eventing', () => {
    it('should subscribe to events', () => {
      expect(component).toBeTruthy();
      expect(picklistsQueueEventConnectionService.reloadPicklistQueueItemsSubject.subscribe).toHaveBeenCalled();
    });

    it('should reload on reloadPicklistQueueItemsSubject event', fakeAsync(() => {
      component.ngOnInit();
      tick();
      expect(spyPicklistQueueServiceGetGrouped).toHaveBeenCalled();
      const currentCallCount = spyPicklistQueueServiceGetGrouped.calls.count();
      picklistsQueueEventConnectionService.reloadPicklistQueueItemsSubject.next();
      tick();
      expect(spyPicklistQueueServiceGetGrouped.calls.count()).toBeGreaterThan(currentCallCount);
    }));

    fit('should update search filter text on search filter event', () => {
      const filter = 'filter';

      component.onSearchTextFilter(filter);

      expect(component.searchTextFilter).toBe(filter);
    });
  });
});
