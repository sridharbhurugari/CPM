import { Guid } from 'guid-typescript';
import { ExpirationDateGranularity } from '../../shared/model/expiration-date-granularity';
import { IDeviceLocation } from './i-device-location';

export interface IItemLocationDetail {
        ItemId: string;
        ItemTradeName: string;
        ItemFormattedGenericName: string;
        UnitOfIssue: string;
        QuantityOnHand: number;
        ExpirationDate: string;
        ExpirationDateGranularity: ExpirationDateGranularity;
        LocationDescription: string;
        DeviceLocationId: number;
        DeviceId: number;
        DeviceDescription: string;
        DeviceType: string;
        PackageFormType: string;
        PackageFormName: string;
        DeviceOwnerShortName: string;
        DeviceDefaultOwner: Guid;
        CarouselDisplayQuantity: number;
        Description: string;
        Quantity: number;
        DeviceLocation: IDeviceLocation;
}