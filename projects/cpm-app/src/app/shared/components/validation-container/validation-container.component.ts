import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IBoundingBox } from '../../model/i-bounding-box';

@Component({
  selector: 'app-validation-container',
  templateUrl: './validation-container.component.html',
  styleUrls: ['./validation-container.component.scss']
})
export class ValidationContainerComponent implements AfterViewInit {
  
  @ViewChild('content', { static: true })
  contentElement: ElementRef;

  @ViewChild('iconContainer', { static: true })
  iconContainerElement: ElementRef;

  constructor(
    private renderer: Renderer2,
  ) { }

  ngAfterViewInit(): void {
    this.resetIconLocation();
  }

  /* istanbul ignore next */
  private resetIconLocation() {
    let iconOverlayBox: IBoundingBox = this.contentElement.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.iconContainerElement.nativeElement, 'top', `${iconOverlayBox.y - 50}px`);
    this.renderer.setStyle(this.iconContainerElement.nativeElement, 'left', `${iconOverlayBox.x + iconOverlayBox.width * (1 / 4) - 50 / 2}px`);
  }
}
