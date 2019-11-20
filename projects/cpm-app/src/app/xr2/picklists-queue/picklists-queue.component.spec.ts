import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistsQueueComponent } from './picklists-queue.component';

describe('PicklistsQueueComponent', () => {
  let component: PicklistsQueueComponent;
  let fixture: ComponentFixture<PicklistsQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicklistsQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
