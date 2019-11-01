import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridModule, SearchModule, InputsModule, SearchBoxComponent } from '@omnicell/webcorecomponents';
import { PriorityCodePickRoutesComponent } from './priority-code-pick-routes.component';

import { Component, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';

@Component({
  selector: 'oc-search-box',
  template: ''
})
class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('PriorityCodePickRoutesComponent', () => {
  let component: PriorityCodePickRoutesComponent;
  let fixture: ComponentFixture<PriorityCodePickRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityCodePickRoutesComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox ],
      imports: [ 
        GridModule,
      ]
    })
    .overrideComponent(SearchBoxComponent,
    {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityCodePickRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
