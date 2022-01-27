import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchAll } from "rxjs";
import { BookService } from "../core/services/book.service";
import { LibraryService } from "../core/services/library.service";
import { BookDetails } from "../models/book.model";

@Component({
    selector: 'book-details',
    templateUrl: "./book-details.component.html"
})
export class BookDetailsComponent implements OnInit {
    bookData!: BookDetails;
    loading = true;
    error = 0;
    value = 4;
    errorMessage: string = 'There was a problem while trying to load book information';

    constructor(private route: ActivatedRoute, private bookService: BookService, private libraryService: LibraryService) {
    }

    ngOnInit() : void {
        this.route.params.pipe(
            map(({id}) => this.bookService.getBook(id)),
            switchAll()
        ).subscribe({
            next: (book : any) => {
                this.loading = false;
                this.bookData = book;
            },
            error: ({error}) => {
                this.error = error.status;
                this.loading = false;
            }
        });
    }
}