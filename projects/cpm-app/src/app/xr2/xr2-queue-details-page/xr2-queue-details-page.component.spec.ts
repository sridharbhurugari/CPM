import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Xr2QueueDetailsPageComponent } from './xr2-queue-details-page.component';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { Xr2QueueDetailsHeaderComponent } from '../xr2-queue-details-header/xr2-queue-details-header.component';
import { Xr2DetailsQueueComponent } from '../xr2-details-queue/xr2-details-queue.component';
import { Input, Component } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Xr2QueueButtonPanelComponent } from '../xr2-queue-button-panel/xr2-queue-button-panel.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { ButtonActionModule, CheckboxModule, GridModule, PopupDialogModule, PopupDialogService,
         SingleselectDropdownModule } from '@omnicell/webcorecomponents';
import { Location } from '@angular/common';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}


describe('Xr2QueueDetailsPageComponent', () => {
  let component: Xr2QueueDetailsPageComponent;
  let fixture: ComponentFixture<Xr2QueueDetailsPageComponent>;

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
      declarations: [ Xr2QueueDetailsPageComponent, Xr2QueueDetailsHeaderComponent, Xr2DetailsQueueComponent,
        Xr2QueueButtonPanelComponent, MockCpClickableIconComponent, MockSearchBox, MockTranslatePipe,
        MockColHeaderSortable, MockSearchPipe, MockCpDataLabelComponent],
      imports: [SingleselectDropdownModule, CheckboxModule, GridModule, ButtonActionModule, PopupDialogModule],
      providers: [
        { provide: PicklistsQueueService, useValue: picklistQueueService },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: { } },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
