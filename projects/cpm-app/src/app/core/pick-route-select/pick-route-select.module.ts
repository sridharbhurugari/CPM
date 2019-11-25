import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@omnicell/webcorecomponents';
import { PickRouteSelectComponent } from './pick-route-select.component';

@NgModule({
  imports: [CommonModule, FormsModule, GridModule],
  declarations: [PickRouteSelectComponent],
  exports: [PickRouteSelectComponent]
})
export class PickRouteSelectModule {}
