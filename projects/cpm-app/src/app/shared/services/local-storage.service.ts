import { Injectable } from '@angular/core';
import { WindowService } from './window-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {
  get name(){
    return this.localStorage.name;
  }
  get length(){
    return this.localStorage.length;
  }
  
  localStorage: Storage;

  constructor(windowService: WindowService) {
    if(windowService.nativeWindow){
      this.localStorage = windowService.nativeWindow['localStorage'];
    }
  }

  clear(): void {
    if(!this.localStorage){
      return;
    }

    this.localStorage.clear();
  }

  getItem(key: string): string {
    if(!this.localStorage){
      return;
    }

    return this.localStorage.getItem(key);
  }
  
  key(index: number): string {
    if(!this.localStorage){
      return;
    }

    return this.localStorage.key(index);
  }

  removeItem(key: string): void {
    if(!this.localStorage){
      return;
    }

    this.localStorage.remove(key);
  }

  setItemObject(key: string, value: object): void {
    var valueString = JSON.stringify(value);
    this.setItem(key, valueString);
  }

  setItem(key: string, value: string): void {
    if(!this.localStorage){
      return;
    }

    this.localStorage.setItem(key, value);
  }
}