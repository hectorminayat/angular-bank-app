import { Component, computed, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../core/models/Product';
import { InputComponent } from '../../../shared/components/form/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { DropdownMenuComponent } from '../../../shared/components/dropdown-menu/dropdown-menu.component';
import { ConfirmDialogService } from '../../../shared/services/confirmDialog/confirm-dialog.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, InputComponent, RouterLink, NgOptimizedImage, DropdownMenuComponent, PaginationComponent, ConfirmDialogComponent, SkeletonComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  defaultItemPerPage: number = 5;
  products: Product[] = [];
  searchQuery = signal<string>('');
  loading: boolean = false;
  itemsPerPage = signal(this.defaultItemPerPage);
  totalItems: number = 0;
  currentPage = signal(1);
  forceR = signal(false);
  selectedProduct: Product | null = null;

  tableHeader = [
    {
      name: 'Logo',
      width: 60
    },
    {
      name: 'Nombre del producto',
    },
    {
      name: 'Descripción',
      info: 'Descripción del producto'
    },
    {
      name: 'Fecha de liberación',
      info: 'Fecha a liberar el producto para los clientes en General'
    },
    {
      name: 'Fecha de revisión',
      info: 'Fecha de revisión del producto para cambiar Términos y Condiciones'
    }
  ]

  constructor(public service: ProductService, public router: Router, public dialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.loadProducts();

  }

  loadProducts() {
    this.loading = true
    this.service.getAll()
      .subscribe({
        next: (data) => {
          this.products = data
          this.totalItems = data.length
          this.currentPage.set(1);
          this.itemsPerPage.set(this.defaultItemPerPage);
          this.forceR.set(!this.forceR())
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false
      });
  }

  items = computed(() => {
    const fr = this.forceR()
    const text = this.searchQuery();
    const itemPerPg = this.itemsPerPage();
    const startIndex = (this.currentPage() - 1) * itemPerPg;
    const endIndex = startIndex + itemPerPg;
    let result = this.products
      .filter((product) => `${product.name.toLowerCase()} ${product.description.toLowerCase()}`
        .includes(text.toLowerCase())
      )
      .slice(startIndex, endIndex);
    this.totalItems = text ? result.length : this.products.length;
    return result;
  });

  onSearch(text: string) {
    this.searchQuery.set(text);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }
  onItemsPerPageChanged(value: number): void {
    this.currentPage.set(1);
    this.itemsPerPage.set(value);
  }

  onClickDropdown($event: { index: number; value: Product; }) {
    if ($event.index === 0) {
      this.router.navigateByUrl('/edit', { state: $event.value })
    }
    if ($event.index === 1) {
      this.selectedProduct = $event.value
      this.dialogService.open();
    }
  }

  onCancelDialog() {
    this.dialogService.close();
    this.selectedProduct = null

  }
  onConfirmDialog() {
    this.service.delete(this.selectedProduct?.id ?? "").subscribe({
      next: (res) => {
        this.loadProducts();
        this.dialogService.close();

      },
      error: (err) => console.log(err),
      complete: () => {

      }
    })
  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 
}
