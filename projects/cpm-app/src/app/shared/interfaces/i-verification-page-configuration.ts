import { IColHeaderSortChanged } from '../events/i-col-header-sort-changed';

export interface IVerificationPageConfiguration {
  searchTextFilter: string;
  colHeaderSort: IColHeaderSortChanged;
}
