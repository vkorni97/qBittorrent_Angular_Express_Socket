import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() value: string;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() label: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  public disabled: boolean;

  onChange: any = (value: any) => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  setDisabledState(value: boolean) {
    this.disabled = value;
  }
}
