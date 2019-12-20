import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { TranslateService } from '@ngx-translate/core';

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
  ) {
    this.translatedItems$ = translateService.get(this._itemsResourceKey);
    this.translatedPatients$ = translateService.get(this._patientsResourceKey);
    this.translatedCabinets$ = translateService.get(this._cabinetsResourceKey);
  }

  ngOnInit() {
    var picklists$ = this.underfilledPicklistsService.get();
    this.picklists = forkJoin(picklists$, this.translatedItems$, this.translatedPatients$, this.translatedCabinets$).pipe(map(results => {
      var underfilledPicklists = results[0]
      var translatedItems = results[1];
      var translatedPatients = results[2];
      var translatedCabinets = results[3];
      return underfilledPicklists.map(p => new UnderfilledPicklist(p, this.locale, translatedItems, translatedPatients, translatedCabinets)).sort((a, b) => a.SequenceOrder - b.SequenceOrder);
    }));
  }

}
