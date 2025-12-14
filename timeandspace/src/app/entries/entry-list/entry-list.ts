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
  isLoading = false;
  private entrySub!: Subscription;

  constructor(public entryService: EntryService,
              private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.entryService.getEntries();
    this.entrySub = this.entryService.getEntryUpdateListener()
      .subscribe((entries: Entry[]) => {
        this.isLoading = false;
        this.entries = entries;
        this.cd.detectChanges();
      });
}

  onDelete(entryId: string) {
    this.entryService.deleteEntry(entryId);
    console.log("Delete button clicked for ID:", entryId);
  }

  ngOnDestroy() {
    this.entrySub.unsubscribe();
  }
}
