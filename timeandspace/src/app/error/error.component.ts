import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-error',
  templateUrl: './error.html',
  standalone: true,  // ← important for dialog components
  imports: [MatButton]  // ← only need button if using [mat-dialog-close]
})
export class ErrorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<ErrorComponent>  // ← to close dialog
  ) {}
}