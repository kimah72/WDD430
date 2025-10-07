import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  selectedFeatureEvent: string = 'documents';

  switchView(selectedFeature: string) {
    this.selectedFeatureEvent = selectedFeature;
  }
  
  constructor() {}

  ngOnInit(): void {
  }
}
