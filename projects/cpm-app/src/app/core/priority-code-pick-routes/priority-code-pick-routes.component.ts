import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { IPriorityCodePickRoute } from '../../api-core/data-contracts/i-priority-code-pick-route';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { nameof } from '../../shared/functions/nameof';
import { WindowService } from '../../shared/services/window-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

@Component({
  selector: 'app-priority-code-pick-routes',
  templateUrl: './priority-code-pick-routes.component.html',
  styleUrls: ['./priority-code-pick-routes.component.scss']
})
export class PriorityCodePickRoutesComponent implements AfterViewInit {
  _priorityCodePickRoutes: IPriorityCodePickRoute[];

  @Input()set priorityCodePickRoutes(value: IPriorityCodePickRoute[]) {
    this._priorityCodePickRoutes = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  get priorityCodePickRoutes(): IPriorityCodePickRoute[] {
    return this._priorityCodePickRoutes;
  }

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  searchTextFilter: string;

  searchFields = [ nameof<IPriorityCodePickRoute>('PriorityCodeDescription'), nameof<IPriorityCodePickRoute>('PickRouteDescription') ];

  constructor(
    private windowService: WindowService,
    private wpfActionControllerService: WpfActionControllerService
  ) { }

  ngAfterViewInit(): void {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = data;
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }
  navigate(priorityCodePickRouteId: number) {
    this.wpfActionControllerService.
    ExecuteContinueNavigationAction(`core/priorityCode/RouteAssignments`, {priorityCodePickRouteId: priorityCodePickRouteId});
  }
}
