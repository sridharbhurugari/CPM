import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistsQueuePageComponent } from './picklists-queue-page.component';

describe('PicklistsQueuePageComponent', () => {
  let component: PicklistsQueuePageComponent;
  let fixture: ComponentFixture<PicklistsQueuePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicklistsQueuePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistsQueuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
