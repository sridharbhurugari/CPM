import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppShellComponent } from './app-shell.component';
import { ProgressAnimationModule } from '@omnicell/webcorecomponents';
import { Router } from '@angular/router';

describe('AppShellComponent', () => {
  let component: AppShellComponent;
  let fixture: ComponentFixture<AppShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ProgressAnimationModule,
      ],
      declarations: [ AppShellComponent ],
      providers: [
        { provide: Router, useValue: { events: { subscribe: () => {} } } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
