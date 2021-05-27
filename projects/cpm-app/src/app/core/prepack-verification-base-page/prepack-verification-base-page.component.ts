import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, shareReplay, takeUntil } from 'rxjs/operators';
import { IPrepackVerificationQueueItem } from '../../api-core/data-contracts/i-prepack-verification-queue-item';
import { PrepackVerificationService } from '../../api-core/services/prepack-verification.service';
import { PrepackVerificationQueueItem } from '../model/prepack-verification-queue-item';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { WindowService } from '../../shared/services/window-service';


@Component({
  selector: 'app-prepack-verification-base-page',
  templateUrl: './prepack-verification-base-page.component.html',
  styleUrls: ['./prepack-verification-base-page.component.scss']
})
export class PrepackVerificationBasePageComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject();

  prepackVerificationItems$: Observable<IPrepackVerificationQueueItem[]>;    

  constructor(
    private prepackVerificationService: PrepackVerificationService,
    private wpfInteropService: WpfInteropService,
    private windowService: WindowService,
  ) { 
    this.setupDataRefresh();
  }

  ngOnInit() {
    this.loadPrepackVerificationQueueItems();    
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  private loadPrepackVerificationQueueItems(): void {  

    this.prepackVerificationItems$ = this.prepackVerificationService.getPrepackQueueData().pipe(
    map((prepackVerificationItems) => {
      return prepackVerificationItems.map((verificationItem) => {
        console.log(verificationItem);
        return new PrepackVerificationQueueItem(verificationItem);
      });
    }), shareReplay(1)
    );

    //this.prepackVerificationItems.subscribe((pvi) => { this.prepackVerificationItemszz = pvi; });
  }  

  /* istanbul ignore next */
  private setupDataRefresh() {
  let hash = this.windowService.getHash();
  this.wpfInteropService.wpfViewModelActivated
    .pipe(filter(x => x == hash), takeUntil(this._ngUnsubscribe))
    .subscribe(() => {
      this.ngOnInit();
    });
}
}
