import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Component, Input, ViewChild } from '@angular/core';
import { IBoundingBox } from '../../model/i-bounding-box';

@Component({
  selector: 'app-scalable-text',
  templateUrl: './scalable-text.component.html',
  styleUrls: ['./scalable-text.component.scss']
})
export class ScalableTextComponent implements AfterViewInit {

  @Input()
  textValue: string;

  @ViewChild('svgContainer', { static: true })
  svgContainer: ElementRef;

  @ViewChild('textBox', { static: true })
  textBox: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    let textBounds: IBoundingBox = this.textBox.nativeElement.getBBox();
    let viewBoxString = `${textBounds.x} ${textBounds.y} ${textBounds.width} ${textBounds.height}`;
    this.renderer.setAttribute(this.svgContainer.nativeElement, 'viewBox', viewBoxString);
    this.renderer.setStyle(this.svgContainer.nativeElement, 'height', `${textBounds.height}px`);
  }
}
