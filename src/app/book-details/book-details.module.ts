import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details.component';
import { SharedModule } from '../shared/shared.module';
import { CommaSeparatedPipe } from './pipes/comma-separated.pipe';
import { RatingModule } from "primeng/rating";
import { FormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibraryAssignmentComponent } from './components/library-assignment/library-assignment.component';
import { QuickInfoSectionComponent } from './components/quick-info-section/quick-info-section.component';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BookDetailsRoutingModule } from './book-details-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BookContentComponent } from './components/book-content/book-content.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';

@NgModule({
  declarations: [
    BookDetailsComponent,
    CommaSeparatedPipe,
    LibraryAssignmentComponent,
    QuickInfoSectionComponent,
    CommentsSectionComponent,
    BookInfoComponent,
    BookContentComponent,
    CommentFormComponent,
    CommentCardComponent
  ],
  imports: [
    CommonModule,
    BookDetailsRoutingModule,
    SharedModule,
    BrowserModule,
    RatingModule,
    FormsModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    PdfViewerModule
  ],
  exports: [
    BookDetailsComponent
  ],
})
export class BookDetailsModule { }
