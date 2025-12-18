import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EntryList } from "./entries/entry-list/entry-list";
import { EntryCreate } from "./entries/entry-create/entry-create";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
    { path: "", component: EntryList},
    { path: "create", component: EntryCreate, canActivate: [AuthGuard] },
    { path: "edit/:entryId", component: EntryCreate, canActivate: [AuthGuard] },
    // lazy loading
    { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(routes),],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}