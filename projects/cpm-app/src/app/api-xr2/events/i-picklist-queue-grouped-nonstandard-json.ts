import { Guid } from 'guid-typescript';
import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { OutputDevice } from '../data-contracts/output-device';

export interface IPicklistQueueGroupedNonstandardJson {
    DeviceLocationId: number;
    PriorityCode: string;
    PriorityCodeColor: string;
    Destination: string;
    DestinationType: string;
    PriorityCodeDescription: string;
    DeviceDescription: string;
    DeviceId: number;
    AvailableOutputDeviceList: NonstandardJsonArray<OutputDevice>;
    OutputDeviceId: string;
    SequenceOrder: number;
    NewCount: number;
    ReleasedCount: number;
    AreaCount: number;
    UnsentPickListLineIds: Array<Guid>;
    PickPriorityIdentity: number;
  }
