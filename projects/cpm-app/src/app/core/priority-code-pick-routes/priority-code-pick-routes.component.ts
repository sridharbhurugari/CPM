import { Component, OnInit, Input } from '@angular/core';
import { IPriorityCodePickRoute } from '../../api-core/data-contracts/i-priority-code-pick-route';

@Component({
  selector: 'app-priority-code-pick-routes',
  templateUrl: './priority-code-pick-routes.component.html',
  styleUrls: ['./priority-code-pick-routes.component.scss']
})
export class PriorityCodePickRoutesComponent implements OnInit {
  @Input()priorityCodePickRoutes: IPriorityCodePickRoute[];

  constructor() { }

  ngOnInit() {
  }

}
