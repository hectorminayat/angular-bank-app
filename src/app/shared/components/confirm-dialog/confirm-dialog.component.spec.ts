import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Observable, of } from 'rxjs';
import { ConfirmDialogService } from '../../services/confirmDialog/confirm-dialog.service';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let confirmDialogService: ConfirmDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [ConfirmDialogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    confirmDialogService = TestBed.inject(ConfirmDialogService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize display$ with the value from confirmDialogService', () => {
    const mockDisplayValue: Observable<'open' | 'close'> = of('open');
    spyOn(confirmDialogService, 'watch').and.returnValue(mockDisplayValue);

    component.ngOnInit();

    expect(component.display$).toBe(mockDisplayValue);
  });

  it('should close the dialog when closeBackdrop is called and closable is true', () => {
    spyOn(component, 'close');
    component.closable = true;

    component.closeBackdrop();

    expect(component.close).toHaveBeenCalled();
  });

  it('should not close the dialog when closeBackdrop is called and closable is false', () => {
    spyOn(component, 'close');
    component.closable = false;

    component.closeBackdrop();

    expect(component.close).not.toHaveBeenCalled();
  });

  it('should emit onCancel event when cancel is called', () => {
    spyOn(component.onCancel, 'emit');

    component.cancel();

    expect(component.onCancel.emit).toHaveBeenCalled();
  });

  it('should emit onConfirm event when confirm is called', () => {
    spyOn(component.onConfirm, 'emit');

    component.confirm();

    expect(component.onConfirm.emit).toHaveBeenCalled();
  });
});