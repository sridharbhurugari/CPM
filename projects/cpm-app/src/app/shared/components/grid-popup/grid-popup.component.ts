import { AfterViewChecked, Component, ElementRef, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { IPopupWindowContainer } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { IGridPopupData } from '../../model/i-grid-popup-data';

@Component({
  selector: 'app-grid-popup',
  templateUrl: './grid-popup.component.html',
  styleUrls: ['./grid-popup.component.scss']
})
export class GridPopupComponent<T> implements OnInit, AfterViewChecked, IPopupWindowContainer {

  @Output() dismiss: Subject<boolean> = new Subject<boolean>();

  @ViewChild('gridHeader', {read: ElementRef, static:false}) gridHeader: ElementRef
  @ViewChild('gridBody', {read: ElementRef, static:false}) gridBody: ElementRef

  data: IGridPopupData<T>; // T is the type that will be used for the grid

  private readonly _whiteHex = "#FFFFFF";
  private readonly _lightGreyHex = "#E9E9E9";
  private readonly _scrollBarWidth = "58px";
  private _gridSizeChecked = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if(!this._gridSizeChecked && this.isGridRendered()) {
      this.resizeGrid();
      this._gridSizeChecked = true;
    }
  }

  cancel(): void {
    this.dismiss.next(false);
  }

  primaryButtonClick(): void {
    this.dismiss.next(true);
  }

  secondaryButtonClick(): void {
    this.dismiss.next(false);
  }

  getGridColumnWidths(): string {
    let styleString = [];
    this.data.columnDefinition.forEach((column) => {
      styleString.push(column.width);
    });

    return styleString.join(' ');
  }

  getRowColor(index): string {
    return index % 2 === 0 ? this._whiteHex: this._lightGreyHex;
  }

   /* istanbul ignore next */
  private isGridRendered(): boolean {
    return (this.gridBody && this.gridHeader && this.gridBody.nativeElement.clientHeight !== 0);
  }

   /* istanbul ignore next */
  private resizeGrid(): void {
    if(!this.gridBody || !this.gridHeader || this.gridBody.nativeElement.clientHeight === 0) return;

    const isGridBodyScrollBar = this.gridBody.nativeElement.scrollHeight > this.gridBody.nativeElement.clientHeight;
    if( isGridBodyScrollBar) {
      this.renderer.setStyle(this.gridHeader.nativeElement, 'padding-right', this._scrollBarWidth);
    }
  }
}
