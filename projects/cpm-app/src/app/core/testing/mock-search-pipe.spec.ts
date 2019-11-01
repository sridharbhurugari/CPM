import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'searchPipe' })
export class MockSearchPipe implements PipeTransform {
  transform(allSearchData: any[], ...args: any[]) {
    return allSearchData;
  }
}