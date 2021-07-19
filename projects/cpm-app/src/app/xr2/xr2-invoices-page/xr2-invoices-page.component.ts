import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

@Component({
  selector: 'app-xr2-stocking-page',
  templateUrl: './xr2-invoices-page.component.html',
  styleUrls: ['./xr2-invoices-page.component.scss']
})
export class Xr2InvoicesPageComponent implements OnInit {

  ngUnsubscribe = new Subject();
  searchTextFilter: string;

  constructor(
    private wpfActionController: WpfActionControllerService
  ) { }

  ngOnInit() {
  }

  onBackEvent(): void {
    this.wpfActionController.ExecuteBackAction();
  }

  onSearchTextFilterEvent(filterText: string): void {
    this.searchTextFilter = filterText;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
