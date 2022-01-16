import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageInfo } from 'src/app/models/page.model';

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
})
export class PagerComponent implements OnChanges {
  @Input() pageInfo!: PageInfo;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
  isFirstPage!: boolean;
  isLastPage!: boolean;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.isFirstPage = changes['pageInfo'].currentValue.currentPageNumber === 1;
    this.isLastPage = changes['pageInfo'].currentValue.currentPageNumber === changes['pageInfo'].currentValue.lastPageNumber;
  }

  changePage(pageNumber: number) : boolean {
    this.onPageChange.emit(pageNumber);
    return false;
  }
}
