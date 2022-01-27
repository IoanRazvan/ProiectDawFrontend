import { Component, Input } from '@angular/core';
import { BookDetails } from 'src/app/models/book.model';

@Component({
  selector: 'book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent {
  @Input() bookData !: BookDetails;
}
