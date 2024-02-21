import { Component, computed, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../core/models/Product';
import { InputComponent } from '../../../shared/components/form/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { DropdownMenuComponent } from '../../../shared/components/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [InputComponent, RouterLink, NgOptimizedImage, DropdownMenuComponent, PaginationComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  defaultItemPerPage: number = 2
  products: Product[] = [];
  searchQuery = signal<string>('');
  loading: boolean = false;
  itemsPerPage = signal(this.defaultItemPerPage);
  totalItems: number = 0;
  currentPage = signal(1);

  constructor(private service: ProductService, private router: Router) { }

  ngOnInit() {
    this.loading = true
    this.service.getAll()
      .subscribe({
        next: (data) => {
          this.products = data
          this.totalItems = data.length
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false
      });
  }

  items = computed(() => {
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
    this.itemsPerPage.set(value);
  }

  onClickDropdown($event: { index: number; value: any; }) {
    this.router.navigateByUrl('/edit', {state: $event.value})
    throw new Error('Method not implemented.');
  }

}
