import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css'
})
export class DocumentDetail implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService
  ) {
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    );
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url, '_blank');
    }
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
  this.documentService.deleteDocument(this.document);
  this.router.navigate(['/documents']);
}

}
