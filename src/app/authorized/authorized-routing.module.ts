import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "../admin/admin.component";
import { bookRoutes } from "../book-details/book-details-routing.module";
import { AdminGuard } from "../core/services/admin-guard.service";
import { RouteGuard } from "../core/services/route-guard.service";
import { SearchComponent } from "../search/search.component";
import { SettingsComponent } from "../settings/settings.component";
import { UploadsComponent } from "../uploads/uploads.component";

export const authorizedRoutes : Routes = [
    {path: 'uploads', component: UploadsComponent, canActivate: [RouteGuard]},
    {path: 'search', component: SearchComponent, canActivate: [RouteGuard]},
    {path: 'book', children: bookRoutes },
    {path: 'settings', component: SettingsComponent, canActivate: [RouteGuard]},
    {path: 'admin', component: AdminComponent, canActivate: [RouteGuard, AdminGuard]}
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