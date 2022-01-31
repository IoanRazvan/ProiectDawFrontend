import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, merge, Observable, ReplaySubject, sample, scan, share, startWith, Subject, switchMap, switchScan, takeUntil, tap, timestamp, zip } from "rxjs";
import { UserService } from "src/app/core/services/user.service";
import { Page, PageParams, toClientPage, toServerPageNumber } from "src/app/models/page.model";
import { AdminEditableUser, UserEvent } from "src/app/models/user.model";


interface IPageChangeOperation {
    (params: PageParams): PageParams
}

interface IServerPageOperation {
    (page: Page<AdminEditableUser>): Page<AdminEditableUser>
}


@Injectable()
export class AdminService {
    searchParams: Observable<PageParams>;

    private clientPageSize = 3;

    private serverPageSize = 6;

    private paramsChange: Subject<PageParams> = new Subject<PageParams>();

    private pageChange: Subject<IPageChangeOperation> = new Subject<IPageChangeOperation>();

    private serverPageOperation: Subject<IServerPageOperation> = new Subject<IServerPageOperation>();

    private serverPage: Observable<Page<AdminEditableUser>>;

    clientPage: Observable<Page<AdminEditableUser>>;

    loading: Subject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(private service: UserService) {
        const pageChanged = combineLatest([this.paramsChange.pipe(
            sample(this.pageChange)
        ), this.pageChange]).pipe(
            map(([paramsChange, pageChange]) => pageChange(paramsChange))
        );

        this.searchParams = merge(this.paramsChange, pageChanged).pipe(
            tap(() => this.loading.next(true)),
            share({connector: () => new ReplaySubject(1)})
        );

        const newServerPage = this.searchParams.pipe(
            distinctUntilChanged((prev, current) => {
                if (!prev)
                    return true;
                return !(prev.query !== current.query || toServerPageNumber(prev.pageNumber, this.clientPageSize, this.serverPageSize) !== toServerPageNumber(current.pageNumber, this.clientPageSize, this.serverPageSize));
            }),
            switchMap(params => service.getUsers(toServerPageNumber(params.pageNumber, this.clientPageSize, this.serverPageSize), this.serverPageSize, params.query)),
            share({ connector: () => new ReplaySubject(1) })
        );

        const accumulatedOperations = newServerPage.pipe(
            switchMap((currPage) => {
                return this.serverPageOperation.pipe(
                    scan((acc, currOp) => currOp(acc), currPage),
                );
            })
        );

        this.serverPage = merge(newServerPage, accumulatedOperations);

        this.clientPage = combineLatest([this.serverPage, this.searchParams]).pipe(
            filter(([serverPage, searchParams]) => serverPage.currentPageNumber === toServerPageNumber(searchParams.pageNumber, this.clientPageSize, this.serverPageSize)),
            map(([serverPage, searchParams]) => toClientPage(searchParams, serverPage, this.clientPageSize)),
            tap(() => this.loading.next(false))
        );
    }

    setQuery(query: string) {
        this.paramsChange.next({ query, pageNumber: 0 });
    }

    setPageNumber(pageNumber: number) {
        this.pageChange.next((searchParams: PageParams) => ({ query: searchParams.query, pageNumber }));
    }

    setPageNumberAndQuery(pageNumber: number, query: string) {
        this.paramsChange.next({ pageNumber, query });
    }

    editUser(event: UserEvent) {
        let requestObservable = this.service.editUser(event).pipe(
            share({ connector: () => new ReplaySubject<AdminEditableUser>(1) })
        );
        requestObservable.subscribe((user) => {
            this.serverPageOperation.next((page) => ({
                ...page,
                result: page.result.map((res) => {
                    if (res.id !== user.id)
                        return res;
                    return user;
                })
            }))
        });
        return requestObservable;
    }
}