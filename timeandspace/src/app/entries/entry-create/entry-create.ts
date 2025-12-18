import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { EntryService } from "../entry.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Entry } from "../entry.model";
import { mimeType } from "./mime-type.validator";
import { AuthService } from "../../auth/auth.service";


@Component({
  selector: "app-entry-create",
  standalone: false,
  templateUrl: "./entry-create.html",
  styleUrls: ["./entry-create.css"],
})
export class EntryCreate implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredContent = "";
  entry: Entry | undefined;
  isLoading = false;
  form!: FormGroup;
  imagePreview!: string;
  private mode = "create";
  private entryId!: string;
  private authStatusSub!: Subscription;
  

constructor(
  public entriesService: EntryService, public route: ActivatedRoute,
  private cd: ChangeDetectorRef,
  private authService: AuthService
) {}

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
        this.isLoading = false;
    });
    this.form = new FormGroup({
      // added a reactive form
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required]}),
      image: new FormControl(null, { 
        // I don't always want to require an image
        // validators: [Validators.required], 
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("entryId")) {
        // Fetch and populate entry data for editing if needed
        this.mode = "edit";
        this.entryId = paramMap.get("entryId")!;
        this.isLoading = true;

        this.entriesService.getEntry(
          this.entryId).subscribe(entryData => {
          this.isLoading = false;
          this.entry = {
            id: entryData._id, 
            title: entryData.title, 
            content: entryData.content,
            imagePath: entryData.imagePath,
            creator: ""
          };
            this.form.setValue({
            title: this.entry.title,
            content: this.entry.content,
            image: this.entry.imagePath
          });
          this.imagePreview = this.entry.imagePath;
          this.cd.detectChanges();
        });
      } else {
        // Initialize for creating a new entry
        this.mode = "create";
        this.entryId = "";
      }
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    // allows you to control a single value in the form
    this.form.patchValue({ image: file });
    this.form.get("image")?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.cd.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  onSaveEntry() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.entriesService.addEntry(
        this.form.value.title, 
        this.form.value.content, 
        this.form.value.image
      );
    } else {
      this.entriesService.updateEntry(
        this.entryId, 
        this.form.value.title, 
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }
}
