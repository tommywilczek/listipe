import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  constructor(public viewContainerRef: ViewContainerRef // This gives you a pointer (a reference) to the place where this directive is used. It should be public so we can access it from outside.
    ) { }

}
