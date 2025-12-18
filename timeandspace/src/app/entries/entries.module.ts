import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { EntryCreate } from './entry-create/entry-create';
import { EntryList } from './entry-list/entry-list';
import { AngularMaterialModule } from "../angular-material.module";

@NgModule ({
    declarations: [
        EntryCreate, 
        EntryList
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterModule
    ]
})

export class EntryModule {}