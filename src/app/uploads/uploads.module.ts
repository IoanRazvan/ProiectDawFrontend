import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UploadsComponent } from './uploads.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { EditableBookComponent } from './components/editable-book/editable-book.component';
import { UploadsService } from './services/uploads.service';
import { RouterModule } from '@angular/router';
import { UploadedBookComponent } from './components/uploaded-book/uploaded-book.component';
import { BookFormSelectComponent } from './components/book-form-select/book-form-select.component';
import { EditUploadsSectionComponent } from './components/edit-uploads-section/edit-uploads-section.component';


@NgModule({
  declarations: [
    UploadsComponent,
    BookFormComponent,
    EditableBookComponent,
    UploadedBookComponent,
    BookFormSelectComponent,
    EditUploadsSectionComponent,
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    UploadsComponent
  ],
  providers: [
    UploadsService
  ]
})
export class UploadsModule { }
