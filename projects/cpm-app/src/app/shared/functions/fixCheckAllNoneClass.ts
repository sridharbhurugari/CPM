import { ElementRef } from '@angular/core';

export function fixCheckAllNoneClass(headerCheckContainer: ElementRef<any>) {
    headerCheckContainer.nativeElement.className = 'first';
}