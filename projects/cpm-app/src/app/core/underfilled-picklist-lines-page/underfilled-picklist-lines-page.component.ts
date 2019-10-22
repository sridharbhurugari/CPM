import { Component, OnInit } from '@angular/core';
import { UnderfilledPicklistLinesService } from '../../api-core/services/underfilled-picklist-lines.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { map, shareReplay } from 'rxjs/operators';
import * as _ from 'lodash';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

@Component({
  selector: 'app-underfilled-picklist-lines-page',
  templateUrl: './underfilled-picklist-lines-page.component.html',
  styleUrls: ['./underfilled-picklist-lines-page.component.scss']
})
export class UnderfilledPicklistLinesPageComponent implements OnInit {
  picklistLines$: Observable<UnderfilledPicklistLine[]>;
  picklist$: Observable<UnderfilledPicklist>;

  constructor(
    private route: ActivatedRoute,
    private underfilledPicklistsService: UnderfilledPicklistsService,
    private underfilledPicklistLinesService: UnderfilledPicklistLinesService,
    private wpfActionControllerService: WpfActionControllerService
  ) { }

  ngOnInit() {
    var orderId = this.route.snapshot.queryParamMap.get('orderId');
    this.picklist$ = this.underfilledPicklistsService.getForOrder(orderId).pipe(map(underfilledPicklist => {
      return new UnderfilledPicklist(underfilledPicklist);
    }), shareReplay(1));
    this.picklistLines$ = this.underfilledPicklistLinesService.get(orderId).pipe(map(underfilledPicklistLines => {
      var displayObjects = underfilledPicklistLines.map(l => new UnderfilledPicklistLine(l));
      var result = _.orderBy(displayObjects, (x: UnderfilledPicklistLine) => [x.DestinationSortValue, x.ItemFormattedGenericName.toLowerCase()]);
      return result;
    }));
  }

  navigateBack(){
    this.wpfActionControllerService.ExecuteBackAction();
  }
}
