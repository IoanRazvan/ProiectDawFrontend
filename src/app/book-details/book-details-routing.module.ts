import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteGuard } from "../core/services/route-guard.service";
import { BookDetailsComponent } from "./book-details.component";
import { BookContentComponent } from "./components/book-content/book-content.component";

export const bookRoutes: Routes = [
    {path: ':id', component: BookDetailsComponent, canActivate: [RouteGuard]},
    {path: 'content/:id', component: BookContentComponent, canActivate: [RouteGuard]}
]

@NgModule({
    imports: [
        RouterModule.forChild(bookRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BookDetailsRoutingModule {
}