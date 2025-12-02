import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-entry-create',
  standalone: false,
  templateUrl: './entry-create.html',
  styleUrls: ['./entry-create.css'],
})
export class EntryCreate {
  enteredTitle = '';
  enteredContent = '';

  @Output() entryCreated = new EventEmitter();

  onAddEntry() {
    const entry = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };
    this.entryCreated.emit(entry);
  }
}
