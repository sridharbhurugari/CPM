import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { TranslateService } from '@ngx-translate/core';
import { PrepackVerificationService } from '../../api-core/services/prepack-verification.service';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { GridModule } from '@omnicell/webcorecomponents';
import { Router } from '@angular/router';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { WindowService } from '../../shared/services/window-service';

import { PrepackVerificationQueueComponent } from './prepack-verification-queue.component';

describe('PrepackVerificationQueueComponent', () => {
  let routerMock: Partial<Router> = { navigate : (c, n) => of<boolean>().toPromise() };
  let component: PrepackVerificationQueueComponent;
  let fixture: ComponentFixture<PrepackVerificationQueueComponent>;
  let translateService: Partial<TranslateService>;
  let prepackVerificationService: Partial<PrepackVerificationService>

  beforeEach(async(() => {
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService))
    };
    prepackVerificationService = {
      getPrepackQueueData: jasmine.createSpy('getPrepackQueueData').and.returnValue(of(PrepackVerificationService))
    };

    TestBed.configureTestingModule({
      declarations: [ 
        PrepackVerificationQueueComponent,
        MockTranslatePipe,
        MockSearchBox,
        MockSearchPipe,
        MockColHeaderSortable,
        MockAppHeaderContainer,
        MockCpClickableIconComponent ],
        imports: [          
          GridModule
        ],
      providers: [        
        { provide: PrepackVerificationService, useValue: prepackVerificationService},
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() } },
        { provide: WindowService, useValue: { getHash: () => '' } },
        { provide: Router, routerMock },        
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepackVerificationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
