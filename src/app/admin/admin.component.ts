import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { first } from "rxjs";
import { PageInfo } from "../models/page.model";
import { AdminEditableUser, UserEvent } from "../models/user.model";
import { AdminService } from "./services/admin.service";

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
    faUserShield = faUserShield;
    users!: AdminEditableUser[];
    pageInfo!: PageInfo;
    queryString: string = "";

    constructor(public service: AdminService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.service.clientPage.subscribe((resp) => {
            this.users = resp.result;
            this.pageInfo = {currentPageNumber: resp.currentPageNumber + 1, lastPageNumber: resp.lastPageNumber + 1};
            this.queryString = resp.query;
        });

        this.service.searchParams.subscribe(({pageNumber, query}) => {
            this.queryString = query || "";
            const queryParams : any = {};
            if (query)
                queryParams.q = query;
            queryParams.page = pageNumber + 1;
            this.router.navigate(['app/admin'], {queryParams});
        })

        this.route.queryParams.pipe(
            first()
        ).subscribe(({q, page}) => {
            q = q || "";
            page = page || 1;
            this.service.setPageNumberAndQuery(Number(page) - 1, q);
        });

    }

    onPageChange(pageNumber: number) {
        console.log(pageNumber);
        this.service.setPageNumber(pageNumber - 1);
    }

    onSearch(query: string) {
        this.service.setQuery(query);
    }

    editUser(event: UserEvent) {
        this.service.editUser(event);
    }
}