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
    // localStorage.setItem('ocap', JSON.stringify({"ocapServerIP":"localhost","port":"40407","apiKey":"sdkfjnb983t47h39gn7fh92fg39ng9h87ghf298h","clientId":"2EC882FD-D7BC-49CB-ACBA-C4186484EA55","machineName":"OMCLW10-5191tgq","useSecured":"true","endpointPrefix":"","endpoint":""}));
    this.picklists = this.underfilledPicklistsService.get().pipe(map(underfilledPicklists => {
      return underfilledPicklists.map(p => new UnderfilledPicklist(p));
    }));
  }

}
