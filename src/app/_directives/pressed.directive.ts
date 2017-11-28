import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPressed]'
})
export class PressedDirective {

  @HostBinding('class.mat-accent') isOver : boolean ;

  constructor(private el: ElementRef) { }

  @HostListener('mouseover', ['$event'])
   onmouseover(){
     //this.el.nativeElement.
      this.isOver = true;
   }
   @HostListener('mouseleave', ['$event'])
     onmouseleave(){
       this.isOver = false;
     }

}
