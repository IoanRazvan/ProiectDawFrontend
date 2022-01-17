import { Component, ElementRef, OnInit } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit {
  query!: string;
  field!: string;

  constructor(private service: SearchService, private el: ElementRef) { }

  ngOnInit(): void {
    const searchBar = this.el.nativeElement.getElementsByTagName("input")[0]
    fromEvent(searchBar, "keyup").pipe(
      debounceTime(200)
    ).subscribe(() => this.service.setQuery(searchBar.value));
    this.service.searchParams.subscribe(({queryString, queriedField}) => {
      this.query = queryString;
      this.field = queriedField;
    })
  }

  onQueriedFieldChange(event: any) {
    if (event.target.value === "author")
      this.service.setAuthorQuery();
    else
      this.service.setTitleQuery();
  }
}
