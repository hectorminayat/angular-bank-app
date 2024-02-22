import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';
import { of } from 'rxjs';
import { Product } from '../../../core/models/Product';

const mockProducts: Product[] = [{
  id: '1',
  name: 'Product 1',
  description: '',
  logo: '',
  dateRelease: new Date(),
  dateRevision: new Date()
},
{
  id: '2',
  name: 'Product 1',
  description: '',
  logo: '',
  dateRelease: new Date(),
  dateRevision: new Date()
}
];

const mockProduct = mockProducts[0]
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [ProductListComponent, NgOptimizedImage]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defaultItemPerPage property', () => {
    expect(component.defaultItemPerPage).toBeDefined();
    expect(typeof component.defaultItemPerPage).toBe('number');
  });

  it('should have a products property', () => {
    expect(component.products).toBeDefined();
    expect(Array.isArray(component.products)).toBe(true);
  });

  it('should have a searchQuery property', () => {
    expect(component.searchQuery).toBeDefined();
    expect(typeof component.searchQuery).toBe('function');
  });

  it('should have a loading property', () => {
    expect(component.loading).toBeDefined();
    expect(typeof component.loading).toBe('boolean');
  });

  it('should have an itemsPerPage property', () => {
    expect(component.itemsPerPage).toBeDefined();
    expect(typeof component.itemsPerPage).toBe('function');
  });

  it('should have a totalItems property', () => {
    expect(component.totalItems).toBeDefined();
    expect(typeof component.totalItems).toBe('number');
  });

  it('should have a currentPage property', () => {
    expect(component.currentPage).toBeDefined();
    expect(typeof component.currentPage).toBe('function');
  });

  it('should have a forceR property', () => {
    expect(component.forceR).toBeDefined();
    expect(typeof component.forceR).toBe('function');
  });

  it('should have a selectedProduct property', () => {
    expect(component.selectedProduct).toBeDefined();
    expect(component.selectedProduct).toBeNull();
  });

  it('should have a tableHeader property', () => {
    expect(component.tableHeader).toBeDefined();
    expect(Array.isArray(component.tableHeader)).toBe(true);
    expect(component.tableHeader.length).toBeGreaterThan(0);
    expect(typeof component.tableHeader[0]).toBe('object');
  });

  it('should load products on ngOnInit', () => {
    spyOn(component, 'loadProducts');
    component.ngOnInit();
    expect(component.loadProducts).toHaveBeenCalled();
  });

  it('should set loading to true when loadProducts is called', () => {
    component.loadProducts();
    expect(component.loading).toBe(true);
  });

  it('should set loading to false when loadProducts completes', () => {
    component.loadProducts();
    expect(component.loading).toBe(false);
  });

  it('should set products and totalItems when loadProducts completes', () => {
    spyOn(component.service, 'getAll').and.returnValue(of(mockProducts));
    component.loadProducts();
    expect(component.products).toEqual(mockProducts);
    expect(component.totalItems).toBe(mockProducts.length);
  });

  it('should set currentPage and itemsPerPage when loadProducts completes', () => {
    spyOn(component.service, 'getAll').and.returnValue(of(mockProducts));
    component.loadProducts();
    expect(component.currentPage()).toBe(1);
    expect(component.itemsPerPage()).toBe(component.defaultItemPerPage);
  });

  it('should toggle forceR when loadProducts completes', () => {
    spyOn(component.service, 'getAll').and.returnValue(of(mockProducts));
    component.loadProducts();
    expect(component.forceR()).toBe(true);
  });

  it('should filter items based on searchQuery', () => {
    component.products = mockProducts
    component.searchQuery.set('Product 1');
    expect(component.items()).toEqual([{ id: '1', name: 'Product 1', description: 'Description 1' }]);
  });

  it('should update totalItems when searchQuery changes', () => {
    component.products = mockProducts
    component.searchQuery.set('Product');
    expect(component.totalItems).toBe(2);
  });

  it('should navigate to edit page when dropdown index is 0', () => {

    spyOn(component.router, 'navigateByUrl');
    component.onClickDropdown({ index: 0, value: mockProduct });
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/edit', { state: mockProduct });
  });

  it('should open dialog when dropdown index is 1', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Product 1',
      description: '',
      logo: '',
      dateRelease: new Date(),
      dateRevision: new Date()
    };
    spyOn(component.dialogService, 'open');
    component.onClickDropdown({ index: 1, value: mockProduct });
    expect(component.selectedProduct).toBe(mockProduct);
    expect(component.dialogService.open).toHaveBeenCalled();
  });

  it('should close dialog and reset selectedProduct on onCancelDialog', () => {
    spyOn(component.dialogService, 'close');
    component.onCancelDialog();
    expect(component.dialogService.close).toHaveBeenCalled();
    expect(component.selectedProduct).toBeNull();
  });

  it('should delete selectedProduct and reload products on onConfirmDialog', () => {
    spyOn(component.service, 'delete').and.returnValue(of({}));
    spyOn(component, 'loadProducts');
    component.selectedProduct = mockProduct;
    component.onConfirmDialog();
    expect(component.service.delete).toHaveBeenCalledWith(mockProduct.id);
    expect(component.loadProducts).toHaveBeenCalled();
    expect(component.dialogService.close).toHaveBeenCalled();
  });

  it('should return an array of numbers from numSequence', () => {
    const result = component.numSequence(5);
    expect(result).toEqual([undefined, undefined, undefined, undefined, undefined]);
  });
});