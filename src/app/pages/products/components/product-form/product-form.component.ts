import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/form/input/input.component';
import { CommonModule } from '@angular/common';
import { compareDates } from '../../../../shared/helpers/date';
import { ProductRequest } from '../../../../core/models/ProductRequest';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Product } from '../../../../core/models/Product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, CommonModule, LoaderComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  constructor() { }

  @Input() product: Product | undefined;
  @Input() editMode: boolean = false;
  @Input() title = "Formulario de Registro";
  @Input() loading = false;
  @Input() existsId = false;
  @Input() existsIdValue = '';
  @Output() onSubmit: EventEmitter<ProductRequest> = new EventEmitter<ProductRequest>();

  //Validators.pattern("^https?:\/\/(?:[a-zA-Z0-9\-.]+\.)*[a-zA-Z0-9\-.]+(?:\/[^\s]*\.)(jpg|jpeg|png|webp|avif|gif|svg)$")
  productForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl('', [Validators.required]),
    dateRelease: new FormControl('', [Validators.required, (c: AbstractControl) => (compareDates(new Date(), new Date(c.value?.split('-'))) ? null : { message: 'La Fecha debe ser igual o mayor a la fecha actual' })]),
    dateRevision: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    if (this.product && this.editMode) {
      this.productForm.controls.id.setValue(this.product.id)
      this.productForm.controls.name.setValue(this.product.name)
      this.productForm.controls.description.setValue(this.product.description)
      this.productForm.controls.logo.setValue(this.product.logo)
      this.productForm.controls.dateRelease.setValue(new Date(this.product.dateRelease).toISOString().split('T')[0])
      this.productForm.controls.dateRevision.setValue(new Date(this.product.dateRevision).toISOString().split('T')[0])
      }
    this.productForm.controls.dateRevision.disable()
    if (this.editMode){
      this.productForm.controls.id.disable()
    }
    this.onDateRevisionValueChange();
  }

  onDateRevisionValueChange() {

    this.productForm.controls.dateRelease.valueChanges.subscribe(value => {
      if (value && !this.productForm.controls.dateRelease.errors) {
        let currentYear = Number((value ?? '').split('-')[0]);
        this.productForm.controls.dateRevision.setValue((currentYear + 1) + value.slice(4))
      }
    });
  }

  reset() {
    this.productForm.reset()
    this.productForm.controls.id.setValue(this.product?.id ?? "")
  }

  submit() {
    if (this.productForm.valid) {

      let formValues = this.productForm.value;
      let body: ProductRequest = {
        id: formValues.id ?? "",
        name: formValues.name ?? "",
        description: formValues.description ?? "",
        logo: formValues.logo ?? "",
        date_release: formValues.dateRelease ?? "",
        date_revision: formValues.dateRevision ?? this.productForm.controls.dateRevision.value ?? "",
      }
      this.onSubmit.emit(body);
    }

  }
}
