import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickBoxItemsView } from './quick-pick-box-items-view.component';

import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';

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
    component.drawerData = new QuickPickDrawerData(null);
    component.drawerData.MedsWithCounts = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return proper background for getItemStyle', () => {
    expect(component).toBeTruthy();
    const med1: any = {Label: 'TestPick1', FilledQty: 5, ReqQty: 5};
    const med2: any = {Label: 'TestPick1', FilledQty: 1, ReqQty: 5};
    expect(component.getItemStyle(med1)).toBeNull();
    expect(component.getItemStyle(med2)).toBeDefined();
  });
});
