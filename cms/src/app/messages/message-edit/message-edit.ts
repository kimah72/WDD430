import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css'
})
export class MessageEdit implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Kimberly';

  constructor() {}

  ngOnInit(): void {

  }

  onSendMessage() {
    const subjectValue = this.subjectRef.nativeElement.value;
    const msgTextValue = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('0', subjectValue, msgTextValue, this.currentSender);
    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
  
}
