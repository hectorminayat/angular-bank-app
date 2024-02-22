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
import { Product } from '../../../core/models/Product';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, ProductFormComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {



  @ViewChild(ProductFormComponent) productFormRef!: ProductFormComponent;

  loading = false;
  existsId = false;
  existsIdValue = '';
  product!: Product;

  constructor(private service: ProductService, private router: Router, private dialogService: ConfirmDialogService) {
    
    if (this.router.getCurrentNavigation()?.extras.state && this.router.getCurrentNavigation()?.extras?.state!['id']) {
      this.product = this.router.getCurrentNavigation()?.extras.state as Product;
    }
    else {
      this.router.navigate(['/'], { replaceUrl: true }).then()
    }
  }
  onConfirmDialog($event: any) {
    this.dialogService.close();
    this.router.navigate(['/'])
  }

  submit($event: ProductRequest) {

    let body = $event;
    body.id = this.product.id;
    this.loading = true
    this.service.edit(body).subscribe({
      next: (result) => {
        this.dialogService.open()
      }, error: e => console.log(e), complete: () => {

        this.loading = false
        this.productFormRef.productForm.enable();
      }
    });
  }
}
