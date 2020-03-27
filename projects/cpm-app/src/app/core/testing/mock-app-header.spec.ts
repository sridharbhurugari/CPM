import { Component, Input } from "@angular/core";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header-container',
  template: ''
})
export class MockAppHeaderContainer {
  searchOutput$: Observable<string> = of();
  @Input()itle: string;
}