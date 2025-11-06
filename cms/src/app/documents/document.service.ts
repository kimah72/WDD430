import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];

  // ONLY ONE OBSERVABLE — LIVE LIST UPDATES
  documentListChangedEvent = new Subject<Document[]>();

  // For unique IDs
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  // === GET DATA ===
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const clone = this.documents.slice();
    this.documentListChangedEvent.next(clone);
  }

  updateDocument(original: Document, updated: Document) {
    if (!original || !updated) return;

    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    updated.id = original.id;
    this.documents[pos] = updated;
    const clone = this.documents.slice();
    this.documentListChangedEvent.next(clone);
  }

  deleteDocument(document: Document) {
    if (!document) return;

    const pos = this.documents.indexOf(document);
    if (pos < 0) return;

    this.documents.splice(pos, 1);
    const clone = this.documents.slice();
    this.documentListChangedEvent.next(clone);
  }
}