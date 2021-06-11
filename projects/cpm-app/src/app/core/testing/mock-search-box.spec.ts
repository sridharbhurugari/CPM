import { Component, Input } from "@angular/core";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'oc-search-box',
  template: ''
})
export class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
  clearSearch() {};
  sendSearchData(text: string) {}
}
