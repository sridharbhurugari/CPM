import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnderfilledPicklistLinesComponent } from './underfilled-picklist-lines.component';
import { GridModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';

describe('UnderfilledPicklistLinesComponent', () => {
  let component: UnderfilledPicklistLinesComponent;
  let fixture: ComponentFixture<UnderfilledPicklistLinesComponent>;
  let event: IColHeaderSortChanged = {ColumnPropertyName: "DescriptionSortValue", SortDirection: "asc"};

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
  // it('column selected ', () => {
  //   expect(component.columnSelected(event));
  //   component.picklistLines = component.picklistLines.map(exceptions => {
  //     return this.sort(exceptions, "ASC");
  //   });
  // });
});
