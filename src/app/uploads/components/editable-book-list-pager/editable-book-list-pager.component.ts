import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageInfo } from 'src/app/models/page.model';
import { UploadsService } from '../../services/uploads.service';

@Component({
  selector: 'editable-book-list-pager',
  templateUrl: './editable-book-list-pager.component.html',
})
export class EditableBookListPagerComponent implements OnChanges {
  @Input() pageInfo!: PageInfo;
  isFirstPage!: boolean;
  isLastPage!: boolean;
  currentQuery!: string;

  constructor(private service: UploadsService) {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.isFirstPage = changes['pageInfo'].currentValue.currentPageNumber === 0;
    this.isLastPage = changes['pageInfo'].currentValue.currentPageNumber === changes['pageInfo'].currentValue.lastPageNumber;
  }

  changePage(pageNumber: number) : boolean {
    this.service.changePage(pageNumber);
    return false;
  }
}
