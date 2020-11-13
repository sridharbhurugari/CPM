import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { IItemPicklistLine } from '../data-contracts/i-item-picklist-line';
import { OutputDevice } from '../data-contracts/output-device';
import { Guid } from 'guid-typescript';

export interface IPicklistQueueItemNonstandardJson {
    PicklistId: string;
    OrderId: string;
    DeviceLocationId: number;
    ItemPicklistLines: NonstandardJsonArray<IItemPicklistLine>;
    PriorityCode: string;
    PriorityCodeColor: string;
    Destination: string;
    OrderGroupDestinationId: string;
    DestinationType: string;
    PriorityCodeDescription: string;
    BoxCount: number;
    FilledBoxCount: number;
    Status: number;
    StatusDisplay: string;
    DeviceDescription: string;
    DeviceId: number;
    AvailableOutputDeviceList: NonstandardJsonArray<OutputDevice>;
    OutputDeviceId: string;
    ItemCount: number;
    IsPrintable: boolean;
    RobotPickGroupId: Guid;
    SequenceOrder: number;
    OrderDate: Date;
    PatientCount: number;
    PickPriorityIdentity: number;
  }
