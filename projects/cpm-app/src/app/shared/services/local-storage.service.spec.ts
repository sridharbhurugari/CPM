import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { WindowService } from './window-service';

describe('LocalStorageService', () => {
  var localStorage: Storage;
  var service: LocalStorageService;
  beforeEach(() => {
    localStorage = {
      clear: () => {},
      getItem: () => '',
      key: () => '',
      removeItem: () => {},
      setItemObject: () => {},
      setItem: () => {},
      length: 5,
      name: 'localStorage'
    };
    spyOn(localStorage, 'clear');
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'key');
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'setItemObject');
    spyOn(localStorage, 'setItem');
  });

  describe('given window', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: WindowService, useValue: { nativeWindow: { localStorage: localStorage } } }
        ]
      });
      service = TestBed.get(LocalStorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('clear', () => {
      it('should call window localstorage', () => {
        service.clear();
        expect(localStorage.clear).toHaveBeenCalled();
      });
    })

    describe('getItem', () => {
      it('should call window localStorage', () => {
        var key = 'aKey';
        service.getItem(key);
        expect(localStorage.getItem).toHaveBeenCalledWith(key);
      });
    })

    describe('key', () => {
      it('should call window localStorage', () => {
        var value = 5;
        service.key(value);
        expect(localStorage.key).toHaveBeenCalledWith(value);
      });
    })

    describe('removeItem', () => {
      it('should call window localStorage', () => {
        var key = 'aKey';
        service.removeItem(key);
        expect(localStorage.removeItem).toHaveBeenCalledWith(key);
      });
    })

    describe('setItemObject', () => {
      it('should call window localStorage', () => {
        var key = 'aKey';
        var value = {};
        service.setItemObject(key, value);
        expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      });
    })

    describe('setItem', () => {
      it('should call window localStorage', () => {
        var key = 'aKey';
        var value = 'aValue';
        service.setItem(key, value);
        expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
      });
    })
  })

  describe('given no window', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: WindowService, useValue: { nativeWindow: null } }
        ]
      });
      service = TestBed.get(LocalStorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('clear', () => {
      it('should not throw error', () => {
        service.clear();
      });
    })

    describe('getItem', () => {
      it('should not throw error', () => {
        var key = 'aKey';
        service.getItem(key);
      });
    })

    describe('key', () => {
      it('should not throw error', () => {
        var index = 5;
        service.key(index);
      });
    })

    describe('removeItem', () => {
      it('should not throw error', () => {
        var key = 'aKey';
        service.removeItem(key);
      });
    })

    describe('setItemObject', () => {
      it('should not throw error', () => {
        var key = 'aKey';
        var value = {};
        service.setItemObject(key, value);
      });
    })

    describe('setItem', () => {
      it('should not throw error', () => {
        var key = 'aKey';
        var value = 'aValue';
        service.setItem(key, value);
      });
    })
  })
});
