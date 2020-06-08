import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistsQueueComponent } from './picklists-queue.component';
import { GridModule, ButtonActionModule,  SingleselectDropdownModule, SingleselectRowItem, PopupWindowModule, PopupDialogService,
  PopupDialogModule,
  FooterModule,
  LayoutModule} from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { Subject, Observable, of } from 'rxjs';
import { Input, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from 'selenium-webdriver/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { CoreModule } from '../../core/core.module';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { WindowService } from '../../shared/services/window-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('PicklistsQueueComponent', () => {
  let component: PicklistsQueueComponent;
  let fixture: ComponentFixture<PicklistsQueueComponent>;
  let picklistsQueueEventConnectionService: Partial<PicklistsQueueEventConnectionService>;
  let eventConnectionService: Partial<EventConnectionService>;
  let picklistsQueueService: Partial<PicklistsQueueService>;

  beforeEach(async(() => {
    picklistsQueueEventConnectionService = {
      addOrUpdatePicklistQueueItemSubject: new Subject(),
      removePicklistQueueItemSubject: new Subject()
    };
    picklistsQueueService = {
      reroute: jasmine.createSpy('reroute').and.returnValue(of(picklistsQueueService))
    };

    TestBed.configureTestingModule({
      declarations: [ PicklistsQueueComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox, MockAppHeaderContainer ],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CoreModule],
      providers: [
        { provide: WpfActionControllerService, useValue: jasmine.createSpyObj('WpfActionControllerService', ['ExecuteContinueAction']) },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: HttpClient, useValue: { get: () => {}} },
        { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
        { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: ActivatedRoute, useValue: { actr: () => { }} },
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
        { provide: PicklistsQueueService, useValue: picklistsQueueService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject, 'subscribe');
    spyOn(picklistsQueueEventConnectionService.removePicklistQueueItemSubject, 'subscribe');
    fixture = TestBed.createComponent(PicklistsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('reroute', () => {
    it('should call picklistsQueueService.reroute', () => {
      var picklistQueueItem = new PicklistQueueItem({
        AvailableOutputDeviceList: [],
        BoxCount: 0,
        Destination: '',
        DestinationId: '',
        DestinationType: '',
        DeviceDescription: '',
        DeviceId: 1,
        DeviceLocationId: 2,
        FilledBoxCount: 3,
        ItemCount: 4,
        ItemPicklistLines: [{
          DestinationId: '',
          ItemId: '',
          PickLocationDescription: '',
          PickLocationDeviceLocationId: 6,
          Qty: 7,
          PicklistLineId:'0E15A44C-49CB-4676-8774-007D2FBC4791'}],
        OrderId: '',
        OutputDeviceId: '',
        PicklistId: '',
        PriorityCode: '',
        PriorityCodeColor: '',
        PriorityCodeDescription: '',
        Status: 5,
        StatusDisplay: ''
            });
      component.reroute(picklistQueueItem);
      expect(picklistsQueueService.reroute).toHaveBeenCalled();
      })
    });

  describe('Connect to Events', () => {
    it('Connects to events on creation', () => {
      expect(component).toBeTruthy();
      expect(picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject.subscribe).toHaveBeenCalled();
      expect(picklistsQueueEventConnectionService.removePicklistQueueItemSubject.subscribe).toHaveBeenCalled();
    });
  });
});
