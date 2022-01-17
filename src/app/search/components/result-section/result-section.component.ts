import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { PageInfo } from 'src/app/models/page.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'result-section',
  templateUrl: './result-section.component.html'
})
export class ResultSectionComponent implements OnInit {
  books: Book[] = [];
  pageInfo!: PageInfo;

  constructor(private service: SearchService) {}

  ngOnInit(): void {
    this.service.clientPage.subscribe((clientPage) => {
      this.books = clientPage.result;
      this.pageInfo = {currentPageNumber: clientPage.currentPageNumber + 1, lastPageNumber: clientPage.lastPageNumber + 1};
    });
  }

  onPageChange(pageNumber: number) {
    this.service.setPageNumber(pageNumber - 1);
  }
}
