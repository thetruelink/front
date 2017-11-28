import { Directive, HostBinding, HostListener, ElementRef  } from '@angular/core';

@Directive({
  selector: '[appOver]'
})
export class OverDirective {

  constructor(private el: ElementRef) { }

  @HostBinding('class.active') active:boolean = false;

  @HostListener('click', ['$event'])
    showContact(event: Event){
      this.toggleState(this.el);


       


  }

  toggleState(el: ElementRef){
   console.log(el.nativeElement.siblings('table'));
    

  }

  

}
