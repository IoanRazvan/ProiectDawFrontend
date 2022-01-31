import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionService } from "src/app/core/services/session.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "book-reading",
    templateUrl: "./book-content.component.html"
})
export class BookContentComponent implements OnInit {
    pdfSrc !: Object;
    pageModel = 7;

    constructor(private route: ActivatedRoute, private service: SessionService, private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(({id}) => {
            this.pdfSrc = {
                url: `${environment.apiUrl}/Book/content/${id}`,
                httpHeaders: {
                    Authorization: `Bearer: ${this.service.getUser()}`
                }
            };
        });
    }

    onBack() {
        this.location.back()
    }
}