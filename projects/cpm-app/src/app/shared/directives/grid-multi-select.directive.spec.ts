import { GridMultiSelectDirective } from './grid-multi-select.directive';
import { CheckboxComponent } from '@omnicell/webcorecomponents';
import { EventEmitter } from '@angular/core';
import { EMPTY_PARSE_LOCATION } from '@angular/compiler';

describe('GridMultiSelectDirective', () => {
  let directive: GridMultiSelectDirective;
  beforeEach(() => {
    directive = new GridMultiSelectDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('given checked and un-checked checkboxes', () => {
    var selectedCheckbox: Partial<CheckboxComponent>;
    var unselectedCheckbox: Partial<CheckboxComponent>;
    beforeEach(() => {
      selectedCheckbox = {
        valueField: 'selectedValue',
        selected: true,
        selection: new EventEmitter<any>(),
      };
      unselectedCheckbox = {
        valueField: 'unselectedValue',
        selected: false,
        selection: new EventEmitter<any>(),
      };
      var checkboxes = [selectedCheckbox, unselectedCheckbox];
      var rows = jasmine.createSpyObj('rows', ['map', 'filter', 'forEach']);
      rows.map.and.callFake((func) => checkboxes.map(func));
      rows.filter.and.callFake((func) => checkboxes.filter(func));
      rows.forEach.and.callFake((func) => checkboxes.forEach(func));
      directive.rows = rows;
    });

    describe('checkbox selection', () => {
      it('should call onRowCheckChanged', () => {
        spyOn(directive, 'onRowCheckChanged');
        unselectedCheckbox.selection.emit({ selectedState: true, selectedValue: unselectedCheckbox.valueField });
        expect(directive.onRowCheckChanged).toHaveBeenCalled();
      });
    })

    describe('onRowCheckChanged given row changed to checked', () => {
      it('should emit event with newly selected row in selectedValues', () => {
        spyOn(directive.selectionChanged, 'emit');
        directive.onRowCheckChanged({ selectedState: true, selectedValue: unselectedCheckbox.valueField });
        expect(directive.selectionChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          selectedValues: jasmine.arrayContaining([unselectedCheckbox.valueField])
        }));
      });
    })

    describe('onRowCheckChanged given row changed to un-checked', () => {
      it('should emit event with newly un-selected row in unselectedValues', () => {
        spyOn(directive.selectionChanged, 'emit');
        directive.onRowCheckChanged({ selectedState: false, selectedValue: selectedCheckbox.valueField });
        expect(directive.selectionChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          unselectedValues: jasmine.arrayContaining([selectedCheckbox.valueField])
        }));
      });
    })

    describe('and given the selectable rows change', () => {
      beforeEach(() => {
        var newCheckbox = {
          valueField: 'newValue',
          selected: true,
          selection: new EventEmitter<any>(),
        };
        var checkboxes = [ newCheckbox ];
        var rows = jasmine.createSpyObj('rows', ['map', 'filter', 'forEach']);
        rows.map.and.callFake((func) => checkboxes.map(func));
        rows.filter.and.callFake((func) => checkboxes.filter(func));
        rows.forEach.and.callFake((func) => checkboxes.forEach(func));
        directive.rows = rows;
      });

      it('should ignore old checkbox events', () => {
        spyOn(directive, 'onRowCheckChanged');
        unselectedCheckbox.selection.emit({ selectedState: true, selectedValue: unselectedCheckbox.valueField });
        expect(directive.onRowCheckChanged).not.toHaveBeenCalled();
      })
    })
  });
});
