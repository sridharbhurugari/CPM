import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { SearchPipe } from './pipes/search.pipe';
import { ColHeaderSortableComponent } from './components/col-header-sortable/col-header-sortable.component';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconModule } from '@omnicell/webcorecomponents';



@NgModule({
  declarations: [HeaderContainerComponent, SearchPipe, ColHeaderSortableComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    SvgIconModule,
  ],
  exports: [
    HeaderContainerComponent,
    ColHeaderSortableComponent,
    SearchPipe,
  ]
})
export class SharedModule { }
