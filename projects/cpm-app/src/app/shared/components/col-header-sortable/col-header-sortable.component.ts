import { Component, OnInit, Input, Output, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { IColHeaderSortChanged } from '../../events/i-col-header-sort-changed';
import { SortDirection } from '../../constants/sort-direction';

@Component({
  selector: '[app-col-header-sortable]',
  templateUrl: './col-header-sortable.component.html',
  styleUrls: ['./col-header-sortable.component.scss']
})
export class ColHeaderSortableComponent implements OnInit {

  @Input()
  currentSortPropertyName: string;

  @Input()
  headerResourceKey: string;

  @Input()
  columnPropertyName: string;

  @Input()
  customColumnSortOrder: 'asc' | 'desc';

  @Input()
  wrap: boolean;

  @Input()
  bold: boolean = false

  @Output()
  columnSelected: EventEmitter<IColHeaderSortChanged> = new EventEmitter();

  sortDirection: 'asc' | 'desc' = SortDirection.ascending;

  get IsSortAscending(){
    this.sortDirection = this.customColumnSortOrder && this.customColumnSortOrder === SortDirection.ascending ? this.customColumnSortOrder : this.sortDirection;
    return this.sortDirection == SortDirection.ascending;
  }

  get IsSortDescending(){
    this.sortDirection = this.customColumnSortOrder && this.customColumnSortOrder === SortDirection.descending  ? this.customColumnSortOrder : this.sortDirection;
    return this.sortDirection == SortDirection.descending;
  }

  constructor() { }

  ngOnInit() {
  }

  @HostListener("click", ['$event'])
  headerClicked($event) {
    var targetClasses = $event.target.classList as DOMTokenList;
    if (targetClasses.contains('resize')) {
      return;
    }

    if (this.currentSortPropertyName == this.columnPropertyName) {
      this.sortDirection = this.sortDirection == SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
    } else {
      this.sortDirection = SortDirection.ascending;
    }

    this.columnSelected.emit({
      ColumnPropertyName: this.columnPropertyName,
      SortDirection: this.sortDirection
    });
  }
}
