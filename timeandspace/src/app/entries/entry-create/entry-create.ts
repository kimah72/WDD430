// create new entry component
import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-entry-create',
  standalone: false,
  templateUrl: './entry-create.html',
  styleUrls: ['./entry-create.css'],
})
export class EntryCreate {
  enteredTitle = '';
  enteredContent = '';

  constructor(private entriesService: EntriesService) {}

  onAddEntry(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.entriesService.addEntry(form.value.title, form.value.content);
    form.resetForm();
  }
}
