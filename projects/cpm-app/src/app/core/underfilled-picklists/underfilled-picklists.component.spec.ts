import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistsComponent } from './underfilled-picklists.component';
import { GridModule } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
describe('UnderfilledPicklistsComponent', () => {
  let component: UnderfilledPicklistsComponent;
  let fixture: ComponentFixture<UnderfilledPicklistsComponent>;
  let event: IColHeaderSortChanged = {ColumnPropertyName:"OrderId",SortDirection:"asc"};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UnderfilledPicklistsComponent,
        MockTranslatePipe,
        MockSearchBox,
        MockSearchPipe,
        MockColHeaderSortable,
        MockAppHeaderContainer,
      ],
      providers: [
        { provide: WpfActionControllerService, useVaule: { }}
      ],
      imports: [ GridModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderfilledPicklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('column selected ', () => {
    expect(component.columnSelected(event));
    component.picklists = component.picklists.map(exceptions => {
      return this.sort(exceptions, "ASC");
    });
  });
});
