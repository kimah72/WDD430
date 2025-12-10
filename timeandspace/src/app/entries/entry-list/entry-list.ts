import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Entry } from '../entry.model';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entry-list',
  standalone: false,
  templateUrl: './entry-list.html',
  styleUrls: ['./entry-list.css'],
})
export class EntryList implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First Post', content: "This is the first post's content" },
  //   { title: 'Second Post', content: "This is the second post's content" },
  //   { title: 'Third Post', content: "This is the third post's content" },
  // ];
  entries: Entry[] = [];
  private entrySub!: Subscription;

  constructor(public entryService: EntryService) {}

  ngOnInit() {
    this.entryService.getEntries();
    this.entrySub = this.entryService.getEntryUpdateListener()
      .subscribe((entries: Entry[]) => {
      this.entries = entries;
    });
  }

  ngOnDestroy() {
    this.entrySub.unsubscribe();
  }
}
