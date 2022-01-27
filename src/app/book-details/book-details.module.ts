import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CommaSeparatedPipe } from './pipes/comma-separated.pipe';
import { RatingModule } from "primeng/rating";
import { FormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibraryAssignmentComponent } from './components/library-assignment/library-assignment.component';

@NgModule({
  declarations: [
    BookDetailsComponent,
    CommaSeparatedPipe,
    LibraryAssignmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RatingModule,
    FormsModule,
    MultiSelectModule,
    BrowserAnimationsModule
  ],
  exports: [
    BookDetailsComponent
  ]
})
export class BookDetailsModule { }
