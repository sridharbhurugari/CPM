import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { SearchPipe } from './pipes/search.pipe';



@NgModule({
  declarations: [HeaderContainerComponent, SearchPipe],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    HeaderContainerComponent,
    SearchPipe,
  ]
})
export class SharedModule { }
