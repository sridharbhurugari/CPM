import { GridSortColDirective } from './grid-sort-col.directive';
import { nameof } from '../functions/nameof';
import { QueryList, EventEmitter } from '@angular/core';
import { ColHeaderSortableComponent } from '../components/col-header-sortable/col-header-sortable.component';
import { IColHeaderSortChanged } from '../events/i-col-header-sort-changed';
import { SortDirection } from '../constants/sort-direction';

interface ISomeSortable {
  sortableNumericProp: number;
  sortableStringProp: string;
}

describe('GridSortColDirective', () => {
  let firstByNumeric: ISomeSortable = {
    sortableNumericProp: 4,
    sortableStringProp: 'Z'
  };
  let secondByNumeric: ISomeSortable = {
    sortableNumericProp: 18,
    sortableStringProp: 'b'
  };
  let thirdByNumeric: ISomeSortable = {
    sortableNumericProp: 880,
    sortableStringProp: 'a'
  };
  let firstByString: ISomeSortable = thirdByNumeric;
  let secondByString: ISomeSortable = secondByNumeric;
  let thirdByString: ISomeSortable = firstByNumeric;
  let firstCol: Partial<ColHeaderSortableComponent>;
  let secondCol: Partial<ColHeaderSortableComponent>;
  let directive: GridSortColDirective;
  beforeEach(() => {
    directive = new GridSortColDirective();
    firstCol = {
      columnSelected: new EventEmitter<IColHeaderSortChanged>(),
    };
    secondCol = {
      columnSelected: new EventEmitter<IColHeaderSortChanged>(),
    };
    let columnHeaders = [ firstCol, secondCol ];
    let colsQueryList = jasmine.createSpyObj('columnHeaders', [ 'forEach' ]);
    colsQueryList.forEach.and.callFake((func) => columnHeaders.forEach(func));
    directive.columns = colsQueryList;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('given initial sort property name', () => {
    beforeEach(() => {
      spyOn(directive.valuesReordered, 'emit');
      directive.initialSortPropertyName = nameof<ISomeSortable>('sortableNumericProp');
    })

    describe('when setting orderableValues', () => {
      beforeEach(() => {
        directive.orderableValues = [secondByNumeric, thirdByNumeric, firstByNumeric];
      });

      it('should emit the values ordered by the specified property', () => {
        expect(directive.valuesReordered.emit)
          .toHaveBeenCalledWith(jasmine.arrayWithExactContents([firstByNumeric, secondByNumeric, thirdByNumeric]));
      });

      describe('and then re-setting orderableValues to equivalent array', () => {
        beforeEach(() => {
          directive.orderableValues = [firstByNumeric, secondByNumeric, thirdByNumeric];
        });

        it('should not re-emit ordered values', () => {
          expect(directive.valuesReordered.emit).toHaveBeenCalledTimes(1);
        });
      });

      describe('and then selecting a different column', () => {
        beforeEach(() => {
          directive.columnSelected({
            ColumnPropertyName: nameof<ISomeSortable>('sortableStringProp'),
            SortDirection: SortDirection.ascending
          });
        });

        it('should emit the values ordered by the specified property', () => {
          expect(directive.valuesReordered.emit)
            .toHaveBeenCalledWith(jasmine.arrayWithExactContents([firstByString, secondByString, thirdByString]));
        });
      });
    });
  });
});
