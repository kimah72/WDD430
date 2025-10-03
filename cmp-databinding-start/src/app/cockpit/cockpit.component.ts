import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  standalone: false,
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output("bpCreated") blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // newServerName = '';
  // newServerContent = '';
  // getting access to the local reference variable "serverContentInput"
  @ViewChild("serverContentInput") serverContentInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      // local reference variable value accessed directly
      serverName: nameInput.value,
      // local reference variable value accessed via ViewChild
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      // local reference variable value accessed directly
      serverName: nameInput.value,
      // local reference variable value accessed via ViewChild
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}
