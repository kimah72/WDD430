import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgForm } from "@angular/forms";

import { EntryService } from "../entry.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Entry } from "../entry.model";

@Component({
  selector: "app-entry-create",
  standalone: false,
  templateUrl: "./entry-create.html",
  styleUrls: ["./entry-create.css"],
})
export class EntryCreate implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  entry: Entry | undefined;
  isLoading = false;
  private mode = "create";
  private entryId!: string;
  

constructor(public entriesService: EntryService, public route: ActivatedRoute,
            private cd: ChangeDetectorRef
) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("entryId")) {
        // Fetch and populate entry data for editing if needed
        this.mode = "edit";
        this.entryId = paramMap.get("entryId")!;
        this.isLoading = true;
        this.entriesService.getEntry(this.entryId).subscribe(entryData => {
          this.isLoading = false;
          this.entry = {id: entryData._id, title: entryData.title, content: entryData.content,};
          this.cd.detectChanges();
        });
      } else {
        // Initialize for creating a new entry
        this.mode = "create";
        this.entryId = "";
      }
    });
  }

  onSaveEntry(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
    this.entriesService.addEntry(form.value.title, form.value.content);
    } else {
      this.entriesService.updateEntry(
        this.entryId, 
        form.value.title, 
        form.value.content
      );
    }
    form.resetForm();
  }
}
