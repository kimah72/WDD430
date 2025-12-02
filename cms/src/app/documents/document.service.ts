import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();

  private apiUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {
    this.fetchDocuments();
  }

  fetchDocuments() {
    this.http.get<Document[]>(this.apiUrl).subscribe({
      next: (documents) => {
        this.documents = documents;
        this.sortAndSend();
      },
      error: (error) => console.error('Error fetching documents:', error)
    });
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    return this.documents.find(d => d.id === id) || null;
  }

  addDocument(document: Document) {
    if (!document) return;

    this.http.post<Document>(this.apiUrl, document).subscribe({
      next: (newDoc) => {
        this.documents.push(newDoc);
        this.sortAndSend();
      },
      error: (error) => console.error('Error adding document:', error)
    });
  }

  updateDocument(original: Document, newDoc: Document) {
    if (!original || !newDoc) return;

    const pos = this.documents.findIndex(d => d.id === original.id);
    if (pos < 0) return;

    this.http.put(`${this.apiUrl}/${original.id}`, newDoc).subscribe({
      next: () => {
        this.documents[pos] = newDoc;
        this.sortAndSend();
      },
      error: (error) => console.error('Error updating document:', error)
    });
  }

  deleteDocument(document: Document) {
    if (!document) return;

    this.http.delete(`${this.apiUrl}/${document.id}`).subscribe({
      next: () => {
        this.documents = this.documents.filter(d => d.id !== document.id);
        this.sortAndSend();
      },
      error: (error) => console.error('Error deleting document:', error)
    });
  }

  private sortAndSend() {
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
    this.documentListChangedEvent.next(this.documents.slice());
  }
}