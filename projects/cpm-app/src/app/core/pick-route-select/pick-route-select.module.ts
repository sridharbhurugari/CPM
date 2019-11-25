import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormStatusImageModule } from '@omnicell/webcorecomponents/esm5/lib/form-status-image/form-status-image.module';
import { GridModule } from '@omnicell/webcorecomponents';
import { PickRouteSelectComponent } from './pick-route-select.component';

@NgModule({
  imports: [CommonModule, FormsModule, FormStatusImageModule, GridModule],
  declarations: [PickRouteSelectComponent],
  exports: [PickRouteSelectComponent]
})
export class PickRouteSelectModule {}
