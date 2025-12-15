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
            imagePath: entry.imagePath
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
    return this.http.get<{_id: string, title: string, content: string, imagePath: string}>(
      "http://localhost:3000/api/entries/" + id
    );
  }

addEntry(title: string, content: string, image: File | string) {
  const entryData = new FormData();
  entryData.append("title", title);
  entryData.append("content", content);

  // ONLY append image if it's an actual File (not string or null)
  if (image && typeof image === 'object') {
    entryData.append("image", image, (image as File).name);
  }

  this.http
    .post<{ message: string; entry: Entry }>('http://localhost:3000/api/entries', entryData)
    .subscribe(responseData => {
      const entry: Entry = {
        id: responseData.entry.id,
        title: title,
        content: content,
        imagePath: responseData.entry.imagePath
      };
      this.entries.push(entry);
      this.entriesUpdated.next([...this.entries]);
      this.router.navigate(['/']);
    });
}

updateEntry(id: string, title: string, content: string, image: File | string) {
  let entryData: Entry | FormData;
  if (typeof image === 'object') {
    entryData = new FormData();
    entryData.append("id", id);
    entryData.append("title", title);
    entryData.append("content", content);
    entryData.append("image", image, title);
  } else {
    entryData = {
      id: id,
      title: title,
      content: content,
      imagePath: image
    };
  }
  this.http
    .put('http://localhost:3000/api/entries/' + id, entryData)
      .subscribe(response => {
        const updatedEntries = [...this.entries];
        const oldEntryIndex = updatedEntries.findIndex(e => e.id === id);
        const entry: Entry = {
          id: id,
          title: title,
          content: content,
          imagePath: ""
        };
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
