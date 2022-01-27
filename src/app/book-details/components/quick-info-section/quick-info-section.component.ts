import { Component, Input } from '@angular/core';
import { BookDetails } from 'src/app/models/book.model';

@Component({
  selector: 'quick-info-section',
  templateUrl: './quick-info-section.component.html'
})
export class QuickInfoSectionComponent {
  @Input() bookData !: BookDetails;
}
