import { IColHeaderSortChanged } from '../events/i-col-header-sort-changed';
import { SelectableDeviceInfo } from '../model/selectable-device-info';

export interface IXr2QueuePageConfiguration {
  selectedDevice: SelectableDeviceInfo;
  searchTextFilter: string;
  colHeaderSort: IColHeaderSortChanged;
}
