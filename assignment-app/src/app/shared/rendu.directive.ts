import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class RenduDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.color='green';
    el.nativeElement.style.border='1px dashed green';
    el.nativeElement.style.backgroundColor='Yellow';
  }

}
