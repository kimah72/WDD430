import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
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
  entries: Entry[] = [];
  private entrySub!: Subscription;

  constructor(public entryService: EntryService,
              private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.entryService.getEntries();
    this.entrySub = this.entryService.getEntryUpdateListener()
      .subscribe((entries: Entry[]) => {
        this.entries = entries;
        this.cd.detectChanges();
      });
}

  ngOnDestroy() {
    this.entrySub.unsubscribe();
  }
}
