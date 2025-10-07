import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList implements OnInit {
  contacts: Contact[] = [
    new Contact(
      '1',
      'R. Kent Jackson',
      'jacksonk@byui.edu',
      '208-496-3771',
      '/assets/images/jacksonk.jpg',
      null
    ),
    new Contact(
      '2',
      'Rex Barzee',
      'barzeer@byui.edu',
      '208-496-3768',
      '/assets/images/barzeer.jpg',
      null
    )
  ];

    // added output property
    @Output() selectedContactEvent = new EventEmitter<Contact>();

  constructor() {}
  
  ngOnInit(): void {
  }

  // added emitter function
  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}
