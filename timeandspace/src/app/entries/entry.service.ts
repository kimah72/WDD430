import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entry } from './entry.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class EntryService {
  private entries: Entry[] = [];
  private entriesUpdated = new Subject<Entry[]>(); 

  constructor(private http: HttpClient, private router: Router) {}

  getEntries() {
    this.http
      .get<{ message: string; entries: any }>(
        "http://localhost:3000/api/entries"
      )
      .pipe(map((entryData) => {
        return entryData.entries.map((entry: any) => {
          return {
            id: entry._id,
            title: entry.title,
            content: entry.content,
          };
        });
      }))
        .subscribe((transformedEntries) => {
          this.entries = transformedEntries;
          this.entriesUpdated.next([...this.entries]);
        });
  }

  getEntryUpdateListener() {
    return this.entriesUpdated.asObservable();
  }

  getEntry(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/api/entries/" + id);
  }

  addEntry(title: string, content: string) {
    const entry: Entry = { id: "", title: title, content: content };
    this.http
      .post<{ message: string, entryId: string }>(
        'http://localhost:3000/api/entries', 
        entry
      )
      .subscribe(responseData => {
        const id = responseData.entryId;
        entry.id = id;
        this.entries.push(entry);
        this.entriesUpdated.next([...this.entries]);
        this.router.navigate(['/']);
      });
  }

  updateEntry(id: string, title: string, content: string) {
    const entry: Entry = { id: id, title: title, content: content };
    this.http.put('http://localhost:3000/api/entries/' + id, entry)
      .subscribe(response => {
        const updatedEntries = [...this.entries];
        const oldEntryIndex = updatedEntries.findIndex(e => e.id === entry.id);
        updatedEntries[oldEntryIndex] = entry;
        this.entries = updatedEntries;
        this.entriesUpdated.next([...this.entries]);
        this.router.navigate(['/']);
      });
  }

  deleteEntry(entryId: string) {
    this.http.delete('http://localhost:3000/api/entries/' + entryId)
      .subscribe(() => {
        const updatedEntries = this.entries.filter(entry => entry.id !== entryId);
        this.entries = updatedEntries;
        this.entriesUpdated.next([...this.entries]);
      });
  }
}
