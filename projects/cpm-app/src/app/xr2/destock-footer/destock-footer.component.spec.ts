import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { FooterModule, ButtonActionModule } from '@omnicell/webcorecomponents';

import { DestockFooterComponent } from './destock-footer.component';

describe('DestockFooterComponent', () => {
  let component: DestockFooterComponent;
  let fixture: ComponentFixture<DestockFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestockFooterComponent, MockTranslatePipe ],      
      imports: [    
        ButtonActionModule,        
        FooterModule,        
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestockFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
