export class BarcodeScanMessage {
  constructor(barcode: string) {
    this.barcode = barcode;
  }

  barcode: string;
}
