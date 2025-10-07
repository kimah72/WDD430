import { Component, signal } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  selectedFeature: string = 'documents';

  switchView(feature: string) {
    this.selectedFeature = feature;
  }
  
  protected readonly title = signal('cms');
}
