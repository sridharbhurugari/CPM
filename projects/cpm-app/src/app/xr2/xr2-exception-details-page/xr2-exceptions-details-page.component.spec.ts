import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Xr2ExceptionDetailsPageComponent } from './xr2-exceptions-details-page.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { GridModule, FooterModule, LayoutModule, SvgIconModule, SearchModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { of, never } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { Xr2ExceptionsService } from '../../api-xr2/services/xr2-exceptions.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { Xr2ExceptionsItem } from '../model/xr2-exceptions-item';
import { ActivatedRoute, Router, Params, NavigationExtras, RouterModule } from '@angular/router';
//import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { map } from 'rxjs/operators';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { Xr2ExceptionDetailsService } from '../../api-xr2/services/xr2-exceptiondetails.service';
import { IXr2ExceptionsItem } from '../../api-xr2/data-contracts/i-xr2-exception-item';

describe('Xr2ExceptionDetailsPageComponent', () => {
  let component: Xr2ExceptionDetailsPageComponent;
  let fixture: ComponentFixture<Xr2ExceptionDetailsPageComponent>;
  let event: IColHeaderSortChanged = {ColumnPropertyName:"Reason",SortDirection:"asc"};
  let router: Partial<Router>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  beforeEach(async(() => {
    wpfActionControllerService = {ExecuteBackAction: jasmine.createSpy('ExecuteBackAction')};
    router = {navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      declarations: [ Xr2ExceptionDetailsPageComponent, MockTranslatePipe,
        MockColHeaderSortable, MockAppHeaderContainer],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule,  ButtonActionModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: Xr2ExceptionDetailsService, useValue: { get: (item:IXr2ExceptionsItem) => of([]) } },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: Router, useValue: router }
       ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2ExceptionDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('column selected ', () => {
    component.displayExceptionDetailList$.source;
    component.displayExceptionDetailList$ = component.displayExceptionDetailList$.pipe(map(exceptions => {
        return this.sort(exceptions, "desc");
    }));
    expect(component.columnSelected(event));
  });

  describe('navigateBack', () => {
    it('makes expected calls', () => {
      component.navigateBack();
      expect(wpfActionControllerService.ExecuteBackAction).toHaveBeenCalled();
    });
  });
});
