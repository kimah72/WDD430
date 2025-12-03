// outputting a list of entries
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Entry } from '../entry.model';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-entry-list',
  standalone: false,
  templateUrl: './entry-list.html',
  styleUrls: ['./entry-list.css'],
})
export class EntryList implements OnInit, OnDestroy{
  entries: Entry[] = []; 
  private entriesSub: Subscription = new Subscription();

  constructor(public entryService: EntriesService) {}
  // basic initialization methods
  ngOnInit() {
    this.entries = this.entryService.getEntries();
    this.entriesSub = this.entryService.getEntriesUpdateListener()
    // receives updated entries when emitted
      .subscribe((entries: Entry[]) => {
        this.entries = entries;
      });
  }

  ngOnDestroy() {
    // prevents memory leaks
    this.entriesSub.unsubscribe();
  }
}
