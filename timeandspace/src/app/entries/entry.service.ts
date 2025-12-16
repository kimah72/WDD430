import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entry } from './entry.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class EntryService {
  private entries: Entry[] = [];
  private entriesUpdated = new Subject<{ entry: Entry[], entryCount: number }>(); 

  constructor(private http: HttpClient, private router: Router) {}

  getEntries(entriesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${entriesPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; entries: any, maxEntries: number}>(
        "http://localhost:3000/api/entries" + queryParams
      )
      .pipe(
        map((entryData) => {
        return { entries: entryData.entries.map((entry: any) => {
          return {
            title: entry.title,
            content: entry.content,
            id: entry._id,
            imagePath: entry.imagePath
          };
        }), maxEntries: entryData.maxEntries
      }}
    ))
        .subscribe((transformedEntryData) => {
          this.entries = transformedEntryData.entries;
          this.entriesUpdated.next({            
            entry: [...this.entries],
            entryCount: transformedEntryData.maxEntries
          });
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
    .post<{ message: string; entry: Entry }>(
      'http://localhost:3000/api/entries', 
      entryData
    )
    .subscribe(responseData => {
      this.router.navigate(['/']);
    });
}

updateEntry(id: string, title: string, content: string, image: File | string) {
  let entryData: Entry | FormData;
  if (image instanceof File) {
    entryData = new FormData();
    entryData.append("id", id);
    entryData.append("title", title);
    entryData.append("content", content);
    entryData.append("image", image, image.name);
  } else {
    entryData = {
      id: id,
      title: title,
      content: content,
      imagePath: image as string   // existing path
    };
  }

  this.http
    .put('http://localhost:3000/api/entries/' + id, entryData)
    .subscribe(response => {
      // your success code...
      this.router.navigate(['/']);
    });
}

  deleteEntry(entryId: string) {
    return this
    .http.delete('http://localhost:3000/api/entries/' + entryId);
  }
}
