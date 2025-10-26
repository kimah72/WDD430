import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})

export class ContactList implements OnInit {
  contacts: Contact[] = []

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
 ) {}

  ngOnInit() {
    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
    this.contacts = this.contactService.getContacts();
  }

  onAddContact() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}