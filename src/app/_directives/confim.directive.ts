import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
@Directive({
  selector: '[appConfirm]'
})
export class ConfirmDirective {

  @Input() appConfirm = () => {};

  constructor(private el: ElementRef, private router: Router){

  }


  @HostListener('click', ['$event.target'])
      confirm(event: Event){
        const conf = window.confirm('Are you sure to cancel ?');

        if(conf && this.el.nativeElement.id === 'pwd-cancel-btn'){
          //this.appConfirm();
          this.router.navigate(['/']);
        }

  }

}
