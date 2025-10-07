import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css'
})
export class MessageEdit implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Kimberly Miner'; 

  constructor() {}

  ngOnInit(): void {

  }

  onAddMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;
    const newMessage = new Message('', subjectValue, msgTextValue, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }
}
