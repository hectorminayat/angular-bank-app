import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, ReactiveFormsModule],
    }).overrideComponent(ProductFormComponent, {
      set: {standalone: true}
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls with product values in edit mode', () => {
    // Arrange
    component.product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      dateRelease: new Date('2022-01-01'), // Convert string to Date object
      dateRevision: new Date('2022-01-02') // Convert string to Date object
    };
    component.editMode = true;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.productForm.controls.id.value).toBe(1);
    expect(component.productForm.controls.name.value).toBe('Test Product');
    expect(component.productForm.controls.description.value).toBe('Test Description');
    expect(component.productForm.controls.logo.value).toBe('test-logo.png');
    expect(component.productForm.controls.dateRelease.value).toBe('2022-01-01');
    expect(component.productForm.controls.dateRevision.value).toBe('2022-01-02');
  });

  it('should disable dateRevision control', () => {
    // Act
    component.ngOnInit();

    // Assert
    expect(component.productForm.controls.dateRevision.disabled).toBe(true);
  });

  it('should disable id control in edit mode', () => {
    // Arrange
    component.editMode = true;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.productForm.controls.id.disabled).toBe(true);
  });


});