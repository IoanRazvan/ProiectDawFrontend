import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, combineLatest, filter, map, merge, mergeAll, Observable, of, ReplaySubject, share, startWith, Subject, timestamp } from "rxjs";
import { BookService } from "src/app/core/services/book.service";
import { GenreService } from "src/app/core/services/genre.service";
import { Book } from "src/app/models/book.model";
import { Genre } from "src/app/models/genre.model";
import { Page } from "src/app/models/page.model";
import { environment } from "src/environments/environment";

export interface SearchParams {
    query: string;
    pageNumber: number;
    forceRequest: boolean;
}

interface IPageOperation extends Function {
    (page: Page<Book>): Page<Book>;
}

@Injectable()
export class UploadsService {
    public readonly searchParams: Subject<SearchParams> = new ReplaySubject<SearchParams>(1);

    private pageOperation: Subject<IPageOperation> = new Subject<IPageOperation>();

    public readonly requestingBooks: Observable<boolean>;

    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private cachedServerPage!: Page<Book>;

    private currentSearchParams !: SearchParams;

    private serverPage: Observable<Page<Book>>;

    public readonly clientPage: Observable<Page<Book>>;

    constructor(private bookService: BookService, private genreService: GenreService, private router: Router) {
        this.searchParams.subscribe((params) => {
            this.currentSearchParams = params;
            this.loading.next(true);
        });

        this.serverPage = combineLatest([this.searchParams.pipe(timestamp()), this.pageOperation.pipe(startWith(page => page), timestamp())])
            .pipe(
                filter(([params, operation]) => {
                    if (this.queryIsNotCached(params.value) || operation.timestamp > params.timestamp || params.value.forceRequest)
                        return true;
                    return false;
                }),
                map(([params, operation]) => {
                    if (params.timestamp >= operation.timestamp) {
                        const requestedPage = this.toServerPageNumber(params.value.pageNumber);
                        return this.bookService.getUploadedBooksByTitle(params.value.query, requestedPage, environment.serverPageSize);
                    }
                    else {
                        return of(operation.value(this.cachedServerPage));
                    }
                }), mergeAll(), share({ connector: () => new ReplaySubject(2) })
            );

        this.serverPage.subscribe((page) => this.cachedServerPage = page);

        this.clientPage = combineLatest([this.searchParams, this.serverPage])
            .pipe(
                filter(([params]) => {
                    if (!this.cachedServerPage || !this.queryIsNotCached(params))
                        return true;
                    return false;
                }),
                map(([params, page]) => {
                    this.loading.next(false);
                    return this.toClientPage(params, page);
                }),
                share({ connector: () => new ReplaySubject(2) })
            );
                
        this.clientPage.subscribe({
            error: () => this.loading.next(false)
        })

        this.requestingBooks = merge(this.searchParams, this.clientPage).pipe(map(spOrCP => {
            if ('result' in spOrCP)
                return false;
            return true;
        }));
    }

    private toServerPageNumber(pageNumber: number): number {
        return Math.floor(((pageNumber + 1) * environment.clientPageSize - 1) / environment.serverPageSize);
    }

    private queryIsNotCached(params: SearchParams): boolean {
        return this.cachedServerPage?.query !== params.query || this.cachedServerPage?.currentPageNumber !== this.toServerPageNumber(params.pageNumber);
    }

    private toClientPage(params: SearchParams, page: Page<Book>) {
        const lastPageNumber = this.computeClientLastPageNumber(page);
        const absoluteRecordIndex = params.pageNumber * environment.clientPageSize;
        const offset = page.currentPageNumber * environment.serverPageSize;
        const relativeRecordIndex = absoluteRecordIndex - offset;
        return {
            currentPageNumber: params.pageNumber,
            query: params.query,
            result: page.result.slice(relativeRecordIndex, relativeRecordIndex + environment.clientPageSize),
            lastPageNumber,
            pageSize: environment.clientPageSize
        };
    }

    private computeClientLastPageNumber(page: Page<Book>) {
        let lastPageNumber;
        if (page.currentPageNumber === page.lastPageNumber)
            lastPageNumber = Math.ceil((page.currentPageNumber * environment.serverPageSize + page.result.length) / environment.clientPageSize) - 1;
        else
            lastPageNumber = (page.lastPageNumber + 1) * environment.serverPageSize / environment.clientPageSize - 1;
        return lastPageNumber;
    }

    getGenres(): Observable<Genre[]> {
        return this.genreService.getAll();
    }

    addBook(book: FormData): Observable<Book> {
        let sharedObs = this.bookService.saveBook(book).pipe(share({ connector: () => new ReplaySubject(1) }));
        sharedObs.subscribe((bookResponse: Book) => {
            if (this.cachedServerPage && this.cachedServerPage.lastPageNumber === this.cachedServerPage.currentPageNumber && bookResponse.title.toLowerCase().includes(this.cachedServerPage.query.toLowerCase()))
                this.pageOperation.next(this.createAddBookOperation(bookResponse));
        })
        return sharedObs;
    }

    private createAddBookOperation(book: Book): IPageOperation {
        if (this.cachedServerPage.pageSize !== this.cachedServerPage.result.length)
            return (page) => ({
                ...page,
                result: page.result.concat(book)
            });
        else
            return (page) => ({
                ...page,
                lastPageNumber: page.lastPageNumber + 1
            });
    }

    updateBook(book: FormData, id: string): Observable<Book> {
        let sharedObs = this.bookService.updateBook(book, id).pipe(share({ connector: () => new ReplaySubject(1) }));
        sharedObs.subscribe((bookResponse: Book) => {
            this.pageOperation.next(this.createUpdateBookOperation(bookResponse));
        });
        return sharedObs;
    }

    private createUpdateBookOperation(book: Book): IPageOperation {
        return (page) => ({
            ...page,
            result: page.result.map((resultBook) => {
                if (resultBook.id === book.id)
                    return book;
                return resultBook;
            })
        });
    }

    deleteBook(bookId: string): Observable<any> {
        let sharedObs = this.bookService.deleteBook(bookId).pipe(share({ connector: () => new ReplaySubject(1) }));
        sharedObs.subscribe(() => {
            if (this.cachedServerPage.lastPageNumber !== this.cachedServerPage.currentPageNumber)
                this.remakeLastRequest();
            else {
                const currentClientPage = this.toClientPage(this.currentSearchParams, this.cachedServerPage);
                this.pageOperation.next(this.createDeleteBookOpeartion(bookId));
                if (currentClientPage.currentPageNumber === currentClientPage.lastPageNumber) {
                    if (currentClientPage.result.length - 1 === 0 && this.currentSearchParams.pageNumber !== 0) {
                        this.changePage(currentClientPage.currentPageNumber - 1);
                    }
                }
            }
        });
        return sharedObs;
    }

    private createDeleteBookOpeartion(bookId: string): IPageOperation {
        return (page) => ({
            ...page,
            result: page.result.filter(book => book.id !== bookId)
        });
    }

    private remakeLastRequest() {
        this.setPageAndQuery(this.currentSearchParams.pageNumber, this.currentSearchParams.query, true);
    }

    setPageAndQuery(pageNumber: number, query: string, forceRequest: boolean = false) {
        this.searchParams.next({ pageNumber, query, forceRequest });
    }

    changePage(pageNumber: number) {
        this.setPageAndQuery(pageNumber, this.currentSearchParams?.query || '');
    }

    setQuery(query: string) {
        this.setPageAndQuery(0, query);
    }
}