import { Component } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_BOOK_DATA } from "../models/book.model";

@Component({
    selector: 'uploads',
    templateUrl: './uploads.component.html'
})
export class UploadsComponent {
    faSearch = faSearch;
    formData = DEFAULT_BOOK_DATA;

    clearNewBookFormFields() {
        this.formData = Object.assign({}, DEFAULT_BOOK_DATA);
    }
}