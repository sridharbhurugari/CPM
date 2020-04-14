import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistLinesComponent } from './underfilled-picklist-lines.component';
import { GridModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';

describe('UnderfilledPicklistLinesComponent', () => {
  let component: UnderfilledPicklistLinesComponent;
  let fixture: ComponentFixture<UnderfilledPicklistLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UnderfilledPicklistLinesComponent, 
        MockTranslatePipe, 
        MockColHeaderSortable
       ],
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