import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnderfilledPicklistLinesComponent } from './underfilled-picklist-lines.component';
import { GridModule, FooterModule, LayoutModule, CheckboxModule, PopupWindowService, SvgiconComponent, SvgIconModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';

describe('UnderfilledPicklistLinesComponent', () => {
  let component: UnderfilledPicklistLinesComponent;
  let fixture: ComponentFixture<UnderfilledPicklistLinesComponent>;
  const event: IColHeaderSortChanged = {ColumnPropertyName: 'DescriptionSortValue', SortDirection: 'asc'};

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        UnderfilledPicklistLinesComponent,
        MockTranslatePipe,
        MockColHeaderSortable,
        MockCpClickableIconComponent
       ],
      imports: [ GridModule, FooterModule, LayoutModule, SvgIconModule, CheckboxModule]
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
  it('column selected ', () => {
    expect(component.columnSelected(event));
    component.picklistLines = component.picklistLines.map(exceptions => {
      return this.sort(exceptions, "ASC");
    });
  });
});
