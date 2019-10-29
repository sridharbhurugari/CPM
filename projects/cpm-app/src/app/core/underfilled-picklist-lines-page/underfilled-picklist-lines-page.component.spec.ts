import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterModule, LayoutModule, ButtonActionModule } from '@omnicell/webcorecomponents';

import { UnderfilledPicklistLinesPageComponent } from './underfilled-picklist-lines-page.component';
import { UnderfilledPicklistLinesComponent } from '../underfilled-picklist-lines/underfilled-picklist-lines.component';
import { of } from 'rxjs';
import { UnderfilledPicklistLinesService } from '../../api-core/services/underfilled-picklist-lines.service';
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HeaderContainerComponent } from '../../shared/components/header-container/header-container.component';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';

@Pipe({
  name: 'translate'
})
class MockTranslatePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value + '_translated';
  }
}

describe('UnderfilledPicklistLinesPageComponent', () => {
  let component: UnderfilledPicklistLinesPageComponent;
  let fixture: ComponentFixture<UnderfilledPicklistLinesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderfilledPicklistLinesPageComponent, UnderfilledPicklistLinesComponent, MockTranslatePipe ],
      providers: [
        { provide: UnderfilledPicklistLinesService, useValue: { get: () => of([]) } },
        { provide: UnderfilledPicklistsService, useValue: { getForOrder: () => of() } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: { } }
      ],
      imports: [
        SharedModule, FooterModule, LayoutModule, ButtonActionModule
      ]
    })
    .overrideComponent(UnderfilledPicklistLinesComponent, {
      set: {
        template: ''
      }
    })
    .overrideComponent(HeaderContainerComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderfilledPicklistLinesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
