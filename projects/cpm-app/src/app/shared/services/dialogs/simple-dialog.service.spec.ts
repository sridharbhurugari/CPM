import { TestBed } from '@angular/core/testing';

import { SimpleDialogService } from './simple-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { PopupDialogService, PopupDialogProperties } from '@omnicell/webcorecomponents';

describe('SimpleDialogService', () => {
  const translatedValue: string = 'someMsg';
  let popupDialogService: Partial<PopupDialogService>;
  let service: SimpleDialogService;

  beforeEach(() => {
    popupDialogService = {
      showOnce: jasmine.createSpy('showOnce')
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: { get: () => of(translatedValue) } },
        { provide: PopupDialogService, useValue: popupDialogService },
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
