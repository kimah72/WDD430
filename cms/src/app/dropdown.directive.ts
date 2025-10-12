import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cmsDropdown]',
  standalone: false
})
export class DropdownDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click') toggleOpen() {
    this.el.nativeElement.querySelector('.dropdown-menu').classList.toggle('show');
  }
}
