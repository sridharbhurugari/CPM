import { EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap, takeUntil } from 'rxjs/operators';
import { UtilizationService } from '../../api-xr2/services/utilization.service';
import { nameof } from '../../shared/functions/nameof';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { UtilizationEventConnectionService } from '../services/utilization-event-connection.service';
import { UtilizationDataEvent } from '../model/utilization-data-event';
import { TranslateService } from '@ngx-translate/core';
import { ProgressAnimationComponent, FooterModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { MockUtilizationHeaderComponent } from '../../shared/testing/mock-utilization-header-component.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { UtilizationPageComponent } from './utilization-page.component';
import { WindowService } from '../../shared/services/window-service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { UnassignedMedicationInfo } from '../model/utilization-unassigned-medication-info';

describe('UtilizationPageComponent', () => {
  let component: UtilizationPageComponent ;
  let fixture: ComponentFixture<UtilizationPageComponent>;
  let translateService: Partial<TranslateService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let utilizationService: Partial<UtilizationService>;
  let utilizationEventConnectionService: Partial<UtilizationEventConnectionService>;

  beforeEach(async(() => {
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService))
    };
    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };
    utilizationService = {
      get: jasmine.createSpy('get').and.returnValue(of(UtilizationService)),
    };

    utilizationEventConnectionService = {
      UtilizationIncomingDataSubject: new Subject<UtilizationDataEvent>(),
      UtilizationIncomingDataErrorSubject: new Subject<any>(),
      ngUnsubscribe: new Subject()
    };

    TestBed.configureTestingModule({
      declarations: [ UtilizationPageComponent, MockUtilizationHeaderComponent, ProgressAnimationComponent, MockTranslatePipe ],
      imports: [ ButtonActionModule,
        FooterModule ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: UtilizationService, useValue: utilizationService},
        { provide: UtilizationEventConnectionService, useValue: utilizationEventConnectionService},
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() } },
        { provide: WindowService, useValue: { getHash: () => '' } }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Set NotAssigned', () => {

    beforeEach(() => {
      component.notAssignedLoaded = false;
    });

    it('Check Count and Sums', () => {
      let a1: UnassignedMedicationInfo = {
        ItemCode: 'a',
        PocketTypeId: 1,
        Inventory: 11
       };
       let b1: UnassignedMedicationInfo = {
        ItemCode: 'b',
        PocketTypeId: 1,
        Inventory: 21
       };
       let b2: UnassignedMedicationInfo = {
        ItemCode: 'b',
        PocketTypeId: 2,
        Inventory: 22
       };
      let data: UnassignedMedicationInfo[] = [ a1, b1, b2 ]
      component.notAssignedData = data;
      component.SetNotAssigned();

      expect(component.notAssignedItems==2);
      expect(component.notAssignedDoses==(11 + 21 + 22));
      expect(component.notAssignedLoaded);
    });
  });
});

