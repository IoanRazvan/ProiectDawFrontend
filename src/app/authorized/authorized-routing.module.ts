import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchComponent } from "../search/search.component";
import { UploadsComponent } from "../uploads/uploads.component";

export const authorizedRoutes : Routes = [
    {path: 'uploads', component: UploadsComponent},
    {path: 'search', component: SearchComponent}
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