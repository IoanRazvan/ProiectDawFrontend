import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReadingComponent } from './book-reading.component';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    BookReadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    PdfViewerModule
  ],
  exports: [
    BookReadingComponent
  ]
})
export class BookReadingModule { }
