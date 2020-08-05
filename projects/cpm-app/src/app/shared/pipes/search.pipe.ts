import { Pipe, PipeTransform } from '@angular/core';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';

@Pipe({ name: 'searchPipe' })
export class SearchPipe implements PipeTransform {
  transform(allSearchData: IDeviceReplenishmentNeed[], searchTxt: string, searchProperties?: string[]): IDeviceReplenishmentNeed[];
  transform(allSearchData: any[], searchTxt: string, searchProperties?: string[]): any[] {
    if (!searchTxt || !searchTxt.trim() || allSearchData.length < 1) {
      return allSearchData;
    }

    if(!searchProperties){
      searchProperties = Object.keys(allSearchData[0]);
    }

    return allSearchData.filter(searchItem => {
      let returnVal = false;
      searchProperties.forEach((key) => {
        if (String(searchItem[key]).toLocaleLowerCase().indexOf(searchTxt.toLocaleLowerCase()) > -1) {
          returnVal = true;
          return;
        }
      });
      return returnVal;
    });
  }
}