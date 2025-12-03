import { Injectable } from '@angular/core';
// event emitter alternative for broader usage
import { Subject } from 'rxjs';

import { Entry } from "./entry.model";

// service to manage entries - one instance throughout app
@Injectable({ providedIn: 'root' })

export class EntriesService {
    private entries: Entry[] = [];
    private entriesUpdated = new Subject<Entry[]>();

    // method to get entries and add entries
    getEntries() {
        // returns a true copy of the entries array. New array with old objects
        return [...this.entries];
    }
    getEntriesUpdateListener() {
        return this.entriesUpdated.asObservable();
    }
    
    addEntry(title: string, content: string) {
        const entry: Entry = { title: title, content: content };
        this.entries.push(entry);
        // emits a new value whenever an entry is added
        this.entriesUpdated.next([...this.entries]);
    }
    
}