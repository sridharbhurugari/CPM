import { Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';

import { HorizontalTabsComponent } from './horizontal-tabs.component';

describe('HorizontalTabsComponent', () => {
  let component: HorizontalTabsComponent;
  let fixture: ComponentFixture<HorizontalTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HorizontalTabsComponent,
        MockTranslatePipe,
      ],
      providers: [
        { provide: Renderer2, useValue: { setStyle: () => { } } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
