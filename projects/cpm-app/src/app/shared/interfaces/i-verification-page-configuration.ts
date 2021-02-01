import { IColHeaderSortChanged } from '../events/i-col-header-sort-changed';

export interface IVerificationPageConfiguration {
  searchTextFilterOrder: string;
  colHeaderSortOrder: IColHeaderSortChanged;
  searchTextFilterDestination: string;
  colHeaderSortDestination: IColHeaderSortChanged;
}
