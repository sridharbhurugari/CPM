
export class ItemPicklistLine implements ItemPicklistLine {
  constructor(itemPicklistLine: ItemPicklistLine) {
    Object.assign(this, itemPicklistLine);
  }

  DestinationId: string;
  ItemId: string;
  PicklistLineId: string;
  Qty: number;
  PickLocationDeviceLocationId: number;
  PickLocationDescription: string;

  static fromNonStandard(object: any): ItemPicklistLine {
    return new this({
      DestinationId: object.DestinationId,
      ItemId: object.ItemId,
      PicklistLineId: object.PicklistLineId,
      Qty: object.Qty,
      PickLocationDeviceLocationId: object.PickLocationDeviceLocationId,
      PickLocationDescription: object.PickLocationDescription
    });
  }
}
