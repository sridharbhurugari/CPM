import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { SearchPipe } from './pipes/search.pipe';
import { SearchModule } from '@omnicell/webcorecomponents';



@NgModule({
  declarations: [HeaderContainerComponent, SearchPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    SearchModule,
  ],
  exports: [
    HeaderContainerComponent,
    SearchPipe,
  ]
})
export class SharedModule { }
