import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductEditComponent } from './product-edit.component';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should close the dialog and navigate to "/"', () => {
    // Arrange
    spyOn(component.dialogService, 'close');
    spyOn(component.router, 'navigate');

    // Act
    component.onConfirmDialog(null);

    // Assert
    expect(component.dialogService.close).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['/']);
  });
});