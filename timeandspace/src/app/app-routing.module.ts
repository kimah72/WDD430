import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EntryList } from "./entries/entry-list/entry-list";
import { EntryCreate } from "./entries/entry-create/entry-create";
import { Login } from "./auth/login/login";
import { Signup } from "./auth/signup/signup";

const routes: Routes = [
    { path: '', component: EntryList},
    { path: 'create', component: EntryCreate },
    { path: 'edit/:entryId', component: EntryCreate },
    { path: 'login', component: Login},
    { path: 'signup', component: Signup}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}