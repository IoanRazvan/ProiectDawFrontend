import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UploadsComponent } from "../uploads/uploads.component";

export const authorizedRoutes : Routes = [
    {path: 'uploads', component: UploadsComponent}
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