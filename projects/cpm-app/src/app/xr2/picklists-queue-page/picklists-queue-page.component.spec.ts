import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { EventConnectionService } from '../services/event-connection.service';

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
  let eventConnectionService: Partial<EventConnectionService>;

  beforeEach(async(() => {
    picklistsQueueEventConnectionService = {
      addOrUpdatePicklistQueueItemSubject: new Subject(),
      removePicklistQueueItemSubject: new Subject(),
      reloadPicklistQueueItemsSubject: new Subject()
    };

    eventConnectionService = {
      receivedSubject: new Subject()
    };

    TestBed.configureTestingModule({
      declarations: [ PicklistsQueuePageComponent, PicklistsQueueComponent, MockTranslatePipe, MockSearchBox , MockSearchPipe, MockAppHeaderContainer ],
      imports: [ GridModule, ButtonActionModule, SingleselectDropdownModule, PopupDialogModule, FooterModule, LayoutModule, CoreModule ],
      providers: [
        { provide: PicklistsQueueService, useValue: { get: () => of([]) } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: { } },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: EventConnectionService, useValue: eventConnectionService }
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
});
