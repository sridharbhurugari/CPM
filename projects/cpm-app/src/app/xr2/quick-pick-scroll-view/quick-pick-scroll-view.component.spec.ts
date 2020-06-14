import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickScrollViewComponent } from './quick-pick-scroll-view.component';

import { QuickPickDispenseBox } from './../model/quick-pick-dispense-box';
import { QuickPickPicklistItem } from '../model/quick-pick-picklist-item';

describe('QuickPickScrollViewComponent', () => {
  let component: QuickPickScrollViewComponent;
  let fixture: ComponentFixture<QuickPickScrollViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickScrollViewComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickScrollViewComponent);
    component = fixture.componentInstance;
    component.dispenseBox = new QuickPickDispenseBox(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
