import { Component, OnInit } from '@angular/core';
import { UnderfilledPicklistLinesService } from '../../api-core/services/underfilled-picklist-lines.service';
import { ActivatedRoute } from '@angular/router';
import { IUnderfilledPicklistLine } from '../../api-core/data-contracts/i-underfilled-picklist-line';
import { Observable } from 'rxjs';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-underfilled-picklist-lines-page',
  templateUrl: './underfilled-picklist-lines-page.component.html',
  styleUrls: ['./underfilled-picklist-lines-page.component.scss']
})
export class UnderfilledPicklistLinesPageComponent implements OnInit {
  picklistLines: Observable<UnderfilledPicklistLine[]>;

  constructor(
    private route: ActivatedRoute,
    private underfilledPicklistLinesService: UnderfilledPicklistLinesService
  ) { }

  ngOnInit() {
    var orderId = this.route.snapshot.paramMap.get('orderId');
    this.picklistLines = this.underfilledPicklistLinesService.get(orderId).pipe(map(underfilledPicklistLines => {
      return underfilledPicklistLines.map(l => new UnderfilledPicklistLine(l));
    }));
  }

}
