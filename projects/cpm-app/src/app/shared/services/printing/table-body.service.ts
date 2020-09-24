import { Injectable } from '@angular/core';
import { ITableColumnDefintion } from './i-table-column-definition';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { TableCell, ContentTable } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TableBodyService {

  constructor(
    private translateService: TranslateService,
  ) { }

  buildTableBody<T>(columnDefinitions: ITableColumnDefintion<T>[], dataSource$: Observable<T[]>): Observable<ContentTable> {
    const headerResourceKeys = columnDefinitions.map(x => x.headerResourceKey);
    const translatedHeadersObject$ = this.translateService.get(headerResourceKeys);
    const widths = columnDefinitions.map(x => x.width);

    const headerRow$ = translatedHeadersObject$.pipe(map<any, TableCell[]>(translatedHeadersObject => {
      return headerResourceKeys.map(headerKey => {
        return { text: translatedHeadersObject[headerKey], style: 'tableHeader'}
      });
    }));

    const dataSourceRows$ = dataSource$.pipe(map<T[], TableCell[][]>((dataSourceRows) => {
      let compiledRows: TableCell[][] = [];
      dataSourceRows.forEach(row => {
        let rowCells: TableCell[] = [];
        columnDefinitions.forEach(c => {
          if (c.cellPropertyNames.length > 1) {
            let stackedValues = c.cellPropertyNames.map(prop => row[prop]).map(v => v && v.toString());
            rowCells.push({ stack: stackedValues });
          } else {
            rowCells.push(row[c.cellPropertyNames[0]]);
          }
        });
        compiledRows.push(rowCells);
      });

      return compiledRows;
    }));

    return forkJoin(headerRow$, dataSourceRows$).pipe(map(tableParts => {
      let tableBody: TableCell[][] = []
      tableBody.push(tableParts[0]);
      tableBody = tableBody.concat(tableParts[1]);
      return {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: widths,
          body: tableBody
        }
      };
    }));
  }
}
