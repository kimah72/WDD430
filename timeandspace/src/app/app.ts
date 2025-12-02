import { Component } from '@angular/core';
import { Entry } from './posts/entry-list/entry-list';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  storedEntries: Entry[] = [];

  onEntryAdded(entry: Entry) {
    this.storedEntries.push(entry);
  }
}
