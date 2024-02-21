import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/form/input/input.component';
import { CommonModule } from '@angular/common';
import { compareDates } from '../../../../shared/helpers/date';
import { ProductService } from '../../../../core/services/product/product.service';
import { Router } from '@angular/router';
import { ProductRequest } from '../../../../core/models/ProductRequest';
import { mergeMap, of } from 'rxjs';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { ConfirmDialogService } from '../../../../shared/services/confirmDialog/confirm-dialog.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Product } from '../../../../core/models/Product';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, CommonModule, LoaderComponent, ConfirmDialogComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductFormComponent {

  constructor(private service: ProductService, private router: Router, private dialogService: ConfirmDialogService) { }

  @Input() product: Product | undefined;
  @Input() loading = false;
  @Input() existsId = false;
  @Input() existsIdValue = '';
  //Validators.pattern("^https?:\/\/(?:[a-zA-Z0-9\-.]+\.)*[a-zA-Z0-9\-.]+(?:\/[^\s]*\.)(jpg|jpeg|png|webp|avif|gif|svg)$")
  productForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl('', [Validators.required]),
    dateRelease: new FormControl('', [Validators.required, (c: AbstractControl) => (compareDates(new Date(), new Date(c.value.split('-'))) ? null : { message: 'La Fecha debe ser igual o mayor a la fecha actual' })]),
    dateRevision: new FormControl('', [Validators.required])
  });



  ngOnInit() {
    if(this.product) {
      this.productForm.value
    }
    this.productForm.controls.dateRevision.disable()
    this.onDateRevisionValueChange();
  }

  onDateRevisionValueChange() {
    this.productForm.controls.dateRelease.valueChanges.subscribe(value => {
      if (value && !this.productForm.controls.dateRelease.errors) {
        let currentYear = Number((value ?? '').split('-')[0]);
        console.log((currentYear + 1) + value.slice(4))
        this.productForm.controls.dateRevision.setValue((currentYear + 1) + value.slice(4))
      }
    });
  }

  reset() {
    this.productForm.reset()
  }

  onCancelDialog($event: any) {
    this.router.navigate(['/'])
  }

  onConfirmDialog($event: any) {
    this.reset()
    this.dialogService.close();
    this.existsId = false;
    this.existsIdValue = ""
  }

  submit() {
    if (this.productForm.valid) {
      let formValues = this.productForm.value
      let body: ProductRequest = {
        id: formValues.id ?? "",
        name: formValues.name ?? "",
        description: formValues.description ?? "",
        logo: formValues.logo ?? "",
        date_release: formValues.dateRelease ?? "",
        date_revision: formValues.dateRevision ?? "",
      }
    }

  }
}
