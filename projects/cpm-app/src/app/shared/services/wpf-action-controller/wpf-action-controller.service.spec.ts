import { TestBed } from '@angular/core/testing';
import { Location, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { WpfActionControllerService } from './wpf-action-controller.service';
import { WindowService } from '../window-service';

describe('WpfActionControllerService', () => {
  var router, location, actionController, windowService;
  var service: WpfActionControllerService;
  beforeEach(() => {
    router = { navigate: () => { } };
    spyOn(router, 'navigate');
    location = { back: () => { } };
    spyOn(location, 'back');
    actionController = {
      executeBackAction: () => { },
      executeContinueAction: () => { },
      executeContinueNavigationAction: () => { }
    };
    spyOn(actionController, 'executeBackAction')
    spyOn(actionController, 'executeContinueAction')
    spyOn(actionController, 'executeContinueNavigationAction')
    windowService = { nativeWindow: {} };
  });

  describe('with actioncontroller set on window', () => {
    beforeEach(() => {
      windowService.nativeWindow.actionController = actionController;
      TestBed.configureTestingModule({
        imports: [
          CommonModule
        ],
        providers: [
          { provide: Location, useValue: location },
          { provide: Router, useValue: router },
          { provide: WindowService, useValue: windowService },
        ]
      });
      service = TestBed.get(WpfActionControllerService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('ExecuteBackAction', () => {
      it('should call actionController.executeBackAction', () => {
        service.ExecuteBackAction();
        expect(actionController.executeBackAction).toHaveBeenCalled();
      })
    })

    describe('ExecuteContinueNavigationAction', () => {
      const path = 'somepath';
      describe('given query params', () => {
        const queryKey1 = 'check';
        const queryKey2 = 'id';
        const queryParams = {}
        beforeEach(() => {
          queryParams[queryKey1] = 'someValue';
          queryParams[queryKey2] = 'someId';
        });

        it('should call actionController.executeContinueNavigationAction with query string', () => {
          service.ExecuteContinueNavigationAction(path, queryParams);
          expect(actionController.executeContinueNavigationAction).toHaveBeenCalledWith(jasmine.stringMatching(`${queryKey1}=${queryParams[queryKey1]}`));
          expect(actionController.executeContinueNavigationAction).toHaveBeenCalledWith(jasmine.stringMatching(`${queryKey2}=${queryParams[queryKey2]}`));
        })
      })

      describe('given no query params', () => {
        it('should call actionController.executeContinueNavigationAction', () => {
          service.ExecuteContinueNavigationAction(path);
          expect(actionController.executeContinueNavigationAction).toHaveBeenCalledWith(path);
        })
      })
    })
  });

  describe('without actioncontroller set on window', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule
        ],
        providers: [
          { provide: Location, useValue: location },
          { provide: Router, useValue: router },
          { provide: WindowService, useValue: windowService },
        ]
      });
      service = TestBed.get(WpfActionControllerService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('ExecuteBackAction', () => {
      it('should call location.back', () => {
        service.ExecuteBackAction();
        expect(location.back).toHaveBeenCalled();
      })
    })

    describe('ExecuteContinueNavigationAction', () => {
      const path = 'somepath';
      describe('given query params', () => {
        const queryKey1 = 'check';
        const queryKey2 = 'id';
        const queryParams = {}
        beforeEach(() => {
          queryParams[queryKey1] = 'someValue';
          queryParams[queryKey2] = 'someId';
        });

        it('should call router.navigate with query params', () => {
          const expectedNavigateOptions = { queryParams: jasmine.objectContaining(queryParams), preserveQueryParams: false };
          service.ExecuteContinueNavigationAction(path, queryParams);
          expect(router.navigate).toHaveBeenCalledWith([path], jasmine.objectContaining(expectedNavigateOptions));
        })
      })

      describe('given no query params', () => {
        it('should call router.navigate', () => {
          service.ExecuteContinueNavigationAction(path);
          expect(router.navigate).toHaveBeenCalledWith([path], jasmine.objectContaining({ preserveQueryParams: false }));
        })
      })
    });
  });
});
