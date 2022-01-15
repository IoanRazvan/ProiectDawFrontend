import { Component, ElementRef  } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { debounceTime, filter, fromEvent } from "rxjs";
import { Book } from "../models/book.model";

@Component({
    selector: 'search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    faSearch = faSearch
    bookData: Book = {
        coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/91fJxgs69QL.jpg',
        title: 'Norwegian Wood',
        authorName: 'Haruki Murakami',
        genres: [
        {
            id: '1',
            title: 'Romance'
        },
        {
            id: '2',
            title: 'Drama'
        },
        {
            id: '3',
            title: 'Fiction'
        }
        ]
    }

    constructor(private el: ElementRef) {
    }
    
    ngOnInit(): void {
        const searchBar = this.el.nativeElement.getElementsByTagName("input")[0]
        fromEvent(searchBar, "keyup")
            .pipe(
                filter(() => searchBar.value.length > 2),
                debounceTime(200)
            ).subscribe((r) => console.log(r))
    }
}