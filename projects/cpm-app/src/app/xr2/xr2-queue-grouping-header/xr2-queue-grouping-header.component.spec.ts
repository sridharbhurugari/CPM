import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleselectDropdownModule } from '@omnicell/webcorecomponents';

import { Xr2QueueGroupingHeaderComponent } from './xr2-queue-grouping-header.component';
import { Input, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('Xr2QueueGroupingHeaderComponent', () => {
  let component: Xr2QueueGroupingHeaderComponent;
  let fixture: ComponentFixture<Xr2QueueGroupingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2QueueGroupingHeaderComponent, MockSearchBox, MockSearchPipe, MockTranslatePipe],
      providers: [ SingleselectDropdownModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueGroupingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
