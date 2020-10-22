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

  describe('given checked, un-checked, and disabled checkboxes', () => {
    var selectedCheckbox: Partial<CheckboxComponent>;
    var unselectedCheckbox: Partial<CheckboxComponent>;
    var disabledCheckbox: Partial<CheckboxComponent>;
    beforeEach(() => {
      selectedCheckbox = {
        valueField: 'selectedValue',
        selected: true,
        selection: new EventEmitter<any>(),
        isEnabled: true,
      };
      unselectedCheckbox = {
        valueField: 'unselectedValue',
        selected: false,
        selection: new EventEmitter<any>(),
        isEnabled: true,
      };
      disabledCheckbox = {
        valueField: 'disabledValue',
        selected: false,
        selection: new EventEmitter<any>(),
        isEnabled: false,
      }
      var checkboxes = [selectedCheckbox, unselectedCheckbox, disabledCheckbox];
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
      beforeEach(() => {
        spyOn(directive.selectionChanged, 'emit');
        directive.onRowCheckChanged({ selectedState: true, selectedValue: unselectedCheckbox.valueField });
      });

      it('should emit event with newly selected row in selectedValues', () => {
        expect(directive.selectionChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          selectedValues: jasmine.arrayContaining([unselectedCheckbox.valueField])
        }));
      });

      it('should exclude disabled checkbox from all selection logic', () => {
        expect(directive.selectionChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          selectedValues: jasmine.arrayWithExactContents([selectedCheckbox.valueField, unselectedCheckbox.valueField]),
          unselectedValues: jasmine.arrayWithExactContents([]),
          areAllValuesSelected: true,
        }));
      });
    })

    describe('onRowCheckChanged given row changed to un-checked', () => {
      beforeEach(() => {
        spyOn(directive.selectionChanged, 'emit');
        directive.onRowCheckChanged({ selectedState: false, selectedValue: selectedCheckbox.valueField });
      });

      it('should emit event with newly un-selected row in unselectedValues', () => {
        expect(directive.selectionChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          unselectedValues: jasmine.arrayContaining([selectedCheckbox.valueField])
        }));
      });

      it('should exclude disabled checkbox from all selection logic', () => {
        expect(directive.selectionChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          selectedValues: jasmine.arrayWithExactContents([]),
          unselectedValues: jasmine.arrayWithExactContents([selectedCheckbox.valueField, unselectedCheckbox.valueField]),
          areAllValuesSelected: false,
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
