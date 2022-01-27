import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookDetailsComponent } from "../book-details/book-details.component";
import { BookReadingComponent } from "../book-reading/book-reading.component";
import { SearchComponent } from "../search/search.component";
import { UploadsComponent } from "../uploads/uploads.component";

export const authorizedRoutes : Routes = [
    {path: 'uploads', component: UploadsComponent},
    {path: 'search', component: SearchComponent},
    {path: 'book/:id', component: BookDetailsComponent},
    {path: 'book-content/:id', component: BookReadingComponent}
]

@NgModule({
    imports: [
        RouterModule.forChild(authorizedRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthorizedRoutingModule {}