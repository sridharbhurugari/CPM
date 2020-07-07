import { Component, OnInit, HostListener, ElementRef, AfterViewInit, HostBinding, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-split-resize',
  templateUrl: './split-resize.component.html',
  styleUrls: ['./split-resize.component.scss']
})
export class SplitResizeComponent implements AfterViewInit {
  private _sideLeftBasis: number;
  private _width: number;
  private _left: number;

  sliding: boolean = false;
  sliderWidth: number;

  set sideLeftBasis(value: number){
    if(value < this.minSideWidth || this._width - this.sliderWidth - value < this.minSideWidth){
      return;
    }

    this._sideLeftBasis = value;
  }

  get sideLeftBasis(): number{
    return this._sideLeftBasis;
  }

  @Input()
  minSideWidth: number = 360;

  @Input()
  includeHeaderSpacer: boolean = false;

  @ViewChild('slider', { static: true })
  slider: ElementRef;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    var rect = this.elementRef.nativeElement.getBoundingClientRect() as ClientRect;
    this._width = rect.width;
    this._left = rect.left;
    this.sliderWidth = (this.slider.nativeElement.getBoundingClientRect() as ClientRect).width;
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.sliding = false;
  }

  @HostListener('mouseup')
  onMouseUp(){
    this.sliding = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(mouseEvent: MouseEvent){
    if(this.sliding){
      this.sideLeftBasis = mouseEvent.x - this._left;
    }
  }

  onSliderMouseDown(mouseEvent: MouseEvent){
    this.sliding = true;
    mouseEvent.preventDefault();
  }
}
