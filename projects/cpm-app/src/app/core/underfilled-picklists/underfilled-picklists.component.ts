import { Component, OnInit, Input } from '@angular/core';
import { UnderfilledPicklist } from '../model/underfilled-picklist';

@Component({
  selector: 'app-underfilled-picklists',
  templateUrl: './underfilled-picklists.component.html',
  styleUrls: ['./underfilled-picklists.component.scss']
})
export class UnderfilledPicklistsComponent {

  @Input()
  picklists: UnderfilledPicklist[];

  constructor() { }

}
