import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridModule } from '@omnicell/webcorecomponents';
import { PriorityCodePickRoutesComponent } from './priority-code-pick-routes.component';

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'translate'
})
class MockTranslatePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value + '_translated';
  }
}

describe('PriorityCodePickRoutesComponent', () => {
  let component: PriorityCodePickRoutesComponent;
  let fixture: ComponentFixture<PriorityCodePickRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityCodePickRoutesComponent, MockTranslatePipe ],
      imports: [ GridModule ]
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
