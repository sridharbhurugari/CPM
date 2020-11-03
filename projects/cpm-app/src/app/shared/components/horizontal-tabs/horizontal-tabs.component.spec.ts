import { QueryList, Renderer2, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';
import { TabContentsComponent } from '../tab-contents/tab-contents.component';

import { HorizontalTabsComponent } from './horizontal-tabs.component';

describe('HorizontalTabsComponent', () => {
  let component: HorizontalTabsComponent;
  let fixture: ComponentFixture<HorizontalTabsComponent>;
  let renderer: Partial<Renderer2>;

  beforeEach(async(() => {
    renderer = {
      setStyle: jasmine.createSpy('setStyle')
    };
    TestBed.configureTestingModule({
      declarations: [ 
        HorizontalTabsComponent,
        MockTranslatePipe,
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.renderer = renderer as Renderer2;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with tabContentsComponents', () => {
    let firstTab: Partial<TabContentsComponent>;
    let secondTab: Partial<TabContentsComponent>;
    beforeEach(() => {
      firstTab = { tabKey: 'first', nativeElement: { } };
      secondTab = { tabKey: 'second', nativeElement: { } };
      let tabContents = [ firstTab, secondTab ];
      let contentChildren = jasmine.createSpyObj('tabContents', ['forEach']);
      contentChildren.forEach.and.callFake((func) => tabContents.forEach(func));
      component.tabContentsComponents = contentChildren;
    });
    describe('tabSelected with first tab', () => {
      beforeEach(() => {
        component.tabSelected(firstTab.tabKey);
      });
      it('should set selected TabContentsComponent to display block', () => {
        expect(renderer.setStyle).toHaveBeenCalledWith(firstTab.nativeElement, 'display', 'block');
      });
      it('should set other TabContentsComponent to display none', () => {
        expect(renderer.setStyle).toHaveBeenCalledWith(secondTab.nativeElement, 'display', 'none');
      });
    });
  })
});
