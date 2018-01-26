import {Directive, Input, ElementRef} from '@angular/core';

@Directive({
  selector: '[ngeo-map]'
})
export class MapDirective {

  @Input() map;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.map.setTarget(this.el.nativeElement);
  }
}
