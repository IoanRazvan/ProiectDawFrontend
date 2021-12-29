import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UploadsService } from '../../services/uploads.service';

@Component({
  selector: 'title-search-bar',
  templateUrl: './title-search-bar.component.html'
})
export class TitleSearchBarComponent implements OnInit {
  faSearch = faSearch;
  queryString !: string;

  constructor(private service: UploadsService) {
  }

  ngOnInit(): void {
      this.service.searchParams.subscribe(({query}) => this.queryString = query);
  }

  onSearchButtonClick(query: string) {
    this.service.setQuery(query);
  }
}
