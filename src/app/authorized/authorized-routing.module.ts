import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.compoent";

export const authorizedRoutes : Routes = [
    {path: '', component: HomeComponent}
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