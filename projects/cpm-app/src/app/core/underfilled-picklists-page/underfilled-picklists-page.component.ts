import { Component, OnInit } from '@angular/core';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnderfilledPicklist } from '../model/underfilled-picklist';

@Component({
  selector: 'app-underfilled-picklists-page',
  templateUrl: './underfilled-picklists-page.component.html',
  styleUrls: ['./underfilled-picklists-page.component.scss']
})
export class UnderfilledPicklistsPageComponent implements OnInit {
  picklists: Observable<UnderfilledPicklist[]>;

  constructor(private underfilledPicklistsService: UnderfilledPicklistsService) { }

  ngOnInit() {
    this.picklists = this.underfilledPicklistsService.get().pipe(map(underfilledPicklists => {
      return underfilledPicklists.map(p => new UnderfilledPicklist(p));
    }));
  }

}
