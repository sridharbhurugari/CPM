import { TestBed } from '@angular/core/testing';

import { SimpleDialogService } from './simple-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { PopupDialogService, PopupDialogProperties } from '@omnicell/webcorecomponents';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../ocap-url-builder.service';
import { OcapHttpHeadersService } from '../ocap-http-headers.service';
import { SystemConfigurationService } from '../system-configuration.service';
import { IConfigurationValue } from '../../interfaces/i-configuration-value';

describe('SimpleDialogService', () => {
  const translatedValue: string = 'someMsg';
  let popupDialogService: Partial<PopupDialogService>;
  let systemConfigurationService: Partial<SystemConfigurationService>
  let service: SimpleDialogService;

  beforeEach(() => {
    popupDialogService = {
      showOnce: jasmine.createSpy('showOnce')
    };
    systemConfigurationService = { GetConfigurationValues: () => of({} as IConfigurationValue) };
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { get: () => {}} },
        { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
        { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
        { provide: TranslateService, useValue: { get: () => of(translatedValue) } },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: SystemConfigurationService, useValue: systemConfigurationService}
      ]
    })
    service = TestBed.get(SimpleDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('displayErrorOk', () => {
    it('should call popupDialogservice with translated values', () =>{
      let expectedProps: Partial<PopupDialogProperties> = { titleElementText: translatedValue, messageElementText: translatedValue };
      service.displayErrorOk('key1', 'key2');
      expect(popupDialogService.showOnce).toHaveBeenCalledWith(jasmine.objectContaining(expectedProps))
    });
  })

  describe('displayWarningOk', () => {
    it('should call popupDialogservice with translated values', () =>{
      let expectedProps: Partial<PopupDialogProperties> = { titleElementText: translatedValue, messageElementText: translatedValue };
      service.displayWarningOk('key1', 'key2');
      expect(popupDialogService.showOnce).toHaveBeenCalledWith(jasmine.objectContaining(expectedProps))
    });
  })

  describe('displayInfoOk', () => {
    it('should call popupDialogservice with translated values', () =>{
      let expectedProps: Partial<PopupDialogProperties> = { titleElementText: translatedValue, messageElementText: translatedValue };
      service.displayInfoOk('key1', 'key2');
      expect(popupDialogService.showOnce).toHaveBeenCalledWith(jasmine.objectContaining(expectedProps))
    });
  })

  describe('displayInfoYesNo', () => {
    it('should call popupDialogservice with translated values', () =>{
      let expectedProps: Partial<PopupDialogProperties> = { titleElementText: translatedValue, messageElementText: translatedValue };
      service.displayInfoYesNo('key1', 'key2');
      expect(popupDialogService.showOnce).toHaveBeenCalledWith(jasmine.objectContaining(expectedProps))
    });
  })
});
