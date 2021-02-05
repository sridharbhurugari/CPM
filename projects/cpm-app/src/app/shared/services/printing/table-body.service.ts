import { Injectable } from '@angular/core';
import { ITableColumnDefintion } from './i-table-column-definition';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { TableCell, ContentTable } from 'pdfmake/interfaces';
import { fonts } from 'pdfmake/build/pdfmake';
import { ReportConstants} from '../../constants/report-constants';

@Injectable({
  providedIn: 'root'
})
export class TableBodyService {

  constructor(
    private translateService: TranslateService,
  ) { }

  buildTableBody<T>(columnDefinitions: ITableColumnDefintion<T>[], dataSource$: Observable<T[]>,customReportBodyFontSize:number=12): Observable<ContentTable> {
    const headerResourceKeys = columnDefinitions.map(x => x.headerResourceKey);
    const translatedHeadersObject$ = this.translateService.get(headerResourceKeys);
    const widths = columnDefinitions.map(x => x.width);

    const headerRow$ = translatedHeadersObject$.pipe(map<any, TableCell[]>(translatedHeadersObject => {
      return headerResourceKeys.map(headerKey => {
        return { text: translatedHeadersObject[headerKey], style: 'tableHeader'}
      });
    }),
    tap({
      next: val =>    console.log('headerRow$ on next', val),
      error: error => console.log('headerRow$ on error', error.message),
      complete: () => console.log('headerRow$ on complete')
    }), catchError(err => of(err.status)));

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
    }), catchError(err => of(err.status)));

    return forkJoin(headerRow$, dataSourceRows$).pipe(map(tableParts => {
      let tableBody: TableCell[][] = []
      tableBody.push(tableParts[0]);
      tableBody = tableBody.concat(tableParts[1]);


      return {
        layout: 'lightHorizontalLines',
        fontSize: customReportBodyFontSize,
        table: {
          headerRows: 1,
          dontBreakRows: true,
          widths: widths,
          body: tableBody,

        }
      };
    }), catchError(err => of(err.status)));
  }
}
