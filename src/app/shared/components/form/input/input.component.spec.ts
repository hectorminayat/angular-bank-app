import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormControl } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return an empty string when control is not defined', () => {
    component.control = new FormControl();
    expect(component.getError()).toEqual('');
  });

  it('should return the error message when control has errors', () => {
    const errorMessage = 'Invalid input';
    component.control = new FormControl();
    component.control.setErrors({
      required: true,
      message: errorMessage
    });
    expect(component.getError()).toEqual(errorMessage);
  });

  it('should return the error message based on the error type', () => {
    const errorType = 'minlength';
    const errorMessage = 'Input is too short';
    component.control = new FormControl(); // Fix: Assign an instance of FormControl
    component.control.setErrors({
      [errorType]: true
    });
    component.errorMessages = {
      [errorType]: () => errorMessage
    };
    expect(component.getError()).toEqual(errorMessage);
  });
});