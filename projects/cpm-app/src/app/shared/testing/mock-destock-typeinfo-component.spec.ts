import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UtilizationPocketSummaryInfo } from '../../xr2/model/utilization-unassigned-medication-info';

@Component({
  selector: 'app-utilization-pocket-summary-info',
  template: ''
})

export class MockUtilizationPocketSummaryInfoComponent {
  @Input() deviceUtilizationPocketSummaryInfo: UtilizationPocketSummaryInfo[];
  @Input() searchTextFilter: string;
  @Output() printLabel: EventEmitter<UtilizationPocketSummaryInfo> = new EventEmitter<UtilizationPocketSummaryInfo>();
}
