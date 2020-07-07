import { GridReorderDirective } from './grid-reorder.directive';
import { RowReorderButtonsComponent } from '../components/row-reorder-buttons/row-reorder-buttons.component';
import { EventEmitter } from '@angular/core';
import { IRowIndexChanged } from '../events/i-row-index-changed';

describe('GridReorderDirective', () => {
  var directive: GridReorderDirective;
  beforeEach(() => {
    directive = new GridReorderDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('given ordered rows', () => {
    var firstRow: Partial<RowReorderButtonsComponent>;
    var secondRow: Partial<RowReorderButtonsComponent>;
    var thirdRow: Partial<RowReorderButtonsComponent>;
    beforeEach(() => {
      firstRow = {
        value: 'firsValue',
        rowMovedUp: new EventEmitter<any>(),
        rowMovedDown: new EventEmitter<any>(),
        rowIndexChanged: new EventEmitter<IRowIndexChanged<any>>(),
      };
      secondRow = {
        value: 'secondValue',
        rowMovedUp: new EventEmitter<any>(),
        rowMovedDown: new EventEmitter<any>(),
        rowIndexChanged: new EventEmitter<IRowIndexChanged<any>>(),
      };
      thirdRow = {
        value: 'thirdValue',
        rowMovedUp: new EventEmitter<any>(),
        rowMovedDown: new EventEmitter<any>(),
        rowIndexChanged: new EventEmitter<IRowIndexChanged<any>>(),
      };
      var rows = [firstRow, secondRow, thirdRow];
      var rowsQueryList = jasmine.createSpyObj('rows', ['map', 'filter', 'forEach']);
      rowsQueryList.map.and.callFake((func) => rows.map(func));
      rowsQueryList.filter.and.callFake((func) => rows.filter(func));
      rowsQueryList.forEach.and.callFake((func) => rows.forEach(func));
      directive.rows = rowsQueryList;
    });

    describe('RowReorderButtonsComponent rowMovedUp event', () => {
      it('should call onRowMovedUp', () => {
        spyOn(directive, 'onRowMovedUp');
        secondRow.rowMovedUp.emit(secondRow.value);
        expect(directive.onRowMovedUp).toHaveBeenCalled();
      });
    })

    describe('RowReorderButtonsComponent rowMovedDown event', () => {
      it('should call onRowMovedDown', () => {
        spyOn(directive, 'onRowMovedDown');
        firstRow.rowMovedDown.emit(secondRow.value);
        expect(directive.onRowMovedDown).toHaveBeenCalled();
      });
    })

    describe('onRowMovedUp when second row is moved up', () => {
      it('should emit event with row moved up', () => {
        spyOn(directive.orderChanged, 'emit');
        directive.onRowMovedUp(secondRow.value);
        expect(directive.orderChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          orderedValues: jasmine.arrayWithExactContents([ secondRow.value, firstRow.value, thirdRow.value ])
        }))
      })
    })

    describe('onRowMovedUp when first row is moved down', () => {
      it('should emit event with row moved down', () => {
        spyOn(directive.orderChanged, 'emit');
        directive.onRowMovedDown(firstRow.value);
        expect(directive.orderChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          orderedValues: jasmine.arrayWithExactContents([ secondRow.value, firstRow.value, thirdRow.value ])
        }))
      })
    })

    describe('onRowIndexChanged when first row is moved last', () => {
      it('should emit event with row moved to last', () => {
        spyOn(directive.orderChanged, 'emit');
        directive.onRowIndexChanged({ newIndex: 2, value: firstRow.value });
        expect(directive.orderChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          orderedValues: jasmine.arrayWithExactContents([ secondRow.value, thirdRow.value, firstRow.value ])
        }))
      })
    })

    describe('given orderable rows change', () => {
      beforeEach(() => {
        var newRow = {
          value: 'newValue',
          rowMovedUp: new EventEmitter<any>(),
          rowMovedDown: new EventEmitter<any>(),
          rowIndexChanged: new EventEmitter<IRowIndexChanged<any>>(),
        };
        var rows = [ newRow ];
        var rowsQueryList = jasmine.createSpyObj('rows', ['map', 'filter', 'forEach']);
        rowsQueryList.map.and.callFake((func) => rows.map(func));
        rowsQueryList.filter.and.callFake((func) => rows.filter(func));
        rowsQueryList.forEach.and.callFake((func) => rows.forEach(func));
        directive.rows = rowsQueryList;
      });

      it('should ignore reorder events for old rows', () => {
        spyOn(directive, 'onRowMovedDown');
        firstRow.rowMovedDown.emit(firstRow.value);
        expect(directive.onRowMovedDown).not.toHaveBeenCalled();
      })
    });
  });
});
