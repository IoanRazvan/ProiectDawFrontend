import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, filter, map, Observable, ReplaySubject, share, switchAll, tap } from "rxjs";
import { BookOrder } from "src/app/constants/ordering.constants";
import { BookService } from "src/app/core/services/book.service";
import { Book } from "src/app/models/book.model";
import { Page, PageParams, toClientPage, toServerPageNumber } from "src/app/models/page.model";

type QueriedField = "author" | "title";

export class SearchParams implements PageParams {
    pageNumber: number;
    queriedField: QueriedField;
    queryString: string;
    order: BookOrder;
    get query() : string {
        return `${this.queriedField}=${this.queryString}`;
    }

    constructor(params: any) {
        this.pageNumber = params.pageNumber;
        this.queriedField = params.queriedField || 'title';
        this.queryString = params.queryString || '';
        this.order = params.order;
    }
}

@Injectable()
export class SearchService {
    private serverPageSize = 27;

    private clientPageSize = 9;

    public readonly clientPage: Observable<Page<Book>>;

    private serverPage: Observable<Page<Book>>;

    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private cachedServerPage!: Page<Book>;

    private cachedSearchParams!: SearchParams;

    public readonly searchParams: ReplaySubject<SearchParams> = new ReplaySubject<SearchParams>(1);

    constructor(service: BookService) {
        this.searchParams.pipe(
            tap(() => this.loading.next(true))
        ).subscribe((params) => {
            this.cachedSearchParams = params;
        });

        this.serverPage = this.searchParams.pipe(
            filter(() => this.queryIsNotCached()),
            map(params => service.getBooks(toServerPageNumber(params.pageNumber, this.clientPageSize, this.serverPageSize), this.serverPageSize, params.order, params.queriedField, params.queryString)),
            switchAll(),
            share({connector: () => new ReplaySubject(1) })
        );

        this.serverPage.subscribe((page) => {
            this.cachedServerPage = page;
        });

        this.clientPage = combineLatest([this.serverPage, this.searchParams]).pipe(
            filter(() => !this.queryIsNotCached()),
            map(() => toClientPage(this.cachedSearchParams, this.cachedServerPage, this.clientPageSize)),
            tap(() => this.loading.next(false)),
            share({connector: () => new ReplaySubject(1) })
        );

        this.clientPage.subscribe({error: () => this.loading.next(false)});
    }

    private queryIsNotCached() : boolean {
        return !this.cachedServerPage
            || this.cachedSearchParams.query !== this.cachedServerPage.query
            || this.cachedSearchParams?.order !== this.cachedServerPage?.order
            || toServerPageNumber(this.cachedSearchParams.pageNumber) !==  this.cachedServerPage.currentPageNumber;
    }

    setSearchParams(searchParams: SearchParams) {
        this.searchParams.next(searchParams);
    }

    setPageNumber(pageNumber: number) {
        this.searchParams.next(new SearchParams({...this.cachedSearchParams, pageNumber}));
    }

    setAuthorQuery() {
        this.searchParams.next(new SearchParams({...this.cachedSearchParams, queriedField: "author", pageNumber: 0}));
    }

    setTitleQuery() {
        this.searchParams.next(new SearchParams({...this.cachedSearchParams, queriedField: "title", pageNumber: 0}));
    }

    setQuery(query: string) {
        this.searchParams.next(new SearchParams({...this.cachedSearchParams, queryString: query, pageNumber: 0}));
    }

    setOrder(order: BookOrder) {
        this.searchParams.next(new SearchParams({...this.cachedSearchParams, order, pageNumber: 0}))
    }
}