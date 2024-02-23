import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductCreateComponent } from './product-create.component';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { ConfirmDialogService } from '../../../shared/services/confirmDialog/confirm-dialog.service';
import { ProductRequest } from '../../../core/models/ProductRequest';


const mockProductRequest: ProductRequest = { 
  id: '123', 
  name: 'Test Product',
  description: 'Test Description',
  logo: 'Test Logo',
  date_release: '2024-01-01',
  date_revision:'2025-01-01'
};

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let productService: ProductService;
  let router: Router;
  let dialogService: ConfirmDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ProductCreateComponent],
      providers: [ProductService, ConfirmDialogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    dialogService = TestBed.inject(ConfirmDialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form and navigate to home on cancel dialog', () => {
    spyOn(dialogService, 'close');
    spyOn(router, 'navigate');

    component.onCancelDialog(null);

    expect(dialogService.close).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should reset form, close dialog, and clear existsId on confirm dialog', () => {
    spyOn(component.productFormRef, 'reset');
    spyOn(dialogService, 'close');

    component.onConfirmDialog(null);

    expect(component.productFormRef.reset).toHaveBeenCalled();
    expect(dialogService.close).toHaveBeenCalled();
    expect(component.existsId).toBe(false);
    expect(component.existsIdValue).toEqual('');
  });

  it('should check if id exists and create product if not exists', () => {

    spyOn(component.productFormRef.productForm, 'enable');
    spyOn(productService, 'checkExists').and.returnValue(of(false));
    spyOn(productService, 'create').and.returnValue(of(null));
    spyOn(dialogService, 'open');

    component.submit(mockProductRequest);

    expect(component.loading).toBe(true);
    expect(productService.checkExists).toHaveBeenCalledWith(mockProductRequest.id);
    expect(productService.create).toHaveBeenCalledWith(mockProductRequest);
    expect(dialogService.open).toHaveBeenCalled();
    expect(component.productFormRef.productForm.enable).toHaveBeenCalled();
  });

  it('should set existsId and existsIdValue if id exists', () => {
    spyOn(component.productFormRef.productForm, 'enable');
    spyOn(productService, 'checkExists').and.returnValue(of(true));
    spyOn(dialogService, 'open');

    component.submit(mockProductRequest);

    expect(component.loading).toBe(true);
    expect(productService.checkExists).toHaveBeenCalledWith(mockProductRequest.id);
    expect(dialogService.open).not.toHaveBeenCalled();
    expect(component.existsId).toBe(true);
    expect(component.existsIdValue).toEqual(mockProductRequest.id);
    expect(component.productFormRef.productForm.enable).toHaveBeenCalled();
  });
});