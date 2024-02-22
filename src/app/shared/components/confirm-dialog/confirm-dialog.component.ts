import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from '../../services/confirmDialog/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  display$: Observable<'open' | 'close'> | undefined;

  @Input() closable: boolean = false;
  @Input() message: string = "";
  @Input() confirmText: string = "Aceptar";
  @Input() cancelText: string = "Cancelar";
  @Input() enableCancelText: boolean = true;
  @Output() onConfirm: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();


  constructor(
      private confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit() {
    this.display$ = this.confirmDialogService.watch();
  }

  closeBackdrop() {
    this.closable && this.close();
  }
  close() {
    this.confirmDialogService.close();
  }
  cancel () {
    this.onCancel.emit()
  }
  confirm() {
    this.onConfirm.emit()
  }
}
