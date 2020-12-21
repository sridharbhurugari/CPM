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
import { nameof } from '../../shared/functions/nameof';
import { UnfilledSortOrderService } from '../utilities/unfilled-sort-order.service';

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
  datePropertyName = nameof<UnderfilledPicklist>('CompletedDate');
  currentSortPropertyName;
  sortOrder;

  picklists: Observable<UnderfilledPicklist[]>;

  constructor(
    private underfilledPicklistsService: UnderfilledPicklistsService,
    @Inject(LOCALE_ID) private locale: string,
    translateService: TranslateService,
    private pickingEventConnectionService: PickingEventConnectionService,
    private unfilledSortOrderService: UnfilledSortOrderService,
  ) {
    this.translatedItems$ = translateService.get(this._itemsResourceKey);
    this.translatedPatients$ = translateService.get(this._patientsResourceKey);
    this.translatedCabinets$ = translateService.get(this._cabinetsResourceKey);
  }

  ngOnInit() {
    try {
      var initialPicklists$ = this.underfilledPicklistsService.get();

      var unfilledEvents$ = merge(this.pickingEventConnectionService.updatedUnfilledPicklistSubject, this.pickingEventConnectionService.removedUnfilledPicklistSubject);

      var alteredPicklist$ = initialPicklists$.pipe(switchMap(x => {
        return unfilledEvents$.pipe(scan<IUnfilledPicklistAddedOrUpdatedEvent|IUnfilledPicklistRemovedEvent, IUnderfilledPicklist[]>((picklists, picklistEvent) => {
          if ('OrderId' in picklistEvent) {
            let index = picklists.findIndex((r) => r.OrderId === picklistEvent.OrderId);
            if (index != -1){
              picklists.splice(index, 1)
            }
            return picklists;
          } else {
            let index = picklists.findIndex((r) => r.OrderId === picklistEvent.PicklistUnderfilled.OrderId);
            if (index != -1){
              picklists.splice(index, 1)
            }
            picklists.push(picklistEvent.PicklistUnderfilled)
            return picklists;
          }
        }, x));
      }));

      var allPicklists$ = merge(initialPicklists$, alteredPicklist$);

      this.picklists = combineLatest(allPicklists$, this.translatedItems$, this.translatedPatients$, this.translatedCabinets$).pipe(map(results => {
        var underfilledPicklists = results[0]
        var translatedItems = results[1];
        var translatedPatients = results[2];
        var translatedCabinets = results[3];
        var displayObjects = underfilledPicklists.map(p => new UnderfilledPicklist(p, this.locale, translatedItems, translatedPatients, translatedCabinets));
        var sorted = this.unfilledSortOrderService.Sort(displayObjects);
        return sorted;
        }));
    } catch (e) {
      console.log('UnderfilledPicklistsPageComponent.ngOnInit ERROR');
      console.log(e);
    }
  }
}
