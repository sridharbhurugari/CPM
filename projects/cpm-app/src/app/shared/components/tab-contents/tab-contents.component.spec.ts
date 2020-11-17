import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabContentsComponent } from './tab-contents.component';

describe('TabContentsComponent', () => {
  let component: TabContentsComponent;
  let fixture: ComponentFixture<TabContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabContentsComponent ],
      providers: [
        { provide: ElementRef, useValue: { nativeElement: {} } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
