import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { DestockTypeInfoComponent } from './destock-typeinfo.component';

describe('DestockTypeInfoComponent ', () => {
  let component: DestockTypeInfoComponent ;
  let fixture: ComponentFixture<DestockTypeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestockTypeInfoComponent, MockTranslatePipe ],
    })
    .compileComponents();
  }));


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ DestockTypeInfoComponent],
      imports: [],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestockTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

