import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { UploadsService } from '../../services/uploads.service';

@Component({
  selector: 'editable-book',
  templateUrl: './editable-book.component.html'
})
export class EditableBookComponent {
  @Input() book!: Book;
  editFormOpen = false;
  errorMessage = '';

  constructor(private service : UploadsService) {
  }

  onEditClick() {
    this.editFormOpen = true;
  }

  onBookFormCancelClick() {
    this.editFormOpen = false;
  }

  onDeleteClick(bookId: string) {
    this.service.deleteBook(bookId).subscribe({
      error: (err) => {console.log(err); this.errorMessage ='Unabled to delete book';}
    })
  }

  onUpdateSuccessful() {
    this.editFormOpen = false;
  }
}
