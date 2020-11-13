import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { Observable, forkJoin, combineLatest, merge } from 'rxjs';
import { map, switchMap, scan } from 'rxjs/operators';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { SortDirection } from '../../shared/constants/sort-direction';
import { PickingEventConnectionService } from '../../api-core/services/picking-event-connection.service';
import { IUnfilledPicklistAddedOrUpdatedEvent } from '../../api-core/events/i-unfilled-picklist-added-or-updated-event';
import { IUnfilledPicklistRemovedEvent } from '../../api-core/events/i-unfilled-picklist-removed-event';
import { IUnderfilledPicklist } from '../../api-core/data-contracts/i-underfilled-picklist';

@Component({
  selector: 'app-underfilled-picklists-page',
  templateUrl: './underfilled-picklists-page.component.html',
  styleUrls: ['./underfilled-picklists-page.component.scss']
})
export class UnderfilledPicklistsPageComponent implements OnInit {
  private _itemsResourceKey = 'ITEMS';
  private _patientsResourceKey = 'PATIENTS';
  private _cabinetsResourceKey = 'CABINETS'

  translatedItems$: Observable<string>;
  translatedPatients$: Observable<string>;
  translatedCabinets$: Observable<string>;
    
  picklists: Observable<UnderfilledPicklist[]>;

  constructor(
    private underfilledPicklistsService: UnderfilledPicklistsService,
    @Inject(LOCALE_ID) private locale: string,
    translateService: TranslateService,
    private pickingEventConnectionService: PickingEventConnectionService
  ) {       
    this.translatedItems$ = translateService.get(this._itemsResourceKey);
    this.translatedPatients$ = translateService.get(this._patientsResourceKey);
    this.translatedCabinets$ = translateService.get(this._cabinetsResourceKey);   
    /*this.configureEventHandlers(); */
  }

  ngOnInit() {
    try {
      var initialPicklists$ = this.underfilledPicklistsService.get();     

      var picklistsWithNewAdds$ = initialPicklists$.pipe(switchMap(x => {
        return this.pickingEventConnectionService.updatedUnfilledPicklistSubject.pipe(scan<IUnfilledPicklistAddedOrUpdatedEvent, IUnderfilledPicklist[]>((currentPicklists, newPicklist) => {
          currentPicklists.push(newPicklist.PicklistUnderfilled)                    
          return currentPicklists;          
        }, x));        
      }));      

      var picklistsWithRemoves$ = initialPicklists$.pipe(switchMap(x => {
        return this.pickingEventConnectionService.removedUnfilledPicklistSubject.pipe(scan<IUnfilledPicklistRemovedEvent, IUnderfilledPicklist[]>((currentPicklists, removeId) => {
          var index = currentPicklists.findIndex((r) => r.OrderId === removeId.OrderId);
          currentPicklists.splice(index, 1)                    
          return currentPicklists;          
        }, x));        
      }));

      var allPicklists$ = merge(initialPicklists$, picklistsWithNewAdds$, picklistsWithRemoves$);

      this.picklists = combineLatest(allPicklists$, this.translatedItems$, this.translatedPatients$, this.translatedCabinets$).pipe(map(results => {      
        var underfilledPicklists = results[0]
        var translatedItems = results[1];
        var translatedPatients = results[2];
        var translatedCabinets = results[3];
        var displayObjects = underfilledPicklists.map(p => new UnderfilledPicklist(p, this.locale, translatedItems, translatedPatients, translatedCabinets));
        var sorted = displayObjects.sort(function (a,b) {
          if (a.CompletedDate > b.CompletedDate) return -1;
          if (a.CompletedDate < b.CompletedDate) return 1;
          if (a.SequenceOrder < b.SequenceOrder) return -1;
          if (a.SequenceOrder > b.SequenceOrder) return 1;
        return 0;}
        );
        return sorted;
        }));      
    } catch (e) {
      console.log('UnderfilledPicklistsPageComponent.ngOnInit ERROR');
      console.log(e);
    }
  }   

  /*private configureEventHandlers(): void {
    if (!this.pickingEventConnectionService) {
      return;
    }
    
    this.pickingEventConnectionService.removedUnfilledPicklistSubject
      .subscribe(message => this.onRemoveUnfilledPicklist(message));
  }

  private onRemoveUnfilledPicklist(unfilledPicklistRemovedEvent: IUnfilledPicklistRemovedEvent): void {
    try {
      const orderId = unfilledPicklistRemovedEvent.OrderId;

      this.picklists = this.picklists.pipe(map(x => x.pop()));

      _.remove(this.picklists, (x) => {
        return x.OrderId === orderId;

      });      
    } catch (e) {
      console.log('UnderfilledPicklistsPageComponent.onRemoveUnfilledPicklist ERROR');
      console.log(e);
    }
  }*/
}
