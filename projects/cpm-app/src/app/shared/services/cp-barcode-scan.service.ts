import { Injectable, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { BarcodeScanService, LoggerService } from 'oal-core';

@Injectable({
  providedIn: 'root'
})
export class CpBarcodeScanService extends BarcodeScanService {

  nonBarcodeInputFocus: boolean = false;
  rawBarcodeMessage: string = '';
  renderer: Renderer2;

  constructor(
    _logger: LoggerService,
    ngZone: NgZone,
    private rendererFactory2: RendererFactory2
    ) {
    super(_logger, ngZone);
    this.renderer = this.rendererFactory2.createRenderer(null, null);
    this.renderer.listen('document', 'keypress', (evt: KeyboardEvent) => {
      this.onKeypressHandler(evt);
    });
  }

  ngOnit() {
  }

  onKeypressHandler(event: KeyboardEvent) {
    if (this.nonBarcodeInputFocus) {
      return;
    }

    const isInputComplete = this.handleKeyInput(event);

    // If not from barcode scanner ignore the character
    if (!this.isScannerInput()) {
      this.reset();
    }

    if (isInputComplete) {
      // populating the page level input into text box.
      this.rawBarcodeMessage = this.BarcodeInputCharacters;
      this.BarcodeScannedSubject.next(this.rawBarcodeMessage)
      this.reset();
    }
  }
}
