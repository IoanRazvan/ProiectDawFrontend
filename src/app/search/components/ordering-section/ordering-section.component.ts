import { Component, OnInit } from '@angular/core';
import { BookOrder } from 'src/app/constants/ordering.constants';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'ordering-section',
  templateUrl: './ordering-section.component.html',
})
export class OrderingSectionComponent implements OnInit {
  BookOrder = BookOrder;
  order: number = BookOrder.UPLOAD_TIME_DESCENDING;

  constructor(private service: SearchService) {}

  ngOnInit(): void {
      this.service.searchParams.subscribe(({order}) => this.order = order);
  }

  onOrderChange(event: any) {
    this.service.setOrder(Number(event.target.value));
  }
}
