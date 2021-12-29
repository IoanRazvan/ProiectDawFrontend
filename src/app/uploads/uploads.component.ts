import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_BOOK_DATA } from "../models/book.model";
import { UploadsService } from "./services/uploads.service";

@Component({
    selector: 'uploads',
    templateUrl: './uploads.component.html'
})
export class UploadsComponent implements OnInit {
    faSearch = faSearch;
    formData = DEFAULT_BOOK_DATA;

    constructor(private service: UploadsService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        const subscription = this.route.queryParams.subscribe(({ page, q }) => {
            q = q || '';
            page = page || 1;
            this.service.setPageAndQuery(Number(page) - 1, q);
        });
        subscription.unsubscribe();

        this.service.searchParams.subscribe(({ query, pageNumber }) => {
            if (query && pageNumber)
                this.router.navigate(['/app/uploads'], { queryParams: { q: query, page: pageNumber + 1 } });
            else if (pageNumber)
                this.router.navigate(['/app/uploads'], { queryParams: { page: pageNumber + 1 } });
            else if (query)
                this.router.navigate(['/app/uploads'], {queryParams: { q: query }});
            else
                this.router.navigate(['/app/uploads']);
        });
    }

    clearNewBookFormFields() {
        this.formData = Object.assign({}, DEFAULT_BOOK_DATA);
    }
}