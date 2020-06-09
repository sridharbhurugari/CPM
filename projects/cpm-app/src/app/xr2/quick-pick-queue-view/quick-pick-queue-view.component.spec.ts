import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickQueueViewComponent } from './quick-pick-queue-view.component';

describe('QuickPickQueueViewComponent', () => {
  let component: QuickPickQueueViewComponent;
  let fixture: ComponentFixture<QuickPickQueueViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickQueueViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickQueueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
