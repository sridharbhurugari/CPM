import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistsComponent } from './underfilled-picklists.component';
import { TranslateModule } from '@ngx-translate/core';
import { GridModule } from '@omnicell/webcorecomponents';

describe('UnderfilledPicklistsComponent', () => {
  let component: UnderfilledPicklistsComponent;
  let fixture: ComponentFixture<UnderfilledPicklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderfilledPicklistsComponent ],
      imports: [ GridModule, TranslateModule.forChild() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderfilledPicklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
