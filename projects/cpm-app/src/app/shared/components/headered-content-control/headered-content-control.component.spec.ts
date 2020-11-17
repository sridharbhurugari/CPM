import { Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';

import { HeaderedContentControlComponent } from './headered-content-control.component';

describe('HeaderedContentControlComponent', () => {
  let component: HeaderedContentControlComponent;
  let fixture: ComponentFixture<HeaderedContentControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HeaderedContentControlComponent,
        MockTranslatePipe,
      ],
      providers: [
        { provide: Renderer2, useValue: { setStyle: () => { } } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderedContentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
