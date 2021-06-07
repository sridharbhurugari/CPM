import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { TranslateService } from '@ngx-translate/core';
import { PrepackVerificationService } from '../../api-core/services/prepack-verification.service';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { GridModule } from '@omnicell/webcorecomponents';
import { Router } from '@angular/router';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { WindowService } from '../../shared/services/window-service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SortDirection } from '../../shared/constants/sort-direction';
import { PrepackVerificationQueueItem } from '../model/prepack-verification-queue-item';
import { map } from 'rxjs/operators';

import { PrepackVerificationQueueComponent } from './prepack-verification-queue.component';
import { IPrepackVerificationQueueItem } from '../../api-core/data-contracts/i-prepack-verification-queue-item';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PrepackVerificationQueueComponent', () => {
  let routerMock: Partial<Router> = { navigate : (c, n) => of<boolean>().toPromise() };
  let event: IColHeaderSortChanged = {ColumnPropertyName:"OrderId",SortDirection:"asc"};
  let component: PrepackVerificationQueueComponent;
  let fixture: ComponentFixture<PrepackVerificationQueueComponent>;
  let translateService: Partial<TranslateService>;
  let prepackVerificationService: Partial<PrepackVerificationService>

  const verificationQueueItem1: IPrepackVerificationQueueItem = {
    PrepackVerificationQueueId: 1,
    ItemId: 'itemId',
    ItemDescription: 'ItemDescription',
    DeviceId: 1,
    DeviceDescription: 'deviceDescription',
    QuantityToPackage: 1,
    PackagedDate: new Date()
  } as IPrepackVerificationQueueItem;

  beforeEach(async(() => {

    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService))
    };
    prepackVerificationService = {
      getPrepackQueueData: jasmine.createSpy('getPrepackQueueData').and.returnValue(of([verificationQueueItem1])),
      deletePrepackQueueVerification: jasmine.createSpy('deletePrepackQueueVerification').and.returnValue(of(1))
    };

    TestBed.configureTestingModule({
      declarations: [
        PrepackVerificationQueueComponent,
        MockTranslatePipe,
        MockSearchBox,
        MockSearchPipe,
        MockCpClickableIconComponent,
        MockAppHeaderContainer,
        MockCpClickableIconComponent ],
        imports: [
          GridModule
        ],
        schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PrepackVerificationService, useValue: prepackVerificationService},
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() } },
        { provide: WindowService, useValue: { getHash: () => '' } },
        { provide: Router, routerMock },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepackVerificationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });

   it('on Delete calls loadPrepackVerificationQueueItems', () => {
   //prepackVerificationService.deletePrepackQueueVerification( return of())
   // called once: loadPrepackVerificationQueueItems
   const spy = spyOn<any>(component, 'loadPrepackVerificationQueueItems');
   component.onDeleteClick(verificationQueueItem1);
   expect(component['loadPrepackVerificationQueueItems']).toHaveBeenCalled();
   expect(spy).toHaveBeenCalled();
   });

  //  it('should sort on Destination ID', () => {
  //   const item1 = new PrepackVerificationQueueItem(null);
  //   const item2 = new PrepackVerificationQueueItem(null);
  //   const item3 = new PrepackVerificationQueueItem(null);

  //   item1.ItemDescription = 'A1';
  //   item2.ItemDescription = 'a2';
  //   item3.ItemDescription = 'A3';

  //   item1.ItemId = 'A1';
  //   item2.ItemId = 'a2';
  //   item3.ItemId = 'A3';

  //   component.filteredPrepackVerificationQueueItems = [item3, item2, item1 ];
  //   const mockSortEvent = {} as IColHeaderSortChanged;
  //   const expectedSortOrder = SortDirection.ascending;
  //   const expectedColumnName = 'ItemDescription';

  //   mockSortEvent.SortDirection = expectedSortOrder;
  //   mockSortEvent.ColumnPropertyName = expectedColumnName;

  //   //component.columnSelected(mockSortEvent);

  //   expect(component.currentSortPropertyName).toBe(expectedColumnName);
  //   expect(component.columnSortDirection).toBe(expectedSortOrder);
  //   expect(component.filteredPrepackVerificationQueueItems[0].ItemDescription).toBe('A1');
  //   expect(component.filteredPrepackVerificationQueueItems[1].ItemDescription).toBe('a2');
  //   expect(component.filteredPrepackVerificationQueueItems[2].ItemDescription).toBe('A3');
  // });

});
