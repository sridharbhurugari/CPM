import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderContainerComponent } from './components/header-container/header-container.component';



@NgModule({
  declarations: [HeaderContainerComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HeaderContainerComponent
  ]
})
export class SharedModule { }
