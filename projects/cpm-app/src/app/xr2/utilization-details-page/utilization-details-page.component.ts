import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-utilization-details-page',
  templateUrl: './utilization-details-page.component.html',
  styleUrls: ['./utilization-details-page.component.scss']
})
export class UtilizationDetailsPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const deviceId = this.route.snapshot.queryParamMap.get('DeviceId');
    const pocketTypeId = this.route.snapshot.queryParamMap.get('PocketTypeId');
    const deviceDescription = this.route.snapshot.queryParamMap.get('DeviceDescription');
  }

}
