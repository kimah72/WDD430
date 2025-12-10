import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { EntryService } from "../entry.service";

@Component({
  selector: "app-entry-create",
  standalone: false,
  templateUrl: "./entry-create.html",
  styleUrls: ["./entry-create.css"],
})
export class EntryCreate {
  enteredTitle = "";
  enteredContent = "";

constructor(public entriesService: EntryService) {}

  onAddEntry(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.entriesService.addEntry(form.value.title, form.value.content);
    form.resetForm
  }
}
