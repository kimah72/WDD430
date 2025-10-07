import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

    onSelected(feature: string) {
      this.selectedFeatureEvent.emit(feature);
  }
}
