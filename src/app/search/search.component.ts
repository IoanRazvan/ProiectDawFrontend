import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookOrder } from "../constants/ordering.constants";
import { SearchParams, SearchService } from "./services/search.service";

@Component({
    selector: 'search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    loading!: boolean;
    errorMessage!: string;

    constructor(private service: SearchService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        let subscription = this.route.queryParams.subscribe(({ order, field, q, page }) => {
            field = field || "title";
            q = q || "";
            order = order || BookOrder.UPLOAD_TIME_DESCENDING;
            page = page || "1";
            this.service.setSearchParams(new SearchParams({ queriedField: field, order: Number(order), queryString: q, pageNumber: Number(page) - 1 }))
        });
        subscription.unsubscribe();

        this.service.searchParams.subscribe((params) => {
            this.router.navigate(["/app/search"], {
                queryParams: {
                    order: params.order,
                    field: params.queriedField,
                    page: params.pageNumber + 1,
                    q: params.queryString
                }
            })
        });

        this.service.loading.subscribe((loading) => this.loading = loading);

        this.service.clientPage.subscribe({
            error: () => this.errorMessage = "Unable to search for books"
        });
    }
}