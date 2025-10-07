import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css'
})
export class MessageItem implements OnInit {
  @Input() message: Message;

  constructor() {}

  ngOnInit(): void {

  }

}
