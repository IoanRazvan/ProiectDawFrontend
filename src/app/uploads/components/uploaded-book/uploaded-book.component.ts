import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'uploaded-book',
  templateUrl: './uploaded-book.component.html'
})
export class UploadedBookComponent {
  @Input() book!: Book;
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  faTrash = faTrash;
  faEdit = faEdit;

  onEditClick() : boolean {
    this.onEdit.emit();
    return false;
  }

  onDeleteClick() : boolean {
    this.onDelete.emit(this.book.id);
    return false;
  }
}
