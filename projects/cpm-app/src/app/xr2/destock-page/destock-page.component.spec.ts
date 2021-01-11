import { EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { Component, Input, OnInit } from '@angular/core';
import { Observable,  of  } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap } from 'rxjs/operators';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { DestockService } from '../../api-xr2/services/destock.service';
import { nameof } from '../../shared/functions/nameof';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { DestockTypeInfo } from '../model/destock-type-info';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { DestockPageComponent } from './destock-page.component';
import { SvgiconComponent, SvgIconModule, ProgressAnimationComponent, ButtonActionModule, FooterModule, GridModule, LayoutModule, SearchModule } from '@omnicell/webcorecomponents';
import { MockDestockHeaderComponent } from '../../shared/testing/mock-destock-header-component.spec';
import { MockDestockTypeInfoComponent } from '../../shared/testing/mock-destock-typeinfo-component.spec';

describe('DestockPageComponent', () => {
  let component: DestockPageComponent ;
  let fixture: ComponentFixture<DestockPageComponent>;
  let translateService: Partial<TranslateService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let destockService: Partial<DestockService>;
  beforeEach(async(() => {
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService))
    };
    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };
    destockService = {
      get: jasmine.createSpy('get').and.returnValue(of(DestockService)),
      print: jasmine.createSpy('print').and.returnValue(of(DestockService))
    };

    TestBed.configureTestingModule({
      declarations: [ DestockPageComponent, MockDestockHeaderComponent, MockDestockTypeInfoComponent, ProgressAnimationComponent ],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: DestockService, useValue: destockService},
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

