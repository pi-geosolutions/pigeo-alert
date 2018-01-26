import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonDirective),
  multi: true
};

@Directive({
  selector: '[ngeoButton]',
  providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR]
})
export class ButtonDirective implements ControlValueAccessor, OnInit {

  /** Truthy value, will be set to ngModel */
  @Input() ngeoButtonTrue: any = true;
  /** Falsy value, will be set to ngModel */
  @Input() ngeoButtonFalse: any = false;

  @HostBinding('class.active') state = false;

  protected value: any;
  protected isDisabled: boolean;

  protected onChange: any = Function.prototype;
  protected onTouched: any = Function.prototype;

  constructor() { }

  @HostListener('click')
  onClick(): void {
    if (this.isDisabled) {
      return;
    }

    this.toggle(!this.state);
    this.onChange(this.value);
  }
  ngOnInit(): any {
    this.toggle(this.trueValue === this.value);
  }

  protected get trueValue(): boolean {
    return typeof this.ngeoButtonTrue !== 'undefined'
      ? this.ngeoButtonTrue
      : true;
  }

  protected get falseValue(): boolean {
    return typeof this.ngeoButtonFalse !== 'undefined'
      ? this.ngeoButtonFalse
      : false;
  }

  toggle(state: boolean): void {
    this.state = state;
    this.value = this.state ? this.trueValue : this.falseValue;
  }

  // ControlValueAccessor
  // model -> view
  writeValue(value: any): void {
    this.state = this.trueValue === value;
    this.value = value ? this.trueValue : this.falseValue;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

}
