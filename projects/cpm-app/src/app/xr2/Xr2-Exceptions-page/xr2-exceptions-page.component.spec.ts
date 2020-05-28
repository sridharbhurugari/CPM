import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Xr2ExceptionsPageComponent } from './xr2-exceptions-page.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { GridModule, FooterModule, LayoutModule, SvgIconModule, SearchModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { of, never } from 'rxjs';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { Xr2ExceptionsService } from '../../api-xr2/services/xr2-exceptions.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { Xr2ExceptionsItem } from '../model/xr2-exceptions-item';
//import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { map } from 'rxjs/operators';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';

describe('Xr2ExceptionsPageComponent', () => {
  let component: Xr2ExceptionsPageComponent;
  let fixture: ComponentFixture<Xr2ExceptionsPageComponent>;
  let event: IColHeaderSortChanged = {ColumnPropertyName:"TrayID",SortDirection:"asc"};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2ExceptionsPageComponent, MockTranslatePipe,
        MockColHeaderSortable, MockAppHeaderContainer, MockSearchPipe],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule,  ButtonActionModule],
      providers: [
        { provide: Xr2ExceptionsService, useValue: { get: () => of([]) } },
       ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2ExceptionsPageComponent);
    component = fixture.componentInstance;
    //component.sortOrder = "desc";
    event.ColumnPropertyName = "TrayID";
    event.SortDirection="asc";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('column selected ', () => {
    //component. = SortDirection.descending;
    component.displayExceptionsList$.source;
    component.displayExceptionsList$ = component.displayExceptionsList$.pipe(map(exceptions => {
      return this.sort(exceptions, "desc");
    }));
    expect(component.columnSelected(event));
  });
});
