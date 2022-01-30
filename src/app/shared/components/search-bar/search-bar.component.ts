import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UploadsService } from '../../../uploads/services/uploads.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  faSearch = faSearch;
  @Input() queryString: string = "";
  @Input() placeholder: string = "";
  @Output() onSearch = new EventEmitter<string>();

  constructor(private service: UploadsService) {
  }

  onSearchIssued(query : string) {
    this.onSearch.emit(query);
  }
}
