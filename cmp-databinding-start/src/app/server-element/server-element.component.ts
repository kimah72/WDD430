import { 
  Component, 
  OnInit, 
  Input, 
  ViewEncapsulation, 
  OnChanges, 
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  standalone: false,
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements 
  OnInit, 
  OnChanges, 
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  OnDestroy {
  // assigned alias name "srvElement" to be used in the HTML template
  @Input("srvElement") element: {type: string; name: string; content: string};
  @Input() name: string;
  @ViewChild("heading", { static: true }) header: ElementRef;
  @ContentChild("contentParagraph", { static: true }) paragraph: ElementRef;

  constructor() { 
    console.log("constructor called!");
  }
  //needed to add void return type to fix error
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges called!");
    console.log(changes);
  }

  ngOnchanges(changes: SimpleChanges) {
    console.log("ngOnChanges called!");
    console.log(changes);
  }

  ngOnInit() {
    console.log("ngOnInit called!");
    // error here because view not initialized yet
    // console.log("Text Content: " + this.header.nativeElement.textContent);
  }
  
  ngDoCheck() {
    console.log("ngDoCheck called!");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit called!");
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called!");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called!");
    console.log("Text Content: " + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked called!");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called!");
  }
}
