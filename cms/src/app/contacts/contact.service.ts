import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  private url = 'https://cms-school-project-default-rtdb.firebaseio.com/contacts.json';

  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number = 0;

  constructor(private http: HttpClient) {
    this.loadContacts();
  }

  // Load from Firebase once at startup
  loadContacts() {
    this.http.get<Contact[]>(this.url).subscribe({
      next: (contacts) => {
        this.contacts = contacts || [];
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      error: (err) => console.error('Failed to load contacts', err)
    });
  }

  // Save to Firebase
  saveContacts() {
    this.http.put(this.url, this.contacts).subscribe({
      next: () => this.contactListChangedEvent.next(this.contacts.slice()),
      error: (err) => console.error('Failed to save contacts', err)
    });
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(c => c.id === id) || null;
  }

  getMaxId(): number {
    let max = 0;
    for (let c of this.contacts) {
      const curr = parseInt(c.id || '0');
      if (curr > max) max = curr;
    }
    return max;
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.saveContacts();          // ← Firebase save
  }

  updateContact(original: Contact, updated: Contact) {
    if (!original || !updated) return;
    const pos = this.contacts.indexOf(original);
    if (pos < 0) return;
    updated.id = original.id;
    this.contacts[pos] = updated;
    this.saveContacts();          // ← Firebase save
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.saveContacts();          // ← Firebase save
  }
}