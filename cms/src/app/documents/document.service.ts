import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  private url = 'https://cms-school-project-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {
    this.fetchDocuments();
  }

  fetchDocuments() {
    this.http.get<Document[]>(this.url).subscribe({
      next: (documents) => {
        this.documents = documents || [];
        this.maxDocumentId = this.getMaxId();
        this.sortDocuments();
        this.documentListChangedEvent.next(this.documents.slice());
      },
      error: (err) => console.error('GET Documents failed', err)
    });
  }

  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.url, this.documents, { headers }).subscribe({
      next: () => this.documentListChangedEvent.next(this.documents.slice()),
      error: (err) => console.error('PUT Documents failed', err)
    });
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    return this.documents.find(d => d.id === id) || null;
  }

  getMaxId(): number {
    return this.documents.reduce((max, d) => Math.max(max, +d.id || 0), 0);
  }

  sortDocuments() {
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
  }

  addDocument(newDoc: Document) {
    if (!newDoc) return;
    this.maxDocumentId++;
    newDoc.id = this.maxDocumentId.toString();
    this.documents.push(newDoc);
    this.storeDocuments();
  }

  updateDocument(original: Document, updated: Document) {
    if (!original || !updated) return;
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;
    updated.id = original.id;
    this.documents[pos] = updated;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
}