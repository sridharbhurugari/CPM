import { NO_ERRORS_SCHEMA } from '@angular/core';
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
import { Router } from '@angular/router';
import { DestockPageComponent } from './destock-page.component';


describe('DestockPageComponent', () => {
  let component: DestockPageComponent ;
  let fixture: ComponentFixture<DestockPageComponent>;
  let translateService: Partial<TranslateService>;
  let xr2QueueNavigationParameters: IXr2QueueNavigationParameters;
  let router: Partial<Router>;

  beforeEach(async(() => {
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService))
    };

    TestBed.configureTestingModule({
      declarations: [ DestockPageComponent],
      imports: [],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
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

