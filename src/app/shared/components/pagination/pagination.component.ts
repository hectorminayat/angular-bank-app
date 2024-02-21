import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() currentPage: number = 0;
  @Input() totalItems: number = 0;
  @Input() defaultItemPerPage: number = 0;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() itemsPerPageChanged: EventEmitter<number> = new EventEmitter();
  itemsPerPageValues: number[] = [
    2, 5, 10, 20
  ]
  itemsPerPage: number = this.itemsPerPageValues[0];

  ngOnInit() {
    this.itemsPerPage = this.defaultItemPerPage;
  }


  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }
  changeItemsPerPage(number: string): void {
    this.itemsPerPage = Number(number);
    this.itemsPerPageChanged.emit(this.itemsPerPage);

  }

}
