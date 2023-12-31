import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistsComponent } from './underfilled-picklists.component';
import { GridModule, PopupDialogService, PopupDialogComponent } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { WorkstationTrackerService } from '../../api-core/services/workstation-tracker.service';
import { IWorkstationNameData } from '../../api-core/data-contracts/i-workstation-name-data';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { WindowService } from '../../shared/services/window-service';
import { Router } from '@angular/router';
describe('UnderfilledPicklistsComponent', () => {
  let routerMock: Partial<Router> = { navigate : (c, n) => of<boolean>().toPromise() };
  let component: UnderfilledPicklistsComponent;
  let fixture: ComponentFixture<UnderfilledPicklistsComponent>;
  let event: IColHeaderSortChanged = {ColumnPropertyName:"OrderId",SortDirection:"asc"};
  let saveSucceededSpy = jasmine.createSpy('saveSucceeded').and.returnValue(of({}));
  const wpfActionControllerService: Partial<WpfActionControllerService> = { ExecuteContinueNavigationAction : () => {}};
  const workstationTrackerService: Partial<WorkstationTrackerService> = {
    Track : () => of([]),
    GetWorkstationName: () => of({WorkstationShortName: 'Wks001', WorkstationFriendlyName: 'Workstation 1'}),
    GetWorkstationNames : () => of([{WorkstationShortName: 'Wks001', WorkstationFriendlyName: 'Workstation 1'}])
  };
  const translateService: Partial<TranslateService> = { get : () => of() };
  const popupDialogService: Partial<PopupDialogService> = { showOnce: jasmine.createSpy('showOnce') };
  beforeEach(async(() => {
    spyOn(routerMock, 'navigate').and.returnValue(of<boolean>().toPromise());
    spyOn(workstationTrackerService, 'GetWorkstationNames').and.returnValue(of([{WorkstationShortName: 'Wks001', WorkstationFriendlyName: 'Workstation 1'}]));
    spyOn(translateService, 'get').and.returnValue(of(['']));
    TestBed.configureTestingModule({
      declarations: [
        UnderfilledPicklistsComponent,
        MockTranslatePipe,
        MockSearchBox,
        MockSearchPipe,
        MockColHeaderSortable,
        MockAppHeaderContainer
      ],
      providers: [
        { provide: WpfActionControllerService, useValue: { }},
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: WorkstationTrackerService, useValue: workstationTrackerService },
        { provide: WindowService, useValue: {} },
        { provide: TranslateService, useValue: translateService },
        { provide: Router, routerMock },
        { provide: Location, location },
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

  describe('navigate', () => {
    it('should call workstationTrackerService.GetWorkstationNames', () => {
      component.navigate('testorder');
      expect(workstationTrackerService.GetWorkstationNames).toHaveBeenCalled();
      expect(translateService.get).toHaveBeenCalled();
    });
  });
});
