import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UploadsComponent } from './uploads.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { EditableBookComponent } from './components/editable-book/editable-book.component';
import { EditableBookListPagerComponent } from './components/editable-book-list-pager/editable-book-list-pager.component';
import { UploadsService } from './services/uploads.service';
import { RouterModule } from '@angular/router';
import { UploadedBookComponent } from './components/uploaded-book/uploaded-book.component';
import { BookFormSelectComponent } from './components/book-form-select/book-form-select.component';
import { TitleSearchBarComponent } from './components/title-search-bar/title-search-bar.component';
import { EditUploadsSectionComponent } from './components/edit-uploads-section/edit-uploads-section.component';
import { LoadingSuccessErrorComponent } from './components/loading-success-error/loading-success-error.component';


@NgModule({
  declarations: [
    UploadsComponent,
    BookFormComponent,
    EditableBookComponent,
    EditableBookListPagerComponent,
    UploadedBookComponent,
    BookFormSelectComponent,
    TitleSearchBarComponent,
    EditUploadsSectionComponent,
    LoadingSuccessErrorComponent
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
