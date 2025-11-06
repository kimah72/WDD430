import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})
export class DocumentList implements OnInit, OnDestroy {
  documents: Document[] = []
  subscription: Subscription;

  constructor(private documentService: DocumentService, 
              private router: Router,
              private route: ActivatedRoute
              ) {
  }

  ngOnInit(): void {
    this.subscription = this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
    this.documents = documents;
  });
    this.documents = this.documentService.getDocuments();
  }

onAddDocument() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
  
}