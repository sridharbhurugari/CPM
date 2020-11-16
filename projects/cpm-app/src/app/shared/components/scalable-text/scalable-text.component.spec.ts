import { Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalableTextComponent } from './scalable-text.component';

describe('ScalableTextComponent', () => {
  let component: ScalableTextComponent;
  let fixture: ComponentFixture<ScalableTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScalableTextComponent ],
      providers: [
        { provide: Renderer2, useValue: { setStyle: () => { } } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalableTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
