import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CheckboxModule, GridModule, InputsModule } from '@omnicell/webcorecomponents';
import { CheckboxValues } from '../../shared/constants/checkbox-values';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { InternalTransferPick } from '../model/internal-transfer-pick';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { InternalTransferPickNeedsListComponent } from './internal-transfer-pick-needs-list.component';

describe('InternalTransferPickNeedsListComponent', () => {
  let component: InternalTransferPickNeedsListComponent;
  let fixture: ComponentFixture<InternalTransferPickNeedsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        InternalTransferPickNeedsListComponent,
        MockColHeaderSortable,
        MockTranslatePipe,
      ],
      imports: [ 
        CheckboxModule,
        GridModule,
        FormsModule,
        InputsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferPickNeedsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.pickTotalChanged, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given no item needs', () => {
    describe('pickQtyChanged', () => {
      beforeEach(() => {
        component.pickQtyChanged();
      });

      it('pickTotalChanged should not emit', () => {
        expect(component.pickTotalChanged.emit).not.toHaveBeenCalled();
      });
    });
  });

  describe('given item needs', () => {
    let itemNeeds: InternalTransferPick[];
    let itemNeed1: InternalTransferPick;
    let itemNeed2: InternalTransferPick;
    beforeEach(() => {
      itemNeed1 = {
        QuantityToPick: 3,
        IsSelected: false,
      } as InternalTransferPick;
      itemNeed2 = {
        QuantityToPick: 4,
        IsSelected: false,
      } as InternalTransferPick;
      itemNeeds = [];
      itemNeeds.push(itemNeed1);
      itemNeeds.push(itemNeed2);
      component.itemNeeds = itemNeeds;
    });
    
    describe('pickQtyChanged', () => {
      beforeEach(() => {
        component.pickQtyChanged();
      });

      it('pickTotalChanged should emit', () => {
        expect(component.pickTotalChanged.emit).toHaveBeenCalledWith(7);
      });
    });

    describe('selectedPicksChanged', () => {
      describe('toggle all to selected', () => {
        beforeEach(() => {
          component.selectedPicksChanged({
            areAllValuesSelected: true,
            changeType: SelectionChangeType.selected,
            changedValue: CheckboxValues.ToggleAll,
            selectedValues: [],
            unselectedValues: [],
          });
        });

        it('should set all IsSelected true', () => {
          expect(component.itemNeeds.every(x => x.IsSelected)).toBeTruthy();
        });
      });
      describe('toggle all to un-selected', () => {
        beforeEach(() => {
          component.selectedPicksChanged({
            areAllValuesSelected: true,
            changeType: SelectionChangeType.unselected,
            changedValue: CheckboxValues.ToggleAll,
            selectedValues: [],
            unselectedValues: [],
          });
        });

        it('should set all IsSelected false', () => {
          expect(component.itemNeeds.every(x => !x.IsSelected)).toBeTruthy();
        });
      });
      describe('toggle single value', () => {
        beforeEach(() => {
          component.selectedPicksChanged({
            areAllValuesSelected: true,
            changeType: SelectionChangeType.selected,
            changedValue: itemNeed1,
            selectedValues: [itemNeed1],
            unselectedValues: [],
          });
        });

        it('should set IsSelected true for selected value', () => {
          expect(component.itemNeeds.find(x => x == itemNeed1).IsSelected).toBeTruthy();
        });
      });
    });
  });
});
