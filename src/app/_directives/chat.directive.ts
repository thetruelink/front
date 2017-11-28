import { Directive, Input, TemplateRef, ViewContainerRef  } from '@angular/core';

@Directive({
  selector: '[appChat]'
})
export class ChatDirective {

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) { }

  
  @Input() set appChat (condition:boolean){
    if(condition){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

  }

}
