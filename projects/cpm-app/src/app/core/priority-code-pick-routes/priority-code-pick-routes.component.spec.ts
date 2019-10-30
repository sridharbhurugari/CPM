import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridModule, SearchModule, InputsModule, SearchBoxComponent } from '@omnicell/webcorecomponents';
import { PriorityCodePickRoutesComponent } from './priority-code-pick-routes.component';

import { Pipe, PipeTransform, Component, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
@Pipe({
  name: 'translate'
})
class MockTranslatePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value + '_translated';
  }
}

@Pipe({ name: 'searchPipe' })
class MockSearchPipe implements PipeTransform {
  transform(allSearchData: any[], ...args: any[]) {
    return allSearchData;
  }
}

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
