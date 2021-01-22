import { EventEmitter, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cp-general-header',
  templateUrl: './cp-general-header.component.html',
  styleUrls: ['./cp-general-header.component.scss']
})
export class CpGeneralHeaderComponent {

  @Output() backEvent: EventEmitter<void> = new EventEmitter();
  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() title: string;
  @Input() subtitle: string;
  @Input() showSearchBox: boolean = true;

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;


  constructor() {}

  ngAfterViewInit() {
    if(this.showSearchBox && this.searchElement) {
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
  }

  onBackClick(): void {
    this.backEvent.emit();
  }
}
