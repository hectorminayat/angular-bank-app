import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { compareDates } from '../../../shared/helpers/date';
import { ProductService } from '../../../core/services/product/product.service';
import { Router } from '@angular/router';
import { ProductRequest } from '../../../core/models/ProductRequest';
import { mergeMap, of } from 'rxjs';
import { ConfirmDialogService } from '../../../shared/services/confirmDialog/confirm-dialog.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ProductFormComponent } from '../components/product-form/product-form.component';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, ProductFormComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  constructor(private service: ProductService, private router: Router, private dialogService: ConfirmDialogService) { }
  
  @ViewChild(ProductFormComponent) productFormRef!: ProductFormComponent;


  loading = false;
  existsId = false;
  existsIdValue = '';

  onCancelDialog($event: any) {
    this.dialogService.close();
    this.router.navigate(['/'])
  }

  onConfirmDialog($event: any) {
    this.productFormRef.reset()
    this.dialogService.close();
    this.existsId = false;
    this.existsIdValue = ""
  }

  submit($event: ProductRequest) {
    
      let body = $event;

      this.loading = true

      this.service.checkExists(body.id ?? "").pipe(
        mergeMap((exists) => {
          if (exists) {
            return of("Id exists");
          } else {
            return this.service.create(body);
          }
        }),
      ).subscribe({
        next: (result) => {
          console.log(result)
          if (typeof result === "string") {
            this.existsId = true;
            this.existsIdValue = body.id
          } else {

            this.dialogService.open()
          }

        }, error: e => console.log(e), complete: () => {

          this.loading = false
          this.productFormRef.productForm.enable();
        }
      });
    }
}
