import { Component, Input, OnInit} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IVerificationDashboardData } from '../../api-core/data-contracts/i-verification-dashboard-data';
import { VerificationDashboardData } from '../../shared/model/verification-dashboard-data';

@Component({
  selector: 'app-verification-dashboard',
  templateUrl: './verification-dashboard.component.html',
  styleUrls: ['./verification-dashboard.component.scss']
})
export class VerificationDashboardComponent implements OnInit {

  @Input() verificationDashboardData: VerificationDashboardData;
  @Input() dashboardUpdate$: Observable<IVerificationDashboardData>;

  public ngUnsubscribe = new Subject();

  constructor() { }

  ngOnInit() {
    if(this.dashboardUpdate$) {
      this.dashboardUpdate$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((dashboardDataUpdate) => {
        if(this.verificationDashboardData) {
          this.verificationDashboardData.Add(dashboardDataUpdate);
        }
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  showIcon(iconString: string, completed: number, required: number) {
    if(required > completed) {
      return iconString
    }

    return '';
  }
}
