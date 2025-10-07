import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';


@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css'
})

// added input property
export class ContactItem {
  @Input() contact: Contact;
}
