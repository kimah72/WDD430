import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();

  private apiUrl = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {
    this.fetchContacts();
  }

  fetchContacts() {
    this.http.get<Contact[]>(this.apiUrl).subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      error: (err) => console.error('Error loading contacts:', err)
    });
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(c => c.id === id) || null;
  }

  addContact(contact: Contact) {
    if (!contact) return;

    this.http.post<Contact>(this.apiUrl, contact).subscribe({
      next: (newContact) => {
        this.contacts.push(newContact);
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    });
  }

  updateContact(original: Contact, newContact: Contact) {
    if (!original || !newContact) return;

    const pos = this.contacts.findIndex(c => c.id === original.id);
    if (pos < 0) return;

    this.http.put(`${this.apiUrl}/${original.id}`, newContact).subscribe({
      next: () => {
        this.contacts[pos] = newContact;
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    });
  }

  deleteContact(contact: Contact) {
    if (!contact) return;

    this.http.delete(`${this.apiUrl}/${contact.id}`).subscribe({
      next: () => {
        this.contacts = this.contacts.filter(c => c.id !== contact.id);
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    });
  }
}