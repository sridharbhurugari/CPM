import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Xr2QueueDetailsPageComponent } from './xr2-queue-details-page.component';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { Xr2QueueDetailsHeaderComponent } from '../xr2-queue-details-header/xr2-queue-details-header.component';
import { Xr2DetailsQueueComponent } from '../xr2-details-queue/xr2-details-queue.component';
import { Input, Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('Xr2QueueDetailsPageComponent', () => {
  let component: Xr2QueueDetailsPageComponent;
  let fixture: ComponentFixture<Xr2QueueDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2QueueDetailsPageComponent, Xr2QueueDetailsHeaderComponent, Xr2DetailsQueueComponent,
        MockCpClickableIconComponent, MockSearchBox],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
