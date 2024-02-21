import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors } from '@angular/forms';


@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: InputComponent,
  }],
})

export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input()
  control!: FormControl;
  value: string = '';
  private onTouched!: Function;
  private onChanged!: Function;
  disabled = false;

  errorMessages: any = {
    'required': (params: any) => `Este campo es obligatorio`,
    'maxlength': (params: any) => `Se requieren ${params.requiredLength} caracteres máximos`,
    'minlength': (params: any) => `Se requieren ${params.requiredLength} caracteres mínimos`,
    'pattern': (params: any) => `Formato inválido`,
    'min': (params: any) => `la cantidad mínima debe ser ${params.min}`,
    'max': (params: any) => `la cantidad mínima debe ser ${params.max}`,
    'whitespace': (params: any) => `No se permiten espacios en blanco`
  };

  getError() {
    let message = ''
    if (this.control) {
      Object.keys(this.control.errors ?? {}).map(error => {
        if (error == 'message') {
          message = this.control.errors![error];
          return;
        }

        message = this.errorMessages[error](this.control.errors![error]);
      });
      return message
    }
    else {
      return '';
    }
  }
  onInput(event: Event): void {
    let inputValue: any = (event.target as HTMLInputElement).value;
    this.onChanged(inputValue);
    this.onTouched();
    this.value = inputValue
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
