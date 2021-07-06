import { Injectable } from '@angular/core';
import { PrepackVerificationQueueItem } from '../model/prepack-verification-queue-item';

@Injectable({
  providedIn: 'root'
})
export class PrepackVerificationSelectionCacheService {

  private _prepackVerificationQueueItems: PrepackVerificationQueueItem[];

  constructor() { }

  public Get() : PrepackVerificationQueueItem[] {
    return this._prepackVerificationQueueItems;
  }

  public Set(prepackVerificationQueueItems : PrepackVerificationQueueItem[]) : void {
    this._prepackVerificationQueueItems = prepackVerificationQueueItems;
  }

  public Clear() : void {
    this._prepackVerificationQueueItems = null;
  }
}
