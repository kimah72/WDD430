import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css'
})
export class MessageEdit implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  currentSender = 'Kimberly';

  constructor(
    private messageService: MessageService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {}

onAddMessage() {
  const subjectValue = this.subjectRef.nativeElement.value;
  const msgTextValue = this.msgTextRef.nativeElement.value;

  // Find your contact ID by name
  const myContact = this.contactService.getContacts().find(c => c.name === this.currentSender);
  const senderId = myContact ? myContact.id : null;

  const newMessage = new Message('0', subjectValue, msgTextValue, senderId);
  this.messageService.addMessage(newMessage);
  this.onClear();
}

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}