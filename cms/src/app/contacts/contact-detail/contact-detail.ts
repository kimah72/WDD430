import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css'
})

export class ContactDetail implements OnInit {
  contact: Contact;
  id: string;

  constructor
  ( private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
        });
  }

  onEditContact() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
  this.contactService.deleteContact(this.contact);
  this.router.navigate(['/contacts']);
  }
}
