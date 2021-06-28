import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepackVerificationSelectionComponent } from './prepack-verification-selection.component';
import { MockCpClickableIconComponent } from "../../shared/testing/mock-cp-clickable-icon.spec";
import { PrepackVerificationSelectionCacheService } from '../utilities/prepack-verification-selection-cache.service';
import { of } from 'rxjs';
import { GridModule } from '@omnicell/webcorecomponents';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { Router } from "@angular/router";
import { PrepackVerificationQueueItem } from '../model/prepack-verification-queue-item';

describe('PrepackVerificationSelectionComponent', () => {
  let component: PrepackVerificationSelectionComponent;
  let fixture: ComponentFixture<PrepackVerificationSelectionComponent>;

  let prepackVerificationQueueItems = new Array<PrepackVerificationQueueItem>();
  let prepackVerificationQueueItem = new PrepackVerificationQueueItem({
    PrepackVerificationQueueId: 1,
    ItemId: "test",
    ItemDescription: "test",
    DeviceId: 1,
    DeviceDescription: "test",
    QuantityToPackage: 2,
    PackagedDate: new Date(),
    DrugIdentifier: "test",
    PrepackLotNumber: "test",
    PrepackExpirationDate: new Date()
   });
   prepackVerificationQueueItems.push(prepackVerificationQueueItem);

  let prepackVerificationSelectionCacheService: Partial<PrepackVerificationSelectionCacheService>;
  prepackVerificationSelectionCacheService = {
    Get: jasmine
      .createSpy("Get")
      .and.returnValue(prepackVerificationQueueItems)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepackVerificationSelectionComponent,
                      MockCpClickableIconComponent,
                      MockTranslatePipe ],
      imports: [GridModule],
      schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: PrepackVerificationSelectionCacheService, useValue: prepackVerificationSelectionCacheService },
          { provide: Router, useValue: { navigate: () => { } } },
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepackVerificationSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should set the PrepackVerificationQueueItems", () => {
    expect(prepackVerificationQueueItems.length).toBeTruthy();
  });

});

