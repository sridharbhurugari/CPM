import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistLinesComponent } from './underfilled-picklist-lines.component';
import { Pipe, PipeTransform } from '@angular/core';
import { GridModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';

@Pipe({
  name: 'translate'
})
class MockTranslatePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value + '_translated';
  }
}

describe('UnderfilledPicklistLinesComponent', () => {
  let component: UnderfilledPicklistLinesComponent;
  let fixture: ComponentFixture<UnderfilledPicklistLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderfilledPicklistLinesComponent, MockTranslatePipe ],
      imports: [ GridModule, FooterModule, LayoutModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderfilledPicklistLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
