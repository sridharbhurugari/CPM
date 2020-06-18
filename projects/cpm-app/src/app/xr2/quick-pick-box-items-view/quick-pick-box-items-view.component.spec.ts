import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickBoxItemsView } from './quick-pick-box-items-view.component';

import { QuickPickDispenseBox } from '../model/quick-pick-dispense-box';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { IQuickPickPicklistItem } from '../../api-xr2/data-contracts/i-quick-pick-picklist-item';

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

  it('should return proper background for getItemStyle', () => {
    expect(component).toBeTruthy();
    const pickItem1: IQuickPickPicklistItem = {Label: 'TestPick1', FilledQty: 5, ReqQty: 5};
    const pickItem2: IQuickPickPicklistItem = {Label: 'TestPick1', FilledQty: 1, ReqQty: 5};
    expect(component.getItemStyle(pickItem1)).toBeNull();
    expect(component.getItemStyle(pickItem2)).toBeDefined();
  });
});
