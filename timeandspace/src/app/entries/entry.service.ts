import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';   // ← CHANGE TO BehaviorSubject

import { Entry } from './entry.model';

@Injectable({ providedIn: 'root' })
export class EntryService {
  private entries: Entry[] = [];
  private entriesUpdated = new BehaviorSubject<Entry[]>([]);  // ← REPLAYS LAST VALUE

  constructor(private http: HttpClient) {}

  getEntries() {
    this.http
      .get<{ message: string; entries: Entry[] }>("http://localhost:3000/api/entries")
      .subscribe({
        next: (entryData) => {
          this.entries = entryData.entries;
          this.entriesUpdated.next([...this.entries]);
        },
        error: () => {
          this.entries = [];
          this.entriesUpdated.next([]);
        }
      });
  }

  getEntryUpdateListener() {
    return this.entriesUpdated.asObservable();
  }

  addEntry(title: string, content: string) {
    const entry: Entry = { id: "", title: title, content: content };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/entries', entry)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.entries.push(entry);
        this.entriesUpdated.next([...this.entries]);
      });
  }
}
