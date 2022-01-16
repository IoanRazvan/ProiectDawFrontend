import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { PageInfo } from 'src/app/models/page.model';
import { UploadsService } from '../../services/uploads.service';

@Component({
  selector: 'edit-uploads-section',
  templateUrl: './edit-uploads-section.component.html'
})
export class EditUploadsSectionComponent implements OnInit {
  books: Book[] = [];
  pageInfo!: PageInfo;
  pageLoading: boolean = true;
  errorMessage = '';

  constructor(private service: UploadsService) {
  }

  ngOnInit(): void {
    this.service.loading.subscribe((isLoading) => {
      this.pageLoading = isLoading;
    });

    this.service.clientPage.subscribe({
      next: (page) => {
        this.books = page.result;
        this.pageInfo = { currentPageNumber: page.currentPageNumber + 1, lastPageNumber: page.lastPageNumber + 1 };
      },
      error: () => {
        this.errorMessage = 'Unable to fetch uploads';
        console.log(this.errorMessage);
      }
    });
  }

  onPageChange(pageNumber: number) {
    this.service.changePage(pageNumber - 1);
  }
}
