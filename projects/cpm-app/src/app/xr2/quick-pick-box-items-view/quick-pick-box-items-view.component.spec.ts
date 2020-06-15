import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickBoxItemsView } from './quick-pick-box-items-view.component';

import { QuickPickDispenseBox } from '../model/quick-pick-dispense-box';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';

describe('QuickPickBoxItemsView', () => {
  let component: QuickPickBoxItemsView;
  let fixture: ComponentFixture<QuickPickBoxItemsView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickBoxItemsView, MockTranslatePipe ],
      providers: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickBoxItemsView);
    component = fixture.componentInstance;
    component.dispenseBox = new QuickPickDispenseBox(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
