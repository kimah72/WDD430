import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EntryList } from "./entries/entry-list/entry-list";
import { EntryCreate } from "./entries/entry-create/entry-create";

const routes: Routes = [
    { path: '', component: EntryList},
    { path: 'create', component: EntryCreate },
    { path: 'edit/:entryId', component: EntryCreate }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}