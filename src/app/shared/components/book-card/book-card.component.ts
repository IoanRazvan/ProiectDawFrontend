import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html'
})
export class BookCardComponent implements OnInit {
  @Input() bookData!: Book;
  @Input() showGenres = true;

  constructor() { }

  ngOnInit(): void {
  }

}
