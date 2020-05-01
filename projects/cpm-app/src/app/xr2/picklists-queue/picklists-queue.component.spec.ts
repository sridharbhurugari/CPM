import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistsQueueComponent } from './picklists-queue.component';
import { GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogService, PopupDialogModule,
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

  beforeEach(async(() => {

    picklistsQueueEventConnectionService = {
      openEventConnection: jasmine.createSpy('openEventConnection'),
      addOrUpdatePicklistQueueItemSubject: new Subject(),
      removePicklistQueueItemSubject: new Subject()
    };

    TestBed.configureTestingModule({
      declarations: [ PicklistsQueueComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox, MockAppHeaderContainer ],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule, FooterModule, LayoutModule, CoreModule],
      providers: [
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: HttpClient, useValue: { get: () => {}} },
        { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
        { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: ActivatedRoute, useValue: { actr: () => { }} },
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Connect to Events', () => {
    it('Connects to events on creation', () => {
      expect(component).toBeTruthy();
      expect(picklistsQueueEventConnectionService.openEventConnection).toHaveBeenCalled();
    });
  });

  describe('Output Device Selection', () => {
    it('should return quick pick device ID', () => {
      const expectedQuickPickDeviceID = 100;
      const mockPicklistQueueItem = new PicklistQueueItem(null);
      mockPicklistQueueItem.OutputDevice = 'QUICKPICK';

      const activeRow = component.getActiveDeviceRow(mockPicklistQueueItem);
      expect(component.outputDeviceMap[activeRow.value]).toBe(expectedQuickPickDeviceID);
    });

    it('should return cart device ID', () => {
      const expectedCartDeviceID = 200;
      const mockPicklistQueueItem = new PicklistQueueItem(null);
      mockPicklistQueueItem.OutputDevice = 'CART';

      const activeRow = component.getActiveDeviceRow(mockPicklistQueueItem);
      expect(component.outputDeviceMap[activeRow.value]).toBe(expectedCartDeviceID);
    });

    it('should return auto packager device ID', () => {
      const expectedAutoPackagerDeviceID = 300;
      const mockPicklistQueueItem = new PicklistQueueItem(null);
      mockPicklistQueueItem.OutputDevice = 'AUTOPACKAGER';

      const activeRow = component.getActiveDeviceRow(mockPicklistQueueItem);
      expect(component.outputDeviceMap[activeRow.value]).toBe(expectedAutoPackagerDeviceID);
    });
  });


});
