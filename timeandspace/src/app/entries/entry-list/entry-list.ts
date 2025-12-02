import { Component, Input } from '@angular/core';

export interface Entry {
  title: string;
  content: string;
}

@Component({
  selector: 'app-entry-list',
  standalone: false,
  templateUrl: './entry-list.html',
  styleUrls: ['./entry-list.css'],
})
export class EntryList {
  // posts = [
  //   { title: 'First Post', content: "This is the first post's content" },
  //   { title: 'Second Post', content: "This is the second post's content" },
  //   { title: 'Third Post', content: "This is the third post's content" },
  // ];
  @Input() entries: Entry[] = []; 
}
