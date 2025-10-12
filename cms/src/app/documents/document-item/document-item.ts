import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  standalone: false,
  templateUrl: './document-item.html',
  styleUrl: './document-item.css'
})
export class DocumentItem implements OnInit {
  @Input() document: Document;

  constructor() {}

  ngOnInit(): void {  
  }
  
}
