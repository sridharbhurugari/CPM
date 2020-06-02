import { PopupDialogProperties } from '@omnicell/webcorecomponents';
import { Observable, of } from 'rxjs';
import { PopupDialogComponent } from '@omnicell/webcorecomponents';
import { EventEmitter } from '@angular/core';

export class PopupDialogServiceStub {

    show(properties: PopupDialogProperties): Observable<any> {
        return of({});
    }

    showOnce(properties: PopupDialogProperties): Partial<PopupDialogComponent> {
        return {
            didClickPrimaryButton: new EventEmitter<string>(),
            didClickSecondaryButton: new EventEmitter<string>(),
            didClickCloseButton: new EventEmitter<string>(),
            didTimeoutDialog: new EventEmitter<string>(),

        };
    }
}
