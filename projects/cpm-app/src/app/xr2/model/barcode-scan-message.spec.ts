import { BarcodeScanMessage } from './barcode-scan-message';

describe('BarcodeScanMessage', () => {
  it('should create an instance', () => {
    expect(new BarcodeScanMessage(null)).toBeTruthy();
  });
});
