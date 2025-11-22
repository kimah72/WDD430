import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message.model';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number = 0;

  private firebaseUrl = 'https://cms-school-project-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient, private contactService: ContactService) {
    this.initMessages();
  }

  // Called once in constructor
  initMessages() {
    this.http.get<Message[]>(this.firebaseUrl).subscribe({
      next: (messages) => {
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.emit(this.messages.slice());
      },
      error: (err) => console.error('Failed to load messages', err)
    });
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    return this.messages.find(m => m.id === id) || null;
  }

  getMaxId(): number {
    let max = 0;
    for (let m of this.messages) {
      const currId = parseInt(m.id);
      if (currId > max) max = currId;
    }
    return max;
  }

  addMessage(message: Message) {
    if (!message) return;

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();

    if (message.sender && isNaN(+message.sender)) {
    // It's a name, not an ID — find the contact and get their ID
    const contact = this.contactService.getContacts().find(c => c.name === message.sender);
    if (contact) {
      message.sender = contact.id;
    }
  }

    this.messages.push(message);

    // Save to Firebase + notify everyone
    this.http.put(this.firebaseUrl, this.messages).subscribe({
      next: () => this.messageChangedEvent.emit(this.messages.slice()),
      error: (err) => console.error('Failed to save message', err)
    });
  }
}