import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';

import { Xr2QueueDetailsHeaderComponent } from './xr2-queue-details-header.component';
import { Input, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('Xr2QueueDetailsHeaderComponent', () => {
  let component: Xr2QueueDetailsHeaderComponent;
  let fixture: ComponentFixture<Xr2QueueDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2QueueDetailsHeaderComponent, MockCpClickableIconComponent,
        MockSearchBox, MockSearchPipe, MockTranslatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
