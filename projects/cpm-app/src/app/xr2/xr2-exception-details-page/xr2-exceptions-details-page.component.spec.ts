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
import { map } from 'rxjs/operators';
import {Location} from '@angular/common';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { Xr2ExceptionDetailsService } from '../../api-xr2/services/xr2-exceptiondetails.service';
import { IXr2ExceptionsItem } from '../../api-xr2/data-contracts/i-xr2-exception-item';

describe('Xr2ExceptionDetailsPageComponent', () => {
  let component: Xr2ExceptionDetailsPageComponent;
  let fixture: ComponentFixture<Xr2ExceptionDetailsPageComponent>;
  const event: IColHeaderSortChanged = {ColumnPropertyName: 'Reason', SortDirection: 'asc'};
  let router: Partial<Router>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  // let selectedItem: IXr2ExceptionsItem = {
  //  TrayID: 'c00003',
  //  DeviceID: '7',
  //  CompletedDateTime: '2020-06-01 07:41:19.763',
  //  DeviceName: '',
  //  ExceptionPockets: '',
  //  TrayDescription: ''
  // };

  beforeEach(async(() => {
    wpfActionControllerService = {ExecuteBackAction: jasmine.createSpy('ExecuteBackAction')};
    // component.selectedItem = new Xr2ExceptionsItem(selectedItem);
    // component.trayID = 'c00003';
    // component.trayType = 'Oral Solid';
    // component.deviceName = 'XR2 dev1';
    // component.completedDate = '2020-06-01 07:41:19.763';
    router = {navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      declarations: [ Xr2ExceptionDetailsPageComponent, MockTranslatePipe,
        MockColHeaderSortable, MockAppHeaderContainer],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule, ButtonActionModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: Xr2ExceptionDetailsService, useValue: { get: (item: IXr2ExceptionsItem) => of([]) } },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: Router, useValue: router },
        { provide: WpfActionControllerService, useValue: wpfActionControllerService },
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

  describe('navigateBack', () => {
    it('makes expected calls', () => {
      component.navigateBack();
      expect(wpfActionControllerService.ExecuteBackAction).toHaveBeenCalled();
    });
  });

  describe("Should show tray type as unknown ", () => {
    it("tray value be null", () => {
     component.getTrayTypeDisplay()
    });
  });
  
});
