import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookDetails } from 'src/app/models/book.model';
import { ReviewData } from 'src/app/models/review.model';

@Component({
  selector: 'book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent {
  @Input() bookData !: BookDetails;
  @Output() onNewReview: EventEmitter<ReviewData> = new EventEmitter();
}
