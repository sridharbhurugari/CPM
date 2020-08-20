import { Injectable } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { TDocumentDefinitions } from 'pdfmake/interfaces'

@Injectable({
  providedIn: 'root'
})
export class PdfMakeService {

  constructor() { }

  createPdf(documentDefinitions: TDocumentDefinitions): pdfMake.TCreatedPdf {
    return pdfMake.createPdf(documentDefinitions, null, null, pdfFonts.pdfMake.vfs);
  }
}
