import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UploadsComponent } from './uploads.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { UploadsService } from './services/uploads.service';
import { BookFormSelectComponent } from './components/book-form-select/book-form-select.component';
import { LoadingSuccessErrorComponent } from './components/loading-success-error/loading-success-error.component';


@NgModule({
  declarations: [
    UploadsComponent,
    BookFormComponent,
    BookFormSelectComponent,
    LoadingSuccessErrorComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    UploadsComponent
  ],
  providers: [
    UploadsService
  ]
})
export class UploadsModule { }
