import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { of, Subject } from "rxjs";
import { MockTranslatePipe } from "../testing/mock-translate-pipe.spec";
import { MockSearchBox } from "../testing/mock-search-box.spec";
import { MockSearchPipe } from "../testing/mock-search-pipe.spec";
import { MockAppHeaderContainer } from "../testing/mock-app-header.spec";
import { TranslateService } from "@ngx-translate/core";
import { PrepackVerificationService } from "../../api-core/services/prepack-verification.service";
import { MockCpClickableIconComponent } from "../../shared/testing/mock-cp-clickable-icon.spec";
import { GridModule } from "@omnicell/webcorecomponents";
import { Router } from "@angular/router";
import { WpfInteropService } from "../../shared/services/wpf-interop.service";
import { WindowService } from "../../shared/services/window-service";
import { IColHeaderSortChanged } from "../../shared/events/i-col-header-sort-changed";

import { PrepackVerificationQueueComponent } from "./prepack-verification-queue.component";
import { IPrepackVerificationQueueItem } from "../../api-core/data-contracts/i-prepack-verification-queue-item";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PrepackVerificationQueueItem } from "../model/prepack-verification-queue-item";
/*
describe("PrepackVerificationQueueComponent", () => {
  let router;
  let event: IColHeaderSortChanged = {
    ColumnPropertyName: "OrderId",
    SortDirection: "asc",
  };
  let component: PrepackVerificationQueueComponent;
  let fixture: ComponentFixture<PrepackVerificationQueueComponent>;
  let translateService: Partial<TranslateService>;
  let prepackVerificationService: Partial<PrepackVerificationService>;

  const verificationQueueItem1: IPrepackVerificationQueueItem = {
    PrepackVerificationQueueId: 1,
    ItemId: "itemId",
    ItemDescription: "ItemDescription",
    DeviceId: 1,
    DeviceDescription: "deviceDescription",
    QuantityToPackage: 1,
    PackagedDate: new Date(),
  } as IPrepackVerificationQueueItem;

  beforeEach(async () => {
    router = { navigate: () => { } };
    spyOn(router, 'navigate');
    translateService = {
      get: jasmine.createSpy("get").and.returnValue(of(translateService)),
    };
    prepackVerificationService = {
      getPrepackQueueData: jasmine
        .createSpy("getPrepackQueueData")
        .and.returnValue(of([verificationQueueItem1])),
      deletePrepackQueueVerification: jasmine
        .createSpy("deletePrepackQueueVerification")
        .and.returnValue(of(1)),
    };

    await TestBed.configureTestingModule({
      declarations: [
        PrepackVerificationQueueComponent,
        MockTranslatePipe,
        MockSearchBox,
        MockSearchPipe,
        MockCpClickableIconComponent,
        MockAppHeaderContainer,
        MockCpClickableIconComponent,
      ],
      imports: [GridModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PrepackVerificationService,
          useValue: prepackVerificationService,
        },
        { provide: Router, useValue: router },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        {
          provide: WpfInteropService,
          useValue: { wpfViewModelActivated: new Subject() },
        },
        { provide: WindowService, useValue: { getHash: () => "" } },

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepackVerificationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("on Delete calls loadPrepackVerificationQueueItems", () => {
    const spy = spyOn<any>(component, "loadPrepackVerificationQueueItems");
    component.onDeleteClick(verificationQueueItem1);
    expect(component["loadPrepackVerificationQueueItems"]).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

    it('should navigate', () => {
      const rowClicked: PrepackVerificationQueueItem = ( {PrepackVerificationQueueId: 1} as Partial<PrepackVerificationQueueItem>) as PrepackVerificationQueueItem ;
      component.NavigateToPrepackVerificationDetailsPage(rowClicked);
      expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.stringMatching('core/prepackVerificationDetail/')]));
  });
});
*/
