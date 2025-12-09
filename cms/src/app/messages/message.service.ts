import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();

  private apiUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {
    this.fetchMessages();
  }

  fetchMessages() {
    this.http.get<{messages: Message[]}>(this.apiUrl).subscribe({
      next: (response) => {
        this.messages = response.messages;
        this.messageChangedEvent.next(this.messages.slice());
      },
      error: (err) => console.error('Error loading messages:', err)
    });
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    return this.messages.find(m => m.id === id) || null;
  }

addMessage(message: Message) {
  if (!message) return;

  // Send the message (sender is just the name right now)
  this.http.post<Message>(this.apiUrl, message).subscribe({
    next: (newMessage) => {
      this.messages.push(newMessage);
      this.messageChangedEvent.next(this.messages.slice());
    },
    error: (err) => console.error('Save failed', err)
  });
}
}