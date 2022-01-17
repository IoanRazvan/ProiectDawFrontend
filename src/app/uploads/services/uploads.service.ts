import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, combineLatest, filter, map, mergeAll, Observable, of, ReplaySubject, share, startWith, Subject, tap, timestamp } from "rxjs";
import { BookService } from "src/app/core/services/book.service";
import { GenreService } from "src/app/core/services/genre.service";
import { Book } from "src/app/models/book.model";
import { Genre } from "src/app/models/genre.model";
import { Page, PageParams, toClientPage, toServerPageNumber } from "src/app/models/page.model";
import { environment } from "src/environments/environment";

export interface UploadsParams extends PageParams {
    forceRequest: boolean;
}

interface IPageOperation extends Function {
    (page: Page<Book>): Page<Book>;
}

@Injectable()
export class UploadsService {
    public readonly searchParams: Subject<UploadsParams> = new ReplaySubject<UploadsParams>(1);

    private pageOperation: Subject<IPageOperation> = new Subject<IPageOperation>();

    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private cachedServerPage !: Page<Book>;

    private cachedSearchParams !: UploadsParams;

    private serverPage: Observable<Page<Book>>;

    public readonly clientPage: Observable<Page<Book>>;

    constructor(private bookService: BookService, private genreService: GenreService, private router: Router) {
        this.searchParams.pipe(
            tap(() => this.loading.next(true))
        ).subscribe((params) => {
            this.cachedSearchParams = params;
        });

        this.serverPage = combineLatest([this.searchParams.pipe(timestamp()), this.pageOperation.pipe(startWith(page => page), timestamp())]).pipe(
                filter(([params, operation]) => {
                    if (this.queryIsNotCached(params.value) || operation.timestamp > params.timestamp || params.value.forceRequest)
                        return true;
                    return false;
                }),
                map(([params, operation]) => {
                    if (params.timestamp >= operation.timestamp) {
                        const requestedPage = toServerPageNumber(params.value.pageNumber);
                        return this.bookService.getUploadedBooksByTitle(params.value.query, requestedPage, environment.serverPageSize);
                    }
                    else {
                        return of(operation.value(this.cachedServerPage));
                    }
                }),
                mergeAll(),
                share({ connector: () => new ReplaySubject(1) })
            );

        this.serverPage.subscribe((page) => this.cachedServerPage = page);

        this.clientPage = combineLatest([this.searchParams, this.serverPage]).pipe(
                filter(([params]) => !this.cachedServerPage || !this.queryIsNotCached(params)),
                map(([params, page]) => toClientPage(params, page)),
                tap(() => this.loading.next(false)),
                share({ connector: () => new ReplaySubject(1) })
            );
                
        this.clientPage.subscribe({
            error: () => this.loading.next(false)
        })
    }

    private queryIsNotCached(params: UploadsParams): boolean {
        return this.cachedServerPage?.query !== params.query || this.cachedServerPage?.currentPageNumber !== toServerPageNumber(params.pageNumber);
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
                const currentClientPage = toClientPage(this.cachedSearchParams, this.cachedServerPage);
                this.pageOperation.next(this.createDeleteBookOpeartion(bookId));
                if (currentClientPage.currentPageNumber === currentClientPage.lastPageNumber) {
                    if (currentClientPage.result.length - 1 === 0 && this.cachedSearchParams.pageNumber !== 0) {
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
        this.setPageAndQuery(this.cachedSearchParams.pageNumber, this.cachedSearchParams.query, true);
    }

    setPageAndQuery(pageNumber: number, query: string, forceRequest: boolean = false) {
        this.searchParams.next({ pageNumber, query, forceRequest });
    }

    changePage(pageNumber: number) {
        this.setPageAndQuery(pageNumber, this.cachedSearchParams?.query || '');
    }

    setQuery(query: string) {
        this.setPageAndQuery(0, query);
    }
}