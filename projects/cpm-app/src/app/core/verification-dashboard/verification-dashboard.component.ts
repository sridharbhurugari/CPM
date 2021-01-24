import { Component, Input, OnInit } from '@angular/core';
import { VerificationDashboardData } from '../../shared/model/verification-dashboard-data';

@Component({
  selector: 'app-verification-dashboard',
  templateUrl: './verification-dashboard.component.html',
  styleUrls: ['./verification-dashboard.component.scss']
})
export class VerificationDashboardComponent implements OnInit {

  constructor() { }

  @Input() verificationDashboardData: VerificationDashboardData;

  ngOnInit() {
  }

}
