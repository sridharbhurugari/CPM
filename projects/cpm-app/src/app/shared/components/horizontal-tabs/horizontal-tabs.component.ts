import { AfterViewInit, Component, ContentChildren, Input, QueryList, Renderer2 } from '@angular/core';
import { Guid } from 'guid-typescript';
import { TabContentsComponent } from '../tab-contents/tab-contents.component';

@Component({
  selector: 'app-horizontal-tabs',
  templateUrl: './horizontal-tabs.component.html',
  styleUrls: ['./horizontal-tabs.component.scss']
})
export class HorizontalTabsComponent implements AfterViewInit {
  @Input()
  tabHeaderResourceKeys: string[]

  @Input()
  selectedTab: string;

  @ContentChildren(TabContentsComponent)
  tabContentsComponents: QueryList<TabContentsComponent>;

  tabGroupName: string;
  renderer: Renderer2;

  constructor(
    renderer: Renderer2,
  ) {
    this.renderer = renderer;
    this.tabGroupName = Guid.create().toString();
  }

  ngAfterViewInit(): void {
    if(this.selectedTab){
      this.tabSelected(this.selectedTab);
    }
  }

  tabSelected(tabKey: string){
    this.selectedTab = tabKey;
    this.tabContentsComponents.forEach(c => {
      if(c.tabKey === tabKey){
        this.renderer.setStyle(c.nativeElement, 'display', 'block');
      }else{
        this.renderer.setStyle(c.nativeElement, 'display', 'none');
      }
    });
  }

  ngOnInit() {
  }

}
