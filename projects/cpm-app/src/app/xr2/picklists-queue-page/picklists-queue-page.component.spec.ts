import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistsQueuePageComponent } from './picklists-queue-page.component';
import { PicklistsQueueComponent } from './../picklists-queue/picklists-queue.component';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { Input, Component } from '@angular/core';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { ButtonActionModule, GridModule } from '@omnicell/webcorecomponents';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicklistsQueuePageComponent, PicklistsQueueComponent, MockTranslatePipe, MockSearchBox , MockSearchPipe],
      imports: [GridModule, ButtonActionModule],
      providers: [
        { provide: PicklistsQueueService, useValue: { get: () => of([]) } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: { } }
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
