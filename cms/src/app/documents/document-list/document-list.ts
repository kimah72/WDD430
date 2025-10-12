import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})
export class DocumentList implements OnInit {
  documents: Document[] = [
    // using some dummy data for now
    new Document('1', 'Test Document', 'A test document', 'https://www.testurl.edu/dummy.pdf', null),
    new Document('2', 'Test Document 2', 'Another test document', 'https://www.testurl.edu/dummy2.pdf', null),
    new Document('3', 'Test Document 3', 'Yet another test document', 'https://www.testurl.edu/dummy3.pdf', null)
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
