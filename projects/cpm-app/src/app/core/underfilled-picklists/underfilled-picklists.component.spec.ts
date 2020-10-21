import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistsComponent } from './underfilled-picklists.component';
import { GridModule, PopupDialogService } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { WorkstationTrackerService } from '../../api-core/services/workstation-tracker.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { WindowService } from '../../shared/services/window-service';
describe('UnderfilledPicklistsComponent', () => {
  let component: UnderfilledPicklistsComponent;
  let fixture: ComponentFixture<UnderfilledPicklistsComponent>;
  let event: IColHeaderSortChanged = {ColumnPropertyName:"OrderId",SortDirection:"asc"};
  const workstationTrackerService: Partial<WorkstationTrackerService> = { GetWorkstationShortName : () => of(''), Track : () => of([]) };
  beforeEach(async(() => {
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
        { provide: PopupDialogService, useValue: { }},
        { provide: WorkstationTrackerService, useValue: workstationTrackerService },
        { provide: WindowService, useValue: {} },
        { provide: TranslateService, useValue: { get: () => of('') }}
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
