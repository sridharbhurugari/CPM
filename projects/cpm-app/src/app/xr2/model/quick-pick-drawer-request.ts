export class QuickPickDrawerRequest {
  constructor(doorId: number, barcode: string) {
    this.DoorId = doorId;
    this.Barcode = barcode;
  }

  DoorId: number;
  Barcode: string;

}
