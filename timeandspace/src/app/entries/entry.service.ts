import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Entry } from './entry.model';

@Injectable({ providedIn: 'root' })
export class EntryService {
  private entries: Entry[] = [];
  private entriesUpdated = new Subject<Entry[]>();

  constructor(private http: HttpClient) {}

  getEntries() {
    this.http.get<{ message: string; entries: Entry[] }>(
        "http://localhost:3000/api/entries"
    )
      .subscribe((entryData) => {
        this.entries = entryData.entries;
        this.entriesUpdated.next([...this.entries]);
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
