import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatAnchor } from "@angular/material/button";

@Component({
    templateUrl: './error.html',
    imports: [MatDialogContent, MatDialogActions, MatAnchor, MatDialogClose]
})
export class Error {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
}