import { AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SvgiconComponent, ToastService } from '@omnicell/webcorecomponents';
import { EventEmitter } from 'protractor';
import { IBoundingBox } from '../../model/i-bounding-box';

@Component({
  selector: '[app-headered-content-control]',
  templateUrl: './headered-content-control.component.html',
  styleUrls: ['./headered-content-control.component.scss']
})
export class HeaderedContentControlComponent implements AfterViewInit {
  @Input()
  headerResourceKey: string;

  @Input()
  headerValue: string;

  @Input()
  headerFontWeight: number = 400;

  @Input()
  headerFontSizePx: number = 14;

  @Input()
  contentBackgroundColor: string;

  @ViewChild('header', { static: true })
  headerElement: ElementRef;

  @ViewChild('headerText', { static: true })
  headerTextElement: ElementRef;

  @ViewChild('content', { static: true })
  contentElement: ElementRef;

  @ViewChild('iconContainer', { static: true })
  iconContainerElement: ElementRef;

  @ContentChild(SvgiconComponent, { static: true })
  iconComponent: SvgiconComponent;

  constructor(
    private renderer: Renderer2,
  ) { }

  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.renderer.setStyle(this.headerElement.nativeElement, 'font-weight', this.headerFontWeight);
    this.renderer.setStyle(this.headerElement.nativeElement, 'font-size', `${this.headerFontSizePx}px`);
    if(this.contentBackgroundColor){
      this.renderer.setStyle(this.contentElement.nativeElement, 'background-color', this.contentBackgroundColor);
      this.renderer.setStyle(this.contentElement.nativeElement, 'border-radius', '5px');
      this.renderer.setStyle(this.contentElement.nativeElement, 'margin', '10px');
    }
    this.resetIconLocation();
  }

  /* istanbul ignore next */
  private resetIconLocation() {
    let iconOverlayBox: IBoundingBox = this.contentElement.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.iconContainerElement.nativeElement, 'top', `${iconOverlayBox.y - 50}px`);
    this.renderer.setStyle(this.iconContainerElement.nativeElement, 'left', `${iconOverlayBox.x + iconOverlayBox.width * (3 / 4) - 50 / 2}px`);
  }
}
