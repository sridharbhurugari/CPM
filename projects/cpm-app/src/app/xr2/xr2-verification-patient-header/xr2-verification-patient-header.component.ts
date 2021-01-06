import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-xr2-verification-patient-header',
  templateUrl: './xr2-verification-patient-header.component.html',
  styleUrls: ['./xr2-verification-patient-header.component.scss']
})
export class Xr2VerificationPatientHeaderComponent implements OnInit {


  @Output() backEvent: EventEmitter<void> = new EventEmitter();
  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() priorityDescription: string;
  @Input() orderId: string;
  @Input() date: string;

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;


  constructor(private windowService: WindowService) {
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilterEvent.emit(data);
      });
  }

  onBackClick(): void {
    this.backEvent.emit();
  }
}
